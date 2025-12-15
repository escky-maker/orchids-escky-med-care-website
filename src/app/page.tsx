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
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    href: "/childbirth",
    icon: Baby,
    title: "Childbirth & Postnatal",
    description: "Labor preparation and postpartum recovery",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    href: "/child-health",
    icon: Activity,
    title: "Child Health",
    description: "Vaccinations, milestones, and growth tracking",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    href: "/tools",
    icon: Calculator,
    title: "Health Tools",
    description: "Due date calculator, BMI, milestone tracker",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background pt-16 pb-24 px-6 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Escky Med Care</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Your Complete Guide to{" "}
            <span className="text-primary">Maternal & Child</span> Health
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
          >
            From the first prenatal visit to celebrating developmental milestones. 
            Evidence-based guidance for every stage of your parenting journey.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8">
            <SearchBar />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/antenatal">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/resources">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Resources
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Access</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Navigate directly to the resources you need most
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div key={link.href} variants={itemVariants} custom={index}>
                <Link href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border/50">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-2`}>
                        <link.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-sm font-medium text-primary inline-flex items-center">
                        Learn more
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-muted/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Escky Med Care?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
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
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Access comprehensive guides, interactive tools, and evidence-based 
                  resources to support your family&apos;s health.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="rounded-xl">
                    <Link href="/antenatal">
                      Begin with Antenatal Care
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl">
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

      <footer className="py-8 px-6 lg:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <span className="font-semibold">Escky Med Care</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Evidence-based maternal and child health resources. Always consult a healthcare provider for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
