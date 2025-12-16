"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Calendar,
  Activity,
  Target,
  ArrowRight,
  Lock,
  Clock,
  TrendingUp,
  Droplets,
  Baby,
  Stethoscope,
  Send,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSubscription } from "@/context/SubscriptionContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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

function DueDateCalculator() {
  const [lmp, setLmp] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [weeksPregnant, setWeeksPregnant] = useState<number | null>(null);

  const calculateDueDate = () => {
    if (!lmp) return;
    const lmpDate = new Date(lmp);
    const dueDateCalc = new Date(lmpDate);
    dueDateCalc.setDate(dueDateCalc.getDate() + 280);
    
    const today = new Date();
    const diffTime = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    
    setDueDate(dueDateCalc.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }));
    setWeeksPregnant(weeks);
  };

  return (
    <Card id="due-date">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Due Date Calculator
        </CardTitle>
        <CardDescription>
          Calculate your estimated due date based on your last menstrual period (LMP).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lmp">First Day of Last Menstrual Period</Label>
          <Input
            id="lmp"
            type="date"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <Button onClick={calculateDueDate} className="rounded-xl">
          Calculate
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        {dueDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-primary/10 rounded-xl"
          >
            <p className="text-sm text-muted-foreground">Estimated Due Date</p>
            <p className="text-xl font-bold text-primary">{dueDate}</p>
            {weeksPregnant !== null && weeksPregnant > 0 && weeksPregnant < 42 && (
              <p className="text-sm text-muted-foreground mt-2">
                You are approximately <span className="font-semibold text-foreground">{weeksPregnant} weeks</span> pregnant
              </p>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function ContractionTimer() {
  const [contractions, setContractions] = useState<{ startTime: Date; duration: number }[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const startContraction = () => {
    setStartTime(new Date());
    setIsTimerActive(true);
  };

  const endContraction = () => {
    if (startTime) {
      const duration = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      setContractions([{ startTime, duration }, ...contractions].slice(0, 10));
      setIsTimerActive(false);
      setStartTime(null);
    }
  };

  const getAverageInterval = () => {
    if (contractions.length < 2) return null;
    let totalInterval = 0;
    for (let i = 0; i < contractions.length - 1; i++) {
      const interval = (contractions[i].startTime.getTime() - contractions[i + 1].startTime.getTime()) / 60000;
      totalInterval += interval;
    }
    return (totalInterval / (contractions.length - 1)).toFixed(1);
  };

  return (
    <Card id="contraction-timer">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Contraction Timer
        </CardTitle>
        <CardDescription>
          Track your contractions to determine if it&apos;s time to go to the hospital.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          {!isTimerActive ? (
            <Button onClick={startContraction} className="rounded-xl flex-1">
              Start Contraction
            </Button>
          ) : (
            <Button onClick={endContraction} variant="destructive" className="rounded-xl flex-1">
              End Contraction
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setContractions([])}
            disabled={contractions.length === 0}
            className="rounded-xl"
          >
            Clear
          </Button>
        </div>

        {contractions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="text-sm text-muted-foreground">Average Interval</p>
              <p className="text-2xl font-bold text-primary">{getAverageInterval() || "—"} minutes</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Recent Contractions</p>
              {contractions.slice(0, 5).map((c, idx) => (
                <div key={idx} className="flex justify-between p-2 bg-muted/50 rounded-lg text-sm">
                  <span>{c.startTime.toLocaleTimeString()}</span>
                  <span className="font-medium">{c.duration}s</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function KickCounter() {
  const [kicks, setKicks] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const addKick = () => {
    if (!startTime) setStartTime(new Date());
    const newKicks = kicks + 1;
    setKicks(newKicks);
    
    if (newKicks === 10 && startTime) {
      const durationMins = Math.floor((new Date().getTime() - startTime.getTime()) / 60000);
      setDuration(durationMins);
    }
  };

  const reset = () => {
    setKicks(0);
    setStartTime(null);
    setDuration(null);
  };

  return (
    <Card id="kick-counter">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Baby className="w-5 h-5 text-primary" />
          Kick Counter
        </CardTitle>
        <CardDescription>
          Track your baby&apos;s movements. Aim for 10 kicks within 2 hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-8">
          <motion.div
            key={kicks}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold text-primary mb-2"
          >
            {kicks}
          </motion.div>
          <p className="text-muted-foreground">kicks counted</p>
        </div>

        <div className="flex gap-3">
          <Button onClick={addKick} disabled={kicks >= 10} className="rounded-xl flex-1">
            Add Kick
          </Button>
          <Button variant="outline" onClick={reset} className="rounded-xl">
            Reset
          </Button>
        </div>

        {duration && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary/10 rounded-xl text-center"
          >
            <p className="text-sm text-muted-foreground">10 kicks reached in</p>
            <p className="text-2xl font-bold text-primary">{duration} minutes</p>
            <p className="text-xs text-muted-foreground mt-2">
              {duration <= 120 ? "✓ Normal activity" : "⚠ Consider consulting your healthcare provider"}
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function WaterIntakeTracker() {
  const [glasses, setGlasses] = useState(0);
  const target = 8;

  return (
    <Card id="water-tracker">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-primary" />
          Water Intake Tracker
        </CardTitle>
        <CardDescription>
          Stay hydrated during pregnancy. Aim for 8-10 glasses per day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((glasses / target) * 100, 100)}%` }}
              className="h-full bg-blue-500"
            />
          </div>
          <span className="text-sm font-medium">{glasses}/{target}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGlasses(idx < glasses ? idx : idx + 1)}
              className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-colors ${
                idx < glasses
                  ? "bg-blue-500 border-blue-600 text-white"
                  : "bg-muted border-muted-foreground/20"
              }`}
            >
              <Droplets className="w-5 h-5" />
            </motion.button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setGlasses(0)}
          disabled={glasses === 0}
          className="rounded-xl w-full"
        >
          Reset Daily Count
        </Button>
      </CardContent>
    </Card>
  );
}

function PregnancyWeightGainChart() {
  const [currentWeek, setCurrentWeek] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [prePregnancyWeight, setPrePregnancyWeight] = useState("");
  const [bmiCategory, setBmiCategory] = useState<string | null>(null);

  const calculateRecommendation = () => {
    const week = parseInt(currentWeek);
    const weight = parseFloat(currentWeight);
    const preWeight = parseFloat(prePregnancyWeight);

    if (!week || !weight || !preWeight) return;

    const heightDefault = 165;
    const bmi = preWeight / ((heightDefault / 100) ** 2);
    
    let category = "";
    let expectedGainMin = 0;
    let expectedGainMax = 0;

    if (bmi < 18.5) {
      category = "Underweight";
      expectedGainMin = (28 / 40) * week;
      expectedGainMax = (40 / 40) * week;
    } else if (bmi < 25) {
      category = "Normal weight";
      expectedGainMin = (25 / 40) * week;
      expectedGainMax = (35 / 40) * week;
    } else if (bmi < 30) {
      category = "Overweight";
      expectedGainMin = (15 / 40) * week;
      expectedGainMax = (25 / 40) * week;
    } else {
      category = "Obese";
      expectedGainMin = (11 / 40) * week;
      expectedGainMax = (20 / 40) * week;
    }

    const actualGain = weight - preWeight;
    setBmiCategory(`${category}: Expected ${expectedGainMin.toFixed(1)}-${expectedGainMax.toFixed(1)} lbs (Current: ${actualGain.toFixed(1)} lbs)`);
  };

  return (
    <Card id="weight-gain-chart">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Pregnancy Weight Gain Tracker
        </CardTitle>
        <CardDescription>
          Monitor your weight gain against recommended guidelines.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pre-weight">Pre-pregnancy Weight (lbs)</Label>
            <Input
              id="pre-weight"
              type="number"
              placeholder="130"
              value={prePregnancyWeight}
              onChange={(e) => setPrePregnancyWeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-weight">Current Weight (lbs)</Label>
            <Input
              id="current-weight"
              type="number"
              placeholder="145"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="week">Current Week</Label>
            <Input
              id="week"
              type="number"
              placeholder="20"
              value={currentWeek}
              onChange={(e) => setCurrentWeek(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculateRecommendation} className="rounded-xl">
          Check Progress
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {bmiCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary/10 rounded-xl"
          >
            <p className="text-sm text-muted-foreground mb-1">Weight Gain Status</p>
            <p className="text-base font-semibold">{bmiCategory}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function BMICalculator() {
  const { isPremium } = useSubscription();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [prePregnancyWeight, setPrePregnancyWeight] = useState("");
  const [weeksPregnant, setWeeksPregnant] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    recommendedGain: string;
    currentGain: number;
  } | null>(null);

  const calculateBMI = () => {
    if (!isPremium) {
      setShowUpgradeDialog(true);
      return;
    }

    const h = parseFloat(height) / 100;
    const ppw = parseFloat(prePregnancyWeight);
    const w = parseFloat(weight);
    
    if (!h || !ppw || !w) return;
    
    const bmi = ppw / (h * h);
    let category = "";
    let recommendedGain = "";
    
    if (bmi < 18.5) {
      category = "Underweight";
      recommendedGain = "28-40 lbs (12.5-18 kg)";
    } else if (bmi < 25) {
      category = "Normal weight";
      recommendedGain = "25-35 lbs (11.5-16 kg)";
    } else if (bmi < 30) {
      category = "Overweight";
      recommendedGain = "15-25 lbs (7-11.5 kg)";
    } else {
      category = "Obese";
      recommendedGain = "11-20 lbs (5-9 kg)";
    }
    
    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      recommendedGain,
      currentGain: Math.round((w - ppw) * 10) / 10,
    });
  };

  return (
    <>
      <Card id="bmi" className={!isPremium ? "relative" : ""}>
        {!isPremium && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-amber-500/90 p-2 rounded-full">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Pregnancy BMI Calculator
            {!isPremium && (
              <span className="ml-auto text-xs bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full">
                Premium Only
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Calculate your pre-pregnancy BMI and recommended weight gain.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={!isPremium ? "opacity-50 pointer-events-none" : ""}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="165"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preweight">Pre-Pregnancy Weight (kg)</Label>
                <Input
                  id="preweight"
                  type="number"
                  placeholder="60"
                  value={prePregnancyWeight}
                  onChange={(e) => setPrePregnancyWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Current Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="65"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weeks">Weeks Pregnant</Label>
                <Input
                  id="weeks"
                  type="number"
                  placeholder="20"
                  value={weeksPregnant}
                  onChange={(e) => setWeeksPregnant(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button onClick={calculateBMI} className="rounded-xl">
            Calculate
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          {result && isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-primary/10 rounded-xl space-y-2"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pre-Pregnancy BMI</p>
                  <p className="text-xl font-bold text-primary">{result.bmi}</p>
                  <p className="text-sm text-muted-foreground">{result.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recommended Total Gain</p>
                  <p className="text-xl font-bold text-primary">{result.recommendedGain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Weight Gain</p>
                  <p className="text-xl font-bold">{result.currentGain} kg ({Math.round(result.currentGain * 2.205)} lbs)</p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              Premium Tool
            </DialogTitle>
            <DialogDescription>
              The Pregnancy BMI Calculator is only available to premium subscribers. Upgrade now to access this tool and other exclusive features.
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
    </>
  );
}

function MilestoneTracker() {
  const { isPremium } = useSubscription();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [childAge, setChildAge] = useState("");
  const [milestones, setMilestones] = useState<string[]>([]);

  const milestoneData: Record<string, string[]> = {
    "2": ["Social smile", "Follows objects", "Makes cooing sounds", "Lifts head"],
    "4": ["Laughs out loud", "Reaches for toys", "Holds head steady", "Rolls over"],
    "6": ["Responds to name", "Sits with support", "Rolls both ways", "Babbles"],
    "9": ["Crawls", "Stands holding on", "Says mama/dada", "Pincer grasp"],
    "12": ["First steps", "First words", "Waves bye-bye", "Drinks from cup"],
    "18": ["Walks well", "10-25 words", "Points to show", "Follows commands"],
    "24": ["Runs", "2-word phrases", "Parallel play", "Kicks ball"],
  };

  const checkMilestones = () => {
    if (!isPremium) {
      setShowUpgradeDialog(true);
      return;
    }

    const age = childAge;
    if (milestoneData[age]) {
      setMilestones(milestoneData[age]);
    }
  };

  return (
    <>
      <Card id="milestone-tracker" className={!isPremium ? "relative" : ""}>
        {!isPremium && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-amber-500/90 p-2 rounded-full">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Milestone Tracker
            {!isPremium && (
              <span className="ml-auto text-xs bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full">
                Premium Only
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Check expected developmental milestones for your child&apos;s age.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={!isPremium ? "opacity-50 pointer-events-none" : ""}>
            <div className="space-y-2">
              <Label>Child&apos;s Age (months)</Label>
              <Select value={childAge} onValueChange={setChildAge}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 months</SelectItem>
                  <SelectItem value="4">4 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="9">9 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={checkMilestones} className="rounded-xl">
            Check Milestones
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          {milestones.length > 0 && isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <p className="text-sm text-muted-foreground mb-3">
                Expected milestones at {childAge} months:
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      id={`milestone-${index}`}
                      className="w-4 h-4 rounded border-primary text-primary focus:ring-primary"
                    />
                    <label htmlFor={`milestone-${index}`} className="text-sm cursor-pointer">
                      {milestone}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Every child develops at their own pace. Consult your pediatrician if you have concerns.
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              Premium Tool
            </DialogTitle>
            <DialogDescription>
              The Milestone Tracker is only available to premium subscribers. Upgrade now to access this tool and other exclusive features.
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
    </>
  );
}

function DoctorConsultation() {
  const { isPremium } = useSubscription();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "doctor"; content: string }[]>([
    {
      role: "doctor",
      content: "Hello! I'm here to help with your maternal and child health questions. Please describe your concern, and I'll provide professional medical guidance. Remember, for emergencies, please call your local emergency number or visit the nearest hospital.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPremium) {
      setShowUpgradeDialog(true);
      return;
    }

    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role === "doctor" ? "assistant" : "user", content: m.content })).concat({ role: "user", content: userMessage }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "doctor",
            content: data.error || "I'm having trouble responding right now. Please try again in a moment.",
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "doctor", content: data.message }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "doctor",
          content: "I'm having trouble connecting right now. Please check your internet connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card id="doctor-consultation" className={!isPremium ? "relative" : ""}>
        {!isPremium && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-amber-500/90 p-2 rounded-full">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            Doctor Consultation
            {!isPremium && (
              <span className="ml-auto text-xs bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full">
                Premium Only
              </span>
            )}
          </CardTitle>
          <CardDescription>
            Chat with our AI health assistant for professional maternal and child health guidance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isPremium ? (
            <div className="opacity-50 pointer-events-none">
              <div className="h-[400px] bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Premium feature - Upgrade to access</p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[400px] border rounded-lg p-4">
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
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
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
                      <div className="bg-muted px-4 py-3 rounded-2xl">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your health question..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center">
                This is for informational purposes only. Always consult a healthcare provider for medical advice.
              </p>
            </>
          )}
          {!isPremium && (
            <Button onClick={() => setShowUpgradeDialog(true)} className="w-full rounded-xl">
              Upgrade to Access Doctor Consultation
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              Premium Feature
            </DialogTitle>
            <DialogDescription>
              Doctor Consultation is only available to premium subscribers. Get unlimited access to professional health guidance, personalized advice, and instant support.
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
    </>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-8 px-6 lg:px-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Health Tools</h1>
              <p className="text-muted-foreground">Interactive calculators and trackers for your health journey</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <DueDateCalculator />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ContractionTimer />
          </motion.div>

          <motion.div variants={itemVariants}>
            <KickCounter />
          </motion.div>

          <motion.div variants={itemVariants}>
            <WaterIntakeTracker />
          </motion.div>

          <motion.div variants={itemVariants}>
            <PregnancyWeightGainChart />
          </motion.div>

          <motion.div variants={itemVariants}>
            <BMICalculator />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MilestoneTracker />
          </motion.div>

          <motion.div variants={itemVariants}>
            <DoctorConsultation />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}