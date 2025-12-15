"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Calendar,
  Activity,
  Target,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

function BMICalculator() {
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
    <Card id="bmi">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Pregnancy BMI Calculator
        </CardTitle>
        <CardDescription>
          Calculate your pre-pregnancy BMI and recommended weight gain.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <Button onClick={calculateBMI} className="rounded-xl">
          Calculate
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        {result && (
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
  );
}

function MilestoneTracker() {
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
    const age = childAge;
    if (milestoneData[age]) {
      setMilestones(milestoneData[age]);
    }
  };

  return (
    <Card id="milestone-tracker">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Milestone Tracker
        </CardTitle>
        <CardDescription>
          Check expected developmental milestones for your child&apos;s age.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <Button onClick={checkMilestones} className="rounded-xl">
          Check Milestones
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        {milestones.length > 0 && (
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
            <BMICalculator />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MilestoneTracker />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
