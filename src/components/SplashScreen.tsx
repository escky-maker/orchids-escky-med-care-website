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
              className="border-2 border-white text-white hover:bg-white/15 backdrop-blur-md font-bold text-lg px-8 py-6"
            >
              <Link href="/login">
                <span className="text-pink-200">Sign In</span>
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
