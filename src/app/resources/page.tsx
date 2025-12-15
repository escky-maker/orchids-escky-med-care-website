"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Video,
  ExternalLink,
  Download,
  Globe,
  MessageCircle,
  Mail,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubscription } from "@/context/SubscriptionContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

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

const blogPosts = [
  {
    title: "Understanding Your First Trimester",
    excerpt: "What to expect during weeks 1-12 of pregnancy, including common symptoms and important milestones.",
    category: "Pregnancy",
    readTime: "5 min read",
    premium: false,
  },
  {
    title: "Breastfeeding Basics for New Mothers",
    excerpt: "A comprehensive guide to getting started with breastfeeding, including positions and common challenges.",
    category: "Postnatal",
    readTime: "8 min read",
    premium: true,
  },
  {
    title: "Your Baby's Sleep Schedule by Age",
    excerpt: "How much sleep your baby needs at each age and tips for establishing healthy sleep habits.",
    category: "Child Health",
    readTime: "6 min read",
    premium: true,
  },
  {
    title: "Managing Morning Sickness",
    excerpt: "Evidence-based remedies and strategies to cope with nausea during pregnancy.",
    category: "Pregnancy",
    readTime: "4 min read",
    premium: false,
  },
];

const trustedSources = [
  {
    name: "World Health Organization (WHO)",
    url: "https://www.who.int/health-topics/maternal-health",
    description: "Global maternal and child health guidelines",
  },
  {
    name: "Centers for Disease Control (CDC)",
    url: "https://www.cdc.gov/pregnancy",
    description: "US pregnancy and child health resources",
  },
  {
    name: "American Academy of Pediatrics (AAP)",
    url: "https://www.aap.org",
    description: "Child health and development information",
  },
  {
    name: "ACOG",
    url: "https://www.acog.org",
    description: "American College of Obstetricians and Gynecologists",
  },
];

const downloadableResources = [
  { title: "Prenatal Visit Checklist", type: "PDF", size: "245 KB" },
  { title: "Baby Milestone Tracker", type: "PDF", size: "312 KB" },
  { title: "Vaccination Schedule Card", type: "PDF", size: "189 KB" },
  { title: "Postpartum Recovery Guide", type: "PDF", size: "428 KB" },
  { title: "Breastfeeding Log Template", type: "PDF", size: "156 KB" },
  { title: "Baby Sleep Tracker", type: "PDF", size: "198 KB" },
];

const faqs = [
  {
    question: "When should I schedule my first prenatal visit?",
    answer: "You should schedule your first prenatal visit as soon as you know you're pregnant, ideally around 8-10 weeks. Contact your healthcare provider to set up an appointment.",
  },
  {
    question: "How many prenatal visits will I need?",
    answer: "For a healthy pregnancy, you'll typically have about 10-15 prenatal visits. The schedule usually includes monthly visits until 28 weeks, then biweekly until 36 weeks, and weekly until delivery.",
  },
  {
    question: "What vaccines does my baby need in the first year?",
    answer: "In the first year, babies receive vaccines for hepatitis B, DTaP, Hib, pneumococcal disease, rotavirus, and polio. The schedule starts at birth and continues at 2, 4, 6, and 12 months.",
  },
  {
    question: "When should I be concerned about my child's development?",
    answer: "Consult your pediatrician if your child isn't meeting milestones for their age, loses skills they previously had, doesn't respond to their name by 12 months, or doesn't make eye contact.",
  },
];

export default function ResourcesPage() {
  const { isPremium } = useSubscription();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  const handlePremiumContent = (isPremiumContent: boolean) => {
    if (isPremiumContent && !isPremium) {
      setShowUpgradeDialog(true);
      return false;
    }
    return true;
  };

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
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Resources</h1>
              <p className="text-muted-foreground">Educational content, downloads, and trusted sources</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Latest Articles
                </CardTitle>
                <CardDescription>
                  Evidence-based articles on maternal and child health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {blogPosts.map((post, index) => (
                    <Card 
                      key={index} 
                      className={`bg-muted/30 hover:shadow-md transition-shadow ${!post.premium || isPremium ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      onClick={() => handlePremiumContent(post.premium)}
                    >
                      <CardContent className="p-4 relative">
                        {post.premium && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-amber-500/10 p-1.5 rounded-full">
                              <Lock className="w-3 h-3 text-amber-600" />
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Video Resources
                </CardTitle>
                <CardDescription>
                  Educational videos on pregnancy and child care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: "Prenatal Yoga Basics", duration: "15:24", premium: false },
                    { title: "Newborn Care 101", duration: "22:18", premium: true },
                    { title: "Breastfeeding Positions", duration: "12:45", premium: true },
                  ].map((video, index) => (
                    <div
                      key={index}
                      className={`relative aspect-video bg-muted rounded-xl overflow-hidden group ${!video.premium || isPremium ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      onClick={() => handlePremiumContent(video.premium)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {video.premium && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="bg-amber-500/90 p-1.5 rounded-full">
                            <Lock className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Video className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-sm font-medium text-white">{video.title}</p>
                        <p className="text-xs text-white/70">{video.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Downloadable Resources
                </CardTitle>
                <CardDescription>
                  Printable checklists, trackers, and guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {downloadableResources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Trusted Sources
                </CardTitle>
                <CardDescription>
                  Credible organizations for maternal and child health information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {trustedSources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-muted-foreground">{source.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-xl">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Have questions? Send us a message and we&apos;ll get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your question..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="rounded-xl">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              Premium Content
            </DialogTitle>
            <DialogDescription>
              This content is only available to premium subscribers. Upgrade now to access exclusive articles, videos, and resources.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/pricing">
              <Button className="w-full rounded-xl">
                Upgrade to Premium
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full rounded-xl"
              onClick={() => setShowUpgradeDialog(false)}
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}