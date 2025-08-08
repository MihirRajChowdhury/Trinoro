"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  Flower, 
  Sliders, 
  Waves, 
  Brain, 
  BookOpen, 
  Flame, 
  Play, 
  Search, 
  Calendar,
  Clock,
  Target,
  Users,
  ArrowRight,
  Star,
  Zap,
  Heart,
  Shield,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: <Sliders className="w-8 h-8 text-emerald-400 dark:text-emerald-300" />,
    title: "Customizable Meditation",
    desc: "Choose your journey: Beginner to Zen Master. Build your own meditation path with customizable timers and guided sessions.",
    color: "emerald",
    href: "/meditate"
  },
  {
    icon: <Waves className="w-8 h-8 text-teal-500 dark:text-teal-300" />,
    title: "Ambient Sound Mixer",
    desc: "Mix rain, fire, ocean, forest, and more. Create your perfect soundscape with real-time audio mixing.",
    color: "teal",
    href: "/meditate"
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-500 dark:text-purple-300" />,
    title: "Binaural Beats & Breath Sync",
    desc: "Focus, sleep, relax, or go deep. Visual breath guides and synced audio for enhanced meditation.",
    color: "purple",
    href: "/meditate"
  },
  {
    icon: <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-300" />,
    title: "Enhanced Journal",
    desc: "Reflect on your journey with mood tracking, tags, and searchable entries. Your personal meditation diary.",
    color: "blue",
    href: "/journal"
  },
  {
    icon: <Flame className="w-8 h-8 text-orange-500 dark:text-orange-300" />,
    title: "Streak Tracking",
    desc: "Build consistency with visual streak tracking, progress statistics, and achievement milestones.",
    color: "orange",
    href: "/streak"
  },
  {
    icon: <Shield className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />,
    title: "Secure & Private",
    desc: "Your data is protected with Google OAuth authentication and encrypted storage. Your journey, your privacy.",
    color: "indigo",
    href: "#"
  }
];

const quickActions = [
  {
    icon: <Play className="w-6 h-6" />,
    title: "Start Meditating",
    desc: "Begin your meditation session",
    href: "/meditate",
    color: "emerald"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Write in Journal",
    desc: "Reflect on your day",
    href: "/journal",
    color: "blue"
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: "View Progress",
    desc: "Check your streak & stats",
    href: "/streak",
    color: "orange"
  }
];

const stats = [
  { label: "Active Users", value: "10K+", icon: <Users className="w-5 h-5" /> },
  { label: "Meditation Sessions", value: "50K+", icon: <Play className="w-5 h-5" /> },
  { label: "Journal Entries", value: "25K+", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Streaks Maintained", value: "5K+", icon: <Flame className="w-5 h-5" /> }
];

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-hidden transition-all duration-500">
      {/* Enhanced animated background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/20 rounded-full blur-3xl opacity-60 dark:opacity-40 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/40 dark:bg-purple-500/25 rounded-full blur-3xl opacity-50 dark:opacity-35 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-white/40 to-transparent dark:from-purple-400/10 dark:to-transparent rounded-full blur-2xl" />
      
      {/* Additional floating orbs */}
      <div className="absolute top-3/4 left-1/6 w-24 h-24 bg-teal-300/20 dark:bg-teal-400/30 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
      <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-emerald-300/20 dark:bg-emerald-400/25 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 py-16 text-center animate-fade-in">
        <div className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 border border-emerald-200/50 dark:border-emerald-700/50 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Your journey to mindfulness starts here
          </span>
        </div>
        
        <span className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-200 to-purple-200 dark:from-emerald-400/80 dark:to-purple-400/80 shadow-xl dark:shadow-purple-500/25 mb-4 backdrop-blur-sm">
          <Flower className="w-14 h-14 text-purple-600 dark:text-emerald-200" />
        </span>
        
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-purple-600 to-teal-500 dark:from-emerald-300 dark:via-purple-300 dark:to-teal-300 bg-clip-text text-transparent tracking-tight select-none drop-shadow-sm mb-6">
          Trinoro
        </h1>
        
        <p className="text-xl md:text-2xl text-emerald-700/90 dark:text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
          {session ? (
            <>
              Welcome back, <span className="font-semibold text-emerald-600 dark:text-emerald-300">{session.user?.name}</span>! 
              Ready to continue your mindfulness journey?
            </>
          ) : (
            "Find your calm. Meditate. Reflect. Grow. Your comprehensive mindfulness companion."
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href="/meditate"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 dark:from-emerald-400 dark:to-purple-400 text-white font-semibold text-lg shadow-lg dark:shadow-purple-500/30 hover:from-emerald-600 hover:to-purple-600 dark:hover:from-emerald-300 dark:hover:to-purple-300 hover:shadow-xl dark:hover:shadow-purple-400/40 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-400/50 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Meditating
          </Link>
          
          {!session && (
            <Link
              href="/api/auth/signin"
              className="px-8 py-4 rounded-full bg-white/90 dark:bg-slate-800/90 text-emerald-700 dark:text-emerald-300 font-semibold text-lg shadow-lg border border-emerald-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-400/50 flex items-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Sign In to Save Progress
            </Link>
          )}
        </div>
      </section>

      {/* Quick Actions Section - Only for logged in users */}
      {session && (
        <section className="relative z-10 w-full max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-emerald-700 dark:text-emerald-200">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="group flex items-center gap-4 p-6 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-lg dark:shadow-slate-900/50 border border-emerald-100/50 dark:border-slate-700/50 hover:shadow-xl dark:hover:shadow-slate-900/70 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <div className={`p-3 rounded-full bg-${action.color}-100 dark:bg-${action.color}-900/30 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-800/40 transition-all duration-300`}>
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {action.desc}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-700 dark:text-emerald-200">
            Everything You Need for Mindfulness
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A comprehensive suite of tools designed to support your meditation practice, 
            emotional well-being, and personal growth journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Link
              key={i}
              href={feature.href}
              className="group flex flex-col h-full p-8 rounded-3xl bg-white/90 dark:bg-slate-800/90 shadow-xl dark:shadow-slate-900/50 border border-emerald-100/50 dark:border-slate-700/50 hover:shadow-2xl dark:hover:shadow-slate-900/70 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <div className={`mb-4 p-4 rounded-2xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 group-hover:bg-${feature.color}-200 dark:group-hover:bg-${feature.color}-800/40 transition-all duration-300 w-fit`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 text-left group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300 mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 text-left leading-relaxed flex-1">
                {feature.desc}
              </p>
              <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                Learn more
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-700 dark:text-emerald-200">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Join our growing community of mindful individuals
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-200 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started Section - Only for non-logged in users */}
      {!session && (
        <section className="relative z-10 w-full max-w-4xl mx-auto px-4 mb-16">
          <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-emerald-100/80 to-purple-100/80 dark:from-emerald-900/30 dark:to-purple-900/30 border border-emerald-200/50 dark:border-emerald-700/50 backdrop-blur-sm">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-200 dark:bg-emerald-800/50">
              <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-700 dark:text-emerald-200">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Sign in to unlock personalized features, track your progress, and save your meditation journey.
            </p>
            <Link
              href="/api/auth/signin"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 dark:from-emerald-400 dark:to-purple-400 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              Get Started for Free
            </Link>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-700 dark:text-emerald-200">
            Start Your Mindfulness Journey Today
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Transform your life one breath at a time
          </p>
          <Link
            href="/meditate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 dark:from-emerald-400 dark:to-purple-400 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="w-5 h-5" />
            Begin Meditating Now
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in { 
          animation: fade-in 1.5s cubic-bezier(0.4,0,0.2,1); 
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}