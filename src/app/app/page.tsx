"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Apple, Smartphone, Download, Shield, Heart, Zap, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/Logo";

const features = [
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Track your pregnancy journey with customized schedules and reminders",
  },
  {
    icon: Shield,
    title: "Expert Guidance",
    description: "Evidence-based content from WHO, CDC, and AAP guidelines",
  },
  {
    icon: Zap,
    title: "Smart Tools",
    description: "Interactive calculators, milestone trackers, and health monitors",
  },
];

const appFeatures = [
  "🔔 Push notifications for appointments",
  "📊 Offline access to all resources",
  "💬 Save favorite articles and tools",
  "🌙 Dark mode support",
  "🔐 Secure health data storage",
  "📱 Optimized mobile experience",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AppDownloadPage() {
  const handleDownload = (platform: "ios" | "android") => {
    if (platform === "ios") {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://apps.apple.com/app/escky-med-care" } }, "*");
    } else {
      window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://play.google.com/store/apps/details?id=com.esckymedcare" } }, "*");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-rose-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Button asChild variant="ghost" className="mb-8 -ml-2">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <Logo className="w-16 h-16 drop-shadow-lg" />
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Download the App
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mt-2">
                Your health companion, anywhere you go
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 flex items-center justify-center mb-6">
                  <Apple className="w-9 h-9 text-white dark:text-slate-900" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  iOS App
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Available on iPhone and iPad
                </p>
                <Button
                  onClick={() => handleDownload("ios")}
                  size="lg"
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                  Requires iOS 14.0 or later
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center mb-6">
                  <Smartphone className="w-9 h-9 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Android App
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Available on Google Play
                </p>
                <Button
                  onClick={() => handleDownload("android")}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </Button>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                  Requires Android 8.0 or later
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Why Download the App?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  custom={index}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-900 dark:to-amber-900 flex items-center justify-center mx-auto mb-4 border-2 border-rose-200 dark:border-rose-700">
                    <feature.icon className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-violet-600 to-fuchsia-600 dark:from-violet-900 dark:to-fuchsia-900 border-0">
              <CardContent className="p-10">
                <h2 className="text-3xl font-bold mb-6 text-white text-center" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  App Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {appFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 text-white/95"
                    >
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Need help? Contact us at{" "}
              <a
                href="mailto:tendwaescriva4@gmail.com"
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold"
              >
                tendwaescriva4@gmail.com
              </a>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Free to download • No in-app purchases • Privacy-focused
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
