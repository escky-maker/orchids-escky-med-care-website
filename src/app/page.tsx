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
    borderColor: "border-rose-700",
  },
  {
    href: "/childbirth",
    icon: Baby,
    title: "Childbirth & Postnatal",
    description: "Labor preparation and postpartum recovery",
    color: "bg-violet-500 text-white",
    borderColor: "border-violet-700",
  },
  {
    href: "/child-health",
    icon: Activity,
    title: "Child Health",
    description: "Vaccinations, milestones, and growth tracking",
    color: "bg-emerald-500 text-white",
    borderColor: "border-emerald-700",
  },
  {
    href: "/tools",
    icon: Calculator,
    title: "Health Tools",
    description: "Due date calculator, BMI, milestone tracker",
    color: "bg-amber-500 text-white",
    borderColor: "border-amber-700",
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
      <section className="relative overflow-hidden bg-primary pt-16 pb-24 px-6 lg:px-12 border-b-8 border-primary-foreground">
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 border-4 border-primary-foreground bg-primary-foreground flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-primary" strokeWidth={3} />
            </div>
            <span className="text-4xl font-black text-primary-foreground uppercase tracking-wide">Escky Med Care</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 text-primary-foreground"
          >
            Your Complete Guide to{" "}
            <span className="bg-primary-foreground text-primary px-3 py-1 inline-block border-4 border-primary-foreground">Maternal & Child</span> Health
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-primary-foreground font-bold max-w-2xl mb-10"
          >
            From the first prenatal visit to celebrating developmental milestones. 
            Evidence-based guidance for every stage of your parenting journey.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-10">
            <SearchBar />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
            <Button asChild size="lg" className="border-4 border-primary-foreground bg-primary-foreground text-primary font-black text-lg px-8 py-6 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0_0_rgba(255,255,255,1)]">
              <Link href="/antenatal">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-4 border-primary-foreground text-primary-foreground font-black text-lg px-8 py-6 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0_0_rgba(255,255,255,1)]">
              <Link href="/resources">
                <BookOpen className="w-5 h-5 mr-2" strokeWidth={3} />
                Browse Resources
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 uppercase">Quick Access</h2>
            <p className="text-xl font-bold text-foreground max-w-lg mx-auto">
              Navigate directly to the resources you need most
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link, index) => (
              <motion.div key={link.href} variants={itemVariants} custom={index}>
                <Link href={link.href}>
                  <Card className="h-full hover:translate-x-2 hover:translate-y-2 transition-transform cursor-pointer border-4 border-foreground shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                    <CardHeader className={`${link.color} border-b-4 border-foreground`}>
                      <div className="w-14 h-14 border-4 border-current flex items-center justify-center mb-3">
                        <link.icon className="w-8 h-8" strokeWidth={3} />
                      </div>
                      <CardTitle className="text-2xl font-black">{link.title}</CardTitle>
                      <CardDescription className="text-white/90 font-bold text-base">{link.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <span className="text-base font-black text-foreground inline-flex items-center uppercase">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3} />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-muted border-y-8 border-foreground">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 uppercase">Why Escky Med Care?</h2>
            <p className="text-xl font-bold text-foreground max-w-lg mx-auto">
              Trusted resources for your family&apos;s health journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                custom={index}
                className="text-center"
              >
                <div className="w-20 h-20 border-4 border-foreground bg-primary flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                  <feature.icon className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-black mb-3 uppercase">{feature.title}</h3>
                <p className="text-lg font-semibold text-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-accent border-4 border-foreground shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
              <CardContent className="p-12 md:p-16 text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl font-bold text-foreground mb-8 max-w-lg mx-auto">
                  Access comprehensive guides, interactive tools, and evidence-based 
                  resources to support your family&apos;s health.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Button asChild size="lg" className="border-4 border-foreground font-black text-lg px-8 py-6 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                    <Link href="/antenatal">
                      Begin with Antenatal Care
                      <ArrowRight className="w-5 h-5 ml-2" strokeWidth={3} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-4 border-foreground font-black text-lg px-8 py-6 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
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

      <footer className="py-10 px-6 lg:px-12 border-t-8 border-foreground bg-muted">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-primary" strokeWidth={3} />
            <span className="font-black text-xl uppercase">Escky Med Care</span>
          </div>
          <p className="text-base font-bold text-foreground text-center max-w-2xl">
            Evidence-based maternal and child health resources. Always consult a healthcare provider for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  );
}