"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const searchableContent = [
  { title: "First Prenatal Visit", href: "/antenatal#first-visit", category: "Antenatal" },
  { title: "Prenatal Nutrition Guide", href: "/antenatal#nutrition", category: "Antenatal" },
  { title: "Lab Tests & Screenings", href: "/antenatal#labs", category: "Antenatal" },
  { title: "Childbirth Preparation", href: "/childbirth#preparation", category: "Childbirth" },
  { title: "Labor & Delivery", href: "/childbirth#labor", category: "Childbirth" },
  { title: "Postpartum Recovery", href: "/childbirth#recovery", category: "Postnatal" },
  { title: "Vaccination Schedule", href: "/child-health#vaccinations", category: "Child Health" },
  { title: "Developmental Milestones", href: "/child-health#milestones", category: "Child Health" },
  { title: "Growth Charts", href: "/child-health#growth", category: "Child Health" },
  { title: "Due Date Calculator", href: "/tools#due-date", category: "Tools" },
  { title: "BMI Calculator", href: "/tools#bmi", category: "Tools" },
  { title: "Milestone Tracker", href: "/tools#milestone-tracker", category: "Tools" },
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredResults = query.length > 0
    ? searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search resources, guides, tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-10 pr-10 h-11 bg-card border-border"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            {filteredResults.map((result, index) => (
              <Link
                key={index}
                href={result.href}
                className="flex items-center justify-between px-4 py-3 hover:bg-secondary transition-colors"
              >
                <span className="font-medium">{result.title}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {result.category}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
