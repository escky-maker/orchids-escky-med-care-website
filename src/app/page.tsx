"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Baby,
  Activity,
  Calculator,
  BookOpen,
  ArrowRight,
  Calendar,
  Shield,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { SplashScreen } from "@/components/SplashScreen";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const quickLinks = [
  {
    href: "/antenatal",
    icon: Heart,
    title: "Antenatal Care",
    description: "First prenatal visits, nutrition, and screenings",
    color: "bg-rose-500 text-white",
    borderColor: "border-rose-200",
  },
  {
    href: "/childbirth",
    icon: Baby,
    title: "Childbirth & Postnatal",
    description: "Labor preparation and postpartum recovery",
    color: "bg-violet-500 text-white",
    borderColor: "border-violet-200",
  },
  {
    href: "/child-health",
    icon: Activity,
    title: "Child Health",
    description: "Vaccinations, milestones, and growth tracking",
    color: "bg-emerald-500 text-white",
    borderColor: "border-emerald-200",
  },
  {
    href: "/tools",
    icon: Calculator,
    title: "Health Tools",
    description: "Due date calculator, BMI, milestone tracker",
    color: "bg-amber-500 text-white",
    borderColor: "border-amber-200",
  },
];

const features = [
  {
    icon: Calendar,
    title: "Personalized Schedules",
    description: "Track appointments, vaccinations, and developmental milestones tailored to your journey.",
  },
  {
    icon: Shield,
    title: "Evidence-Based",
    description: "All content based on WHO, CDC, and AAP guidelines for maternal and child health.",
  },
  {
    icon: Sparkles,
    title: "Interactive Tools",
    description: "Calculators and trackers to help you monitor health metrics and milestones.",
  },
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

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-rose-600 to-pink-700 dark:from-orange-900 dark:via-rose-900 dark:to-pink-900 pt-16 pb-24 px-6 lg:px-12">
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <Logo className="w-14 h-14 drop-shadow-lg" />
            <span className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Escky Med Care</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Your Complete Guide to{" "}
            <span className="text-amber-200 dark:text-amber-300">Maternal & Child</span> Health
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/95 max-w-2xl mb-10 leading-relaxed"
          >
            From the first prenatal visit to celebrating developmental milestones. 
            Evidence-based guidance for every stage of your parenting journey.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-10">
            <SearchBar />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-rose-700 hover:bg-amber-50 dark:bg-white dark:text-rose-700 dark:hover:bg-amber-100 font-bold shadow-lg">
              <Link href="/antenatal">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/15 dark:border-white dark:text-white dark:hover:bg-white/20 font-bold backdrop-blur-sm">
              <Link href="/resources">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Resources
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Quick Access</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Navigate directly to the resources you need most
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div key={link.href} variants={itemVariants} custom={index}>
                <Link href={link.href}>
                  <Card className="h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 overflow-hidden">
                    <CardHeader className={`${link.color} rounded-t-lg pb-8`}>
                      <div className="w-14 h-14 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/30">
                        <link.icon className="w-7 h-7" />
                      </div>
                      <CardTitle className="text-xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{link.title}</CardTitle>
                      <CardDescription className="text-white/95 font-medium">{link.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <span className="text-sm font-bold text-rose-600 inline-flex items-center">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-white dark:bg-slate-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Why Escky Med Care?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Trusted resources for your family&apos;s health journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                custom={index}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-900 dark:to-amber-900 flex items-center justify-center mx-auto mb-5 border-2 border-rose-200 dark:border-rose-700">
                  <feature.icon className="w-9 h-9 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-rose-50 dark:from-slate-900 dark:to-slate-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Take Us With You
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Download our mobile app for on-the-go access to all health resources
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <Link href="/app">
              <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-2 border-rose-200 dark:border-rose-700 overflow-hidden bg-gradient-to-br from-rose-50 to-amber-50 dark:from-slate-800 dark:to-slate-900">
                <CardContent className="p-10 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                        Download Escky Med Care App
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                        Available on iOS and Android. Get push notifications, offline access, and personalized health tracking.
                      </p>
                      <span className="inline-flex items-center text-rose-600 dark:text-rose-400 font-bold text-lg">
                        Get the app
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-rose-50 to-amber-50 dark:from-slate-800 dark:to-slate-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-violet-600 to-fuchsia-600 dark:from-violet-900 dark:to-fuchsia-900 border-0 shadow-2xl">
              <CardContent className="p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-white/95 mb-8 max-w-lg mx-auto leading-relaxed">
                  Access comprehensive guides, interactive tools, and evidence-based 
                  resources to support your family&apos;s health.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="font-bold bg-white text-fuchsia-700 hover:bg-amber-50 dark:bg-white dark:text-fuchsia-700 dark:hover:bg-amber-100 shadow-lg">
                    <Link href="/antenatal">
                      Begin with Antenatal Care
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-bold border-2 border-white text-white hover:bg-white/15 dark:border-white dark:text-white dark:hover:bg-white/20 backdrop-blur-sm">
                    <Link href="/about">
                      Learn About Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative h-[600px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-pregnant-woman-touching-her-belly-7933/1080p.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative h-full flex items-center justify-center px-6 lg:px-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <Heart className="w-20 h-20 text-rose-400 mx-auto mb-6 animate-pulse" />
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Every Moment Matters
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              From pregnancy to childhood, we&apos;re here to support you with trusted medical guidance, 
              personalized tools, and a caring community.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-2xl">
                <Link href="/signup">
                  Join Our Community
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold border-2 border-white text-white hover:bg-white/20 backdrop-blur-md">
                <Link href="/tools">
                  Explore Tools
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <footer className="py-10 px-6 lg:px-12 border-t bg-slate-50 dark:bg-slate-950 dark:border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-lg text-slate-900 dark:text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Escky Med Care</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-2xl">
            Evidence-based maternal and child health resources. Always consult a healthcare provider for personalized advice.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Contact: <a href="mailto:tendwaescriva4@gmail.com" className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-semibold">tendwaescriva4@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}