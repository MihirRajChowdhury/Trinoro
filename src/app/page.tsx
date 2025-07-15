"use client";
import Link from "next/link";
import { Flower, Sliders, Waves, Brain } from "lucide-react";

const features = [
  {
    icon: <Sliders className="w-7 h-7 text-emerald-400 dark:text-emerald-300" />, 
    title: "Customizable Meditation", 
    desc: "Choose your journey: Beginner to Zen Monk. Build your own meditation path." 
  },
  { 
    icon: <Waves className="w-7 h-7 text-teal-500 dark:text-teal-300" />, 
    title: "Ambient Sound Mixer", 
    desc: "Mix rain, fire, ocean, forest, and more. Save your favorite soundscapes." 
  },
  { 
    icon: <Brain className="w-7 h-7 text-purple-500 dark:text-purple-300" />, 
    title: "Binaural Beats & Breath Sync", 
    desc: "Focus, sleep, relax, or go deep. Visual breath guides and synced audio." 
  },
];

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-emerald-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 overflow-hidden transition-all duration-500">
      {/* Enhanced animated background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/20 rounded-full blur-3xl opacity-60 dark:opacity-40 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200/40 dark:bg-purple-500/25 rounded-full blur-3xl opacity-50 dark:opacity-35 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-white/40 to-transparent dark:from-purple-400/10 dark:to-transparent rounded-full blur-2xl" />
      
      {/* Additional dark mode enhancement - floating orbs */}
      <div className="absolute top-3/4 left-1/6 w-24 h-24 bg-teal-300/20 dark:bg-teal-400/30 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
      <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-emerald-300/20 dark:bg-emerald-400/25 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center animate-fade-in">
        <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-200 to-purple-200 dark:from-emerald-400/80 dark:to-purple-400/80 shadow-xl dark:shadow-purple-500/25 mb-2 backdrop-blur-sm">
          <Flower className="w-12 h-12 text-purple-600 dark:text-emerald-200" />
        </span>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-purple-600 to-teal-500 dark:from-emerald-300 dark:via-purple-300 dark:to-teal-300 bg-clip-text text-transparent tracking-tight select-none drop-shadow-sm">
          Trinoro
        </h1>
        <p className="text-xl md:text-2xl text-emerald-700/90 dark:text-emerald-100/90 max-w-lg mx-auto font-medium leading-relaxed">
          Find your calm. Meditate. Reflect. Grow.
        </p>
        <Link
          href="/meditate"
          className="mt-6 px-10 py-4 rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 dark:from-emerald-400 dark:to-purple-400 text-white font-semibold text-lg shadow-lg dark:shadow-purple-500/30 hover:from-emerald-600 hover:to-purple-600 dark:hover:from-emerald-300 dark:hover:to-purple-300 hover:shadow-xl dark:hover:shadow-purple-400/40 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-400/50"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto mt-24 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-700 dark:text-emerald-200">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/90 dark:bg-slate-800/90 shadow-xl dark:shadow-slate-900/50 border border-emerald-100/50 dark:border-slate-700/50 hover:shadow-2xl dark:hover:shadow-slate-900/70 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <div className="mb-3 p-3 rounded-full bg-gradient-to-br from-emerald-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 group-hover:from-emerald-200 group-hover:to-purple-200 dark:group-hover:from-slate-600 dark:group-hover:to-slate-500 transition-all duration-300">
                {f.icon}
              </div>
              <div className="text-xl font-semibold text-slate-700 dark:text-slate-200 text-center group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300">
                {f.title}
              </div>
              <div className="text-base text-slate-600 dark:text-slate-300 text-center leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
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