"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSubscription } from "@/context/SubscriptionContext";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your maternal and child health assistant. I can help answer questions about pregnancy, childbirth, newborn care, child development, and more. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isPremium, isLoading: subscriptionLoading } = useSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !isPremium) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again or contact support if the issue persists.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const PremiumGate = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mb-4">
        <Lock className="w-8 h-8 text-rose-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">Premium Feature</h3>
      <p className="text-sm text-slate-600 mb-6">
        Unlock the AI Health Consultation Chatbot with a premium subscription. Get personalized maternal and child health guidance.
      </p>
      <Link href="/pricing" onClick={() => setIsOpen(false)}>
        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
          <Sparkles className="w-4 h-4 mr-2" />
          Upgrade to Premium
        </Button>
      </Link>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md"
          >
            <Card className="shadow-2xl border-2 border-rose-200">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-t-lg pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Health Assistant
                    {isPremium && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Premium</span>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-sm text-white/90 mt-1">
                  Ask me about maternal & child health
                </p>
              </CardHeader>
              <CardContent className="p-0">
                {subscriptionLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
                  </div>
                ) : !isPremium ? (
                  <PremiumGate />
                ) : (
                  <>
                    <ScrollArea className="h-[400px] p-4">
                      <div className="space-y-4">
                        {messages.map((msg, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                                msg.role === "user"
                                  ? "bg-rose-500 text-white"
                                  : "bg-slate-100 text-slate-900"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>
                          </motion.div>
                        ))}
                        {isLoading && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                          >
                            <div className="bg-slate-100 px-4 py-3 rounded-2xl">
                              <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </ScrollArea>
                    <form onSubmit={handleSubmit} className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Type your question..."
                          disabled={isLoading}
                          className="flex-1"
                        />
                        <Button
                          type="submit"
                          disabled={isLoading || !input.trim()}
                          className="bg-rose-500 hover:bg-rose-600 text-white"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 text-center">
                        Always consult a healthcare provider for medical advice
                      </p>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-2xl relative"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
          {!isPremium && !subscriptionLoading && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
              <Lock className="w-3 h-3 text-amber-900" />
            </div>
          )}
        </Button>
      </motion.div>
    </>
  );
}
