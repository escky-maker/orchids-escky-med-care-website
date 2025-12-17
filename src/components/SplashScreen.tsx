"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Shield, Sparkles, ArrowRight } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-rose-600 to-pink-700 dark:from-orange-900 dark:via-rose-900 dark:to-pink-900 flex items-center justify-center px-6 py-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -25 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute left-8 md:left-16 lg:left-24 bottom-12 md:bottom-20 z-0"
          style={{ perspective: "1000px" }}
        >
          <div className="relative" style={{ transformStyle: "preserve-3d", transform: "rotateY(-8deg) rotateX(3deg)" }}>
            <div className="absolute inset-0 bg-rose-300/30 rounded-full blur-3xl" style={{ transform: "translateZ(-30px)" }}></div>
            <svg className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(8px 12px 20px rgba(244, 63, 94, 0.4)) drop-shadow(-4px -6px 15px rgba(251, 207, 232, 0.3))", transform: "translateZ(0px)" }}>
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#fecdd3", stopOpacity: 0.9 }} />
                </linearGradient>
                <radialGradient id="bellyGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{ stopColor: "#fda4af", stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: "#fb7185", stopOpacity: 0 }} />
                </radialGradient>
              </defs>
              <ellipse cx="100" cy="110" rx="38" ry="25" fill="#fda4af" opacity="0.2" style={{ transform: "translateY(80px)" }} />
              <path d="M100 30 C80 30 65 45 65 65 C65 85 80 100 100 120 C120 100 135 85 135 65 C135 45 120 30 100 30 Z M100 60 C92 60 85 67 85 75 L85 95 L75 95 C75 95 75 85 75 75 C75 61 87 50 100 50 C113 50 125 61 125 75 L125 95 L115 95 L115 75 C115 67 108 60 100 60 Z" fill="url(#bodyGradient)" style={{ filter: "drop-shadow(2px 3px 4px rgba(244, 63, 94, 0.3))" }}/>
              <ellipse cx="100" cy="145" rx="35" ry="45" fill="url(#bodyGradient)" style={{ filter: "drop-shadow(3px 5px 6px rgba(244, 63, 94, 0.3))" }}/>
              <ellipse cx="100" cy="130" rx="30" ry="35" fill="url(#bellyGlow)" />
              <circle cx="95" cy="140" r="3" fill="#ef4444" style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))" }}/>
              <circle cx="105" cy="140" r="3" fill="#ef4444" style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3))" }}/>
              <path d="M95 150 Q100 155 105 150" stroke="#ef4444" strokeWidth="2" fill="none" style={{ filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2))" }}/>
              <circle cx="55" cy="175" r="12" fill="url(#bodyGradient)" style={{ filter: "drop-shadow(2px 3px 4px rgba(244, 63, 94, 0.3))" }}/>
              <circle cx="52" cy="173" r="2" fill="#ef4444" style={{ filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))" }}/>
              <circle cx="58" cy="173" r="2" fill="#ef4444" style={{ filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))" }}/>
              <path d="M52 178 Q55 180 58 178" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
              <ellipse cx="90" cy="48" rx="8" ry="6" fill="#fda4af" opacity="0.4" />
              <ellipse cx="110" cy="48" rx="8" ry="6" fill="#fda4af" opacity="0.4" />
            </svg>
          </div>
        </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute right-8 md:right-16 lg:right-24 top-20 md:top-32 z-0"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-amber-300/30 rounded-full blur-3xl"></div>
          <svg className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 drop-shadow-2xl" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="75" cy="90" rx="28" ry="35" fill="white" opacity="0.9"/>
            <circle cx="75" cy="45" r="22" fill="white" opacity="0.9"/>
            <circle cx="72" cy="42" r="3" fill="#f59e0b"/>
            <circle cx="78" cy="42" r="3" fill="#f59e0b"/>
            <path d="M70 50 Q75 54 80 50" stroke="#f59e0b" strokeWidth="2" fill="none"/>
            <path d="M60 50 Q55 45 50 50" stroke="white" strokeWidth="4" fill="none" opacity="0.9"/>
            <path d="M90 50 Q95 45 100 50" stroke="white" strokeWidth="4" fill="none" opacity="0.9"/>
          </svg>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
            <Logo className="w-28 h-28 md:w-32 md:h-32 drop-shadow-2xl relative z-10" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Escky Med Care
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed max-w-xl mx-auto"
        >
          Your trusted companion for maternal and child health. 
          Evidence-based guidance from pregnancy to childhood.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
        >
          {[
            { icon: Heart, text: "Expert Health Guidance" },
            { icon: Shield, text: "WHO & CDC Approved" },
            { icon: Sparkles, text: "Interactive Tools" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white"
            >
              <feature.icon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <p className="font-semibold text-sm md:text-base">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-white text-rose-700 hover:bg-amber-50 font-bold text-lg px-8 py-6 shadow-2xl"
          >
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-pink-300 text-pink-200 hover:bg-pink-200/15 backdrop-blur-md font-bold text-lg px-8 py-6"
              >
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-white/80 text-sm"
        >
          Join thousands of parents trusting Escky Med Care for their family&apos;s health
        </motion.p>
      </motion.div>
    </div>
  );
}
