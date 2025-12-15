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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 pt-16 pb-24 px-6 lg:px-12">
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Escky Med Care</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white"
          >
            Your Complete Guide to{" "}
            <span className="text-emerald-300">Maternal & Child</span> Health
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 max-w-2xl mb-10"
          >
            From the first prenatal visit to celebrating developmental milestones. 
            Evidence-based guidance for every stage of your parenting journey.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-10">
            <SearchBar />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Link href="/antenatal">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-semibold">
              <Link href="/resources">
                <BookOpen className="w-5 h-5 mr-2" />
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
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access</h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Navigate directly to the resources you need most
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div key={link.href} variants={itemVariants} custom={index}>
                <Link href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className={`${link.color} rounded-t-lg`}>
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                        <link.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl font-bold">{link.title}</CardTitle>
                      <CardDescription className="text-white/90">{link.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <span className="text-sm font-semibold text-primary inline-flex items-center">
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

      <section className="py-20 px-6 lg:px-12 bg-muted/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Escky Med Care?</h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
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
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
            <Card className="bg-accent">
              <CardContent className="p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  Access comprehensive guides, interactive tools, and evidence-based 
                  resources to support your family&apos;s health.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="font-semibold">
                    <Link href="/antenatal">
                      Begin with Antenatal Care
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-semibold">
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

      <footer className="py-10 px-6 lg:px-12 border-t bg-muted/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Escky Med Care</span>
          </div>
          <p className="text-sm text-muted-foreground text-center max-w-2xl">
            Evidence-based maternal and child health resources. Always consult a healthcare provider for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  );
}