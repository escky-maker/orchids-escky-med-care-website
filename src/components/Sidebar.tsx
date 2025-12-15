"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Baby,
  Heart,
  Activity,
  Calculator,
  BookOpen,
  Info,
  Menu,
  X,
  Moon,
  Sun,
  ChevronRight,
  Crown,
  Sparkles,
  LogIn,
  UserPlus,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/context/SubscriptionContext";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/antenatal", label: "Antenatal Care", icon: Heart },
  { href: "/childbirth", label: "Childbirth & Postnatal", icon: Baby },
  { href: "/child-health", label: "Child Health", icon: Activity },
  { href: "/tools", label: "Tools", icon: Calculator },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const { isPremium, isLoading } = useSubscription();
  const { user, signOut } = useAuth();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const PremiumButton = ({ onClick }: { onClick?: () => void }) => {
    if (isLoading) return null;

    if (isPremium) {
      return (
        <Link href="/account" onClick={onClick}>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 hover:from-amber-200 hover:to-yellow-200 transition-colors">
            <Crown className="w-5 h-5 text-amber-600" />
            <span className="font-medium">Premium Member</span>
          </div>
        </Link>
      );
    }

    return (
      <Link href="/pricing" onClick={onClick}>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 transition-colors shadow-lg">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Go Premium</span>
        </div>
      </Link>
    );
  };

  const AuthButtons = ({ onClick }: { onClick?: () => void }) => {
    if (!user) {
      return (
        <div className="space-y-2">
          <Link href="/login" onClick={onClick}>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Sign In</span>
            </button>
          </Link>
          <Link href="/signup" onClick={onClick}>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border hover:bg-sidebar-accent transition-colors text-sidebar-foreground">
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Sign Up</span>
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <Link href="/account" onClick={onClick}>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-sidebar-accent transition-colors text-sidebar-foreground">
            <User className="w-5 h-5" />
            <span className="font-medium truncate">{user.email}</span>
          </button>
        </Link>
        <button
          onClick={() => {
            signOut();
            onClick?.();
          }}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 rounded-xl bg-card border border-border shadow-lg lg:hidden hover:bg-secondary transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-12 h-12" />
            <div>
              <h1 className="font-bold text-lg text-sidebar-foreground">Escky Med Care</h1>
              <p className="text-xs text-muted-foreground">Maternal & Child Health</p>
            </div>
          </Link>
        </div>

        <div className="p-4">
          <PremiumButton />
        </div>

        <div className="p-4 space-y-2">
          <AuthButtons />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-screen w-72 flex flex-col bg-sidebar border-r border-sidebar-border z-50 lg:hidden"
            >
              <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  <Logo className="w-12 h-12" />
                  <div>
                    <h1 className="font-bold text-lg text-sidebar-foreground">Escky Med Care</h1>
                    <p className="text-xs text-muted-foreground">Maternal & Child Health</p>
                  </div>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <PremiumButton onClick={() => setIsOpen(false)} />
              </div>

              <div className="p-4 space-y-2">
                <AuthButtons onClick={() => setIsOpen(false)} />
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-sidebar-border">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}