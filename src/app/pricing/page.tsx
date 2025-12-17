"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Crown, MessageCircle, Calculator, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

const features = [
  { icon: MessageCircle, text: "AI Health Consultation Chatbot" },
  { icon: Calculator, text: "Advanced Health Tracking Tools" },
  { icon: BookOpen, text: "Expert-Curated Resource Library" },
  { icon: Shield, text: "Priority Support" },
];

export default function PricingPage() {
  const { isPremium, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
        <div className="max-w-2xl mx-auto text-center py-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">You&apos;re a Premium Member!</h1>
          <p className="text-slate-600 mb-8">
            You have access to all premium features including the AI Health Consultation Chatbot.
          </p>
          <Link href="/account">
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
              Manage Subscription
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Unlock Premium Features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Premium</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get unlimited access to our AI-powered health consultation chatbot and all premium features designed for maternal and child health.
          </p>
        </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {new Date().getMonth() === 11 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full border-2 border-green-400 relative overflow-hidden shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg animate-pulse">
                    CHRISTMAS OFFER
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-green-700">December Only</CardTitle>
                    <CardDescription className="text-green-600">Limited time holiday special</CardDescription>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-slate-900">$4.99</span>
                      <span className="text-slate-500">/month</span>
                      <div className="mt-1">
                        <span className="text-sm text-slate-500 line-through">$7.99/month</span>
                        <span className="text-sm text-green-600 ml-2 font-medium">Save 38%</span>
                      </div>
                      <p className="text-xs text-green-700 mt-2 font-medium">
                        Offer expires Dec 31st • Reverts to $7.99/mo after
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-700">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                    <Link href="/checkout?plan=christmas">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg" size="lg">
                        Get Christmas Offer
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="h-full border-2 border-slate-200 hover:border-rose-300 transition-colors">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold">Monthly</CardTitle>
                  <CardDescription>Perfect for trying out premium</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-slate-900">$7.99</span>
                    <span className="text-slate-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  <Link href="/checkout?plan=monthly">
                    <Button className="w-full" variant="outline" size="lg">
                      Get Monthly Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-2 border-rose-400 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  SAVE 5%
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    Annual
                    <Crown className="w-5 h-5 text-amber-500" />
                  </CardTitle>
                  <CardDescription>Best value for dedicated users</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-slate-900">$91.08</span>
                    <span className="text-slate-500">/year</span>
                    <div className="mt-1">
                      <span className="text-sm text-slate-500 line-through">$95.88/year</span>
                      <span className="text-sm text-green-600 ml-2 font-medium">Save $4.80</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  <Link href="/checkout?plan=annual">
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700" size="lg">
                      Get Annual Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-slate-500"
        >
          <p>Secure payment powered by Stripe. Cancel anytime.</p>
        </motion.div>
      </div>
    </div>
  );
}
