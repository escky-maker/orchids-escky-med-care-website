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
  Stethoscope,
  Calendar,
  Shield,
  Sparkles,
} from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-rose-600 to-pink-700 pt-16 pb-24 px-6 lg:px-12">
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Escky Med Care</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1]"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Your Complete Guide to{" "}
            <span className="text-amber-200">Maternal & Child</span> Health
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
            <Button asChild size="lg" className="bg-white text-rose-700 hover:bg-amber-50 font-bold shadow-lg">
              <Link href="/antenatal">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/15 font-bold backdrop-blur-sm">
              <Link href="/resources">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Resources
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-amber-50 to-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Quick Access</h2>
            <p className="text-lg text-slate-600 max-w-lg mx-auto">
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

      <section className="py-20 px-6 lg:px-12 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Why Escky Med Care?</h2>
            <p className="text-lg text-slate-600 max-w-lg mx-auto">
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
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center mx-auto mb-5 border-2 border-rose-200">
                  <feature.icon className="w-9 h-9 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-amber-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-violet-600 to-fuchsia-600 border-0 shadow-2xl">
              <CardContent className="p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-white/95 mb-8 max-w-lg mx-auto leading-relaxed">
                  Access comprehensive guides, interactive tools, and evidence-based 
                  resources to support your family&apos;s health.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="font-bold bg-white text-fuchsia-700 hover:bg-amber-50 shadow-lg">
                    <Link href="/antenatal">
                      Begin with Antenatal Care
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-bold border-2 border-white text-white hover:bg-white/15 backdrop-blur-sm">
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

      <footer className="py-10 px-6 lg:px-12 border-t bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-rose-600" />
            <span className="font-bold text-lg text-slate-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Escky Med Care</span>
          </div>
          <p className="text-sm text-slate-600 text-center max-w-2xl">
            Evidence-based maternal and child health resources. Always consult a healthcare provider for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  );
}