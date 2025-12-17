"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import { motion } from "framer-motion";
import {
  Info,
  Heart,
  Target,
  Users,
  Shield,
  Globe,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We understand the emotional journey of parenthood and provide supportive, empathetic resources.",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: Shield,
    title: "Evidence-Based",
    description: "All our content is based on guidelines from WHO, CDC, AAP, and other trusted medical organizations.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Globe,
    title: "Inclusivity",
    description: "We believe every family deserves access to quality maternal and child health information.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Education",
    description: "We empower families with knowledge to make informed decisions about their health.",
    color: "bg-violet-500/10 text-violet-600",
  },
];

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Medical Director",
    specialty: "OB-GYN",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Michael Okonkwo",
    role: "Pediatric Advisor",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Content Lead",
    specialty: "Maternal-Fetal Medicine",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Dr. James Kim",
    role: "Research Advisor",
    specialty: "Neonatology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
  },
];

const stats = [
  { value: "50K+", label: "Families Helped" },
  { value: "200+", label: "Educational Articles" },
  { value: "98%", label: "User Satisfaction" },
  { value: "24/7", label: "Resource Access" },
];

function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-6 lg:px-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Info className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">About Escky Med Care</h1>
              <p className="text-muted-foreground">Our mission, values, and the team behind the platform</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-none">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                    <Stethoscope className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Escky Med Care is dedicated to providing comprehensive, evidence-based maternal and child health 
                      resources to families worldwide. We believe that every parent deserves access to trusted information 
                      that empowers them to make the best decisions for their family&apos;s health, from the first prenatal 
                      visit through early childhood development milestones.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center shrink-0`}>
                        <value.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Our Medical Advisory Team
                </CardTitle>
                <CardDescription>
                  Our content is reviewed by qualified healthcare professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {team.map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 bg-muted">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.specialty}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Our Commitment to Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  All content on Escky Med Care is:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {[
                    "Reviewed by qualified healthcare professionals",
                    "Based on current clinical guidelines",
                    "Updated regularly to reflect new research",
                    "Written in accessible, easy-to-understand language",
                    "Free from commercial bias",
                    "Respectful of diverse family structures",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Medical Disclaimer</h3>
                    <p className="text-sm text-muted-foreground">
                      The information provided on Escky Med Care is for educational purposes only and is not intended 
                      to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice 
                      of your physician or other qualified health provider with any questions you may have regarding a 
                      medical condition. Never disregard professional medical advice or delay in seeking it because of 
                      something you have read on this platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPageWrapper() {
  return (
    <ProtectedRoute>
      <AboutPage />
    </ProtectedRoute>
  );
}
