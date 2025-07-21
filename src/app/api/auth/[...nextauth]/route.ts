import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && user.email) {
        try {
          const client = await clientPromise;
          const db = client.db();
          
          // Check if a user with this email already exists
          const existingUser = await db.collection("users").findOne({
            email: user.email
          });
          
          if (existingUser) {
            // Check if this Google account is already linked
            const existingAccount = await db.collection("accounts").findOne({
              userId: existingUser._id,
              provider: "google",
              providerAccountId: account.providerAccountId
            });
            
            if (!existingAccount) {
              // Link the Google account to the existing user
              await db.collection("accounts").insertOne({
                userId: existingUser._id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                id_token: account.id_token,
                refresh_token: account.refresh_token,
                scope: account.scope,
                token_type: account.token_type,
              });
              
              console.log("Linked Google account to existing user:", user.email);
            }
          }
          
          return true;
        } catch (error) {
          console.error("Error during account linking:", error);
          return true; // Still allow sign-in even if linking fails
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async linkAccount({ user, account }) {
      console.log("Account linked successfully:", { user: user.email, provider: account.provider });
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };