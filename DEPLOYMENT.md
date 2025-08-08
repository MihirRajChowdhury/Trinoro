# 🚀 Trinoro Deployment Guide - Vercel

## Prerequisites
- [Vercel Account](https://vercel.com/signup)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas)
- [Google Cloud Console](https://console.cloud.google.com/) (for OAuth)

## Step 1: Prepare Your Repository
1. Ensure all changes are committed to your Git repository
2. Push to GitHub/GitLab/Bitbucket

## Step 2: Set Up MongoDB Atlas
1. Create a new MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Get your connection string
4. Add your IP to the whitelist (or use 0.0.0.0/0 for Vercel)

## Step 3: Set Up Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (for production)

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure the following settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts
```

## Step 5: Configure Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

### Required Environment Variables:
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trinoro?retryWrites=true&w=majority

# NextAuth.js
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: Freesound API (for ambient sounds)
FREESOUND_API_KEY=your-freesound-api-key
```

### How to Generate NEXTAUTH_SECRET:
```bash
# Generate a secure secret
openssl rand -base64 32
# or use: https://generate-secret.vercel.app/32
```

## Step 6: Deploy and Test

1. **Deploy**: Click "Deploy" in Vercel dashboard
2. **Wait**: Build process takes 2-5 minutes
3. **Test**: Visit your deployed URL
4. **Verify**: Test all features:
   - ✅ User authentication
   - ✅ Meditation timer
   - ✅ Journal entries
   - ✅ Streak tracking
   - ✅ Ambient sound mixer

## Step 7: Custom Domain (Optional)

1. Go to **Settings > Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain

## Troubleshooting

### Common Issues:

**1. Build Errors**
- Check if all dependencies are in `package.json`
- Ensure TypeScript compilation passes locally

**2. MongoDB Connection Issues**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

**3. OAuth Issues**
- Verify redirect URIs in Google Console
- Check `NEXTAUTH_URL` matches your domain
- Ensure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct

**4. API Routes Not Working**
- Check Vercel function timeout settings
- Verify environment variables are set
- Check server logs in Vercel dashboard

### Performance Optimization:

1. **Enable Edge Functions** (if needed)
2. **Configure Caching** for static assets
3. **Monitor Performance** in Vercel Analytics

## Post-Deployment Checklist

- [ ] Authentication works
- [ ] Meditation timer functions
- [ ] Journal entries save properly
- [ ] Streak tracking updates
- [ ] Ambient sounds load
- [ ] Mobile responsiveness
- [ ] Dark/light theme toggle
- [ ] All API endpoints respond

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with production environment
4. Check MongoDB Atlas logs

---

**🎉 Congratulations! Your Trinoro meditation app is now live!**
