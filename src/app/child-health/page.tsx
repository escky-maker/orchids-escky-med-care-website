"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Syringe,
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle2,
  Baby,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const vaccinationSchedule = [
  { age: "Birth", vaccines: ["Hepatitis B (1st dose)"], notes: "Given before hospital discharge" },
  { age: "2 months", vaccines: ["DTaP (1)", "Hib (1)", "IPV (1)", "PCV13 (1)", "Rotavirus (1)", "Hepatitis B (2)"], notes: "First major vaccination visit" },
  { age: "4 months", vaccines: ["DTaP (2)", "Hib (2)", "IPV (2)", "PCV13 (2)", "Rotavirus (2)"], notes: "Continue series" },
  { age: "6 months", vaccines: ["DTaP (3)", "Hib (3)", "PCV13 (3)", "Rotavirus (3)", "Influenza (annual)"], notes: "Flu vaccine recommended annually" },
  { age: "12-15 months", vaccines: ["MMR (1)", "Varicella (1)", "Hib (4)", "PCV13 (4)", "Hepatitis A (1)"], notes: "First birthday vaccines" },
  { age: "15-18 months", vaccines: ["DTaP (4)"], notes: "Booster dose" },
  { age: "4-6 years", vaccines: ["DTaP (5)", "IPV (4)", "MMR (2)", "Varicella (2)"], notes: "School entry vaccines" },
];

const milestones = {
  "2 months": [
    { skill: "Social smile", category: "Social" },
    { skill: "Follows objects with eyes", category: "Cognitive" },
    { skill: "Makes cooing sounds", category: "Language" },
    { skill: "Lifts head during tummy time", category: "Motor" },
  ],
  "4 months": [
    { skill: "Laughs out loud", category: "Social" },
    { skill: "Reaches for toys", category: "Motor" },
    { skill: "Babbles with expression", category: "Language" },
    { skill: "Holds head steady", category: "Motor" },
  ],
  "6 months": [
    { skill: "Responds to own name", category: "Social" },
    { skill: "Rolls both ways", category: "Motor" },
    { skill: "Sits with support", category: "Motor" },
    { skill: "Begins solid foods", category: "Feeding" },
  ],
  "9 months": [
    { skill: "Stranger anxiety", category: "Social" },
    { skill: "Crawls", category: "Motor" },
    { skill: "Says 'mama' or 'dada'", category: "Language" },
    { skill: "Pincer grasp developing", category: "Motor" },
  ],
  "12 months": [
    { skill: "First words", category: "Language" },
    { skill: "Pulls to stand", category: "Motor" },
    { skill: "Waves bye-bye", category: "Social" },
    { skill: "Shows preferences", category: "Cognitive" },
  ],
  "18 months": [
    { skill: "Walks independently", category: "Motor" },
    { skill: "10-25 word vocabulary", category: "Language" },
    { skill: "Points to show interest", category: "Social" },
    { skill: "Follows simple commands", category: "Cognitive" },
  ],
  "2 years": [
    { skill: "2-word phrases", category: "Language" },
    { skill: "Runs", category: "Motor" },
    { skill: "Parallel play", category: "Social" },
    { skill: "Sorts shapes/colors", category: "Cognitive" },
  ],
  "3 years": [
    { skill: "3-word sentences", category: "Language" },
    { skill: "Climbs well", category: "Motor" },
    { skill: "Takes turns", category: "Social" },
    { skill: "Understands 'mine'", category: "Cognitive" },
  ],
};

const warningSignsByAge = [
  { age: "4 months", signs: ["Doesn't watch moving objects", "Doesn't smile at people", "Can't hold head steady", "Doesn't coo or make sounds"] },
  { age: "6 months", signs: ["Doesn't reach for things", "Shows no affection for caregivers", "Doesn't respond to sounds", "Doesn't laugh or make squealing sounds"] },
  { age: "9 months", signs: ["Doesn't sit with help", "Doesn't babble", "Doesn't play back-and-forth games", "Doesn't respond to own name"] },
  { age: "12 months", signs: ["Doesn't crawl", "Can't stand with support", "Doesn't search for hidden objects", "Doesn't say single words"] },
  { age: "18 months", signs: ["Doesn't point to show interest", "Doesn't walk", "Doesn't know familiar objects", "Loses skills they once had"] },
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

const categoryColors: Record<string, string> = {
  Social: "bg-rose-500/10 text-rose-600",
  Cognitive: "bg-violet-500/10 text-violet-600",
  Language: "bg-blue-500/10 text-blue-600",
  Motor: "bg-emerald-500/10 text-emerald-600",
  Feeding: "bg-amber-500/10 text-amber-600",
};

export default function ChildHealthPage() {
  const [selectedAge, setSelectedAge] = useState<string>("2 months");

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
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Child Health</h1>
              <p className="text-muted-foreground">Vaccinations, milestones, growth tracking, and more</p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="vaccinations" className="space-y-8">
          <motion.div variants={itemVariants}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="vaccinations" className="py-3">
                <Syringe className="w-4 h-4 mr-2" />
                Vaccinations
              </TabsTrigger>
              <TabsTrigger value="milestones" className="py-3">
                <Target className="w-4 h-4 mr-2" />
                Milestones
              </TabsTrigger>
              <TabsTrigger value="growth" className="py-3">
                <TrendingUp className="w-4 h-4 mr-2" />
                Growth
              </TabsTrigger>
              <TabsTrigger value="warning" className="py-3">
                <AlertCircle className="w-4 h-4 mr-2" />
                Warning Signs
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="vaccinations" className="space-y-6" id="vaccinations">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Syringe className="w-5 h-5 text-primary" />
                    CDC Recommended Vaccination Schedule
                  </CardTitle>
                  <CardDescription>
                    Vaccines protect against 14 diseases by age 2. Schedule may vary based on health conditions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vaccinationSchedule.map((item, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                              <div className="md:w-32 shrink-0">
                                <Badge variant="outline" className="text-sm font-semibold">
                                  {item.age}
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {item.vaccines.map((vaccine, vIndex) => (
                                    <span
                                      key={vIndex}
                                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                    >
                                      {vaccine}
                                    </span>
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{item.notes}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Vaccine Abbreviations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">DTaP:</span>
                      <span className="text-muted-foreground">Diphtheria, Tetanus, Pertussis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Hib:</span>
                      <span className="text-muted-foreground">Haemophilus influenzae type b</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">IPV:</span>
                      <span className="text-muted-foreground">Inactivated Poliovirus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">PCV13:</span>
                      <span className="text-muted-foreground">Pneumococcal conjugate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">MMR:</span>
                      <span className="text-muted-foreground">Measles, Mumps, Rubella</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Varicella:</span>
                      <span className="text-muted-foreground">Chickenpox</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6" id="milestones">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Developmental Milestones
                  </CardTitle>
                  <CardDescription>
                    Track your child&apos;s progress. Remember, every child develops at their own pace.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Object.keys(milestones).map((age) => (
                      <button
                        key={age}
                        onClick={() => setSelectedAge(age)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedAge === age
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {milestones[selectedAge as keyof typeof milestones]?.map((milestone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                              <div>
                                <p className="font-medium">{milestone.skill}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[milestone.category]}`}>
                                  {milestone.category}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6" id="growth">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Growth Monitoring
                  </CardTitle>
                  <CardDescription>
                    Pediatricians track weight, length/height, and head circumference at each well-child visit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 text-center">
                        <Baby className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">Weight</h4>
                        <p className="text-sm text-muted-foreground">
                          Doubles by 5 months, triples by 1 year
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">Length/Height</h4>
                        <p className="text-sm text-muted-foreground">
                          Grows ~10 inches in first year
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardContent className="p-4 text-center">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">Head Circumference</h4>
                        <p className="text-sm text-muted-foreground">
                          Indicates brain development
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Well-Child Visit Schedule</h4>
                    <div className="space-y-3">
                      {[
                        { age: "Newborn", focus: "Weight check, jaundice screening" },
                        { age: "1 month", focus: "Growth, feeding assessment" },
                        { age: "2 months", focus: "Vaccines, developmental screening" },
                        { age: "4 months", focus: "Vaccines, growth tracking" },
                        { age: "6 months", focus: "Vaccines, solid food readiness" },
                        { age: "9 months", focus: "Developmental assessment" },
                        { age: "12 months", focus: "Vaccines, milestone review" },
                        { age: "15 months", focus: "Walking assessment, language" },
                        { age: "18 months", focus: "Autism screening, vaccines" },
                        { age: "2 years", focus: "Annual check, speech development" },
                      ].map((visit, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Badge variant="outline" className="w-24 justify-center">
                            {visit.age}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{visit.focus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Newborn Screenings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">At Birth</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Apgar score (1 & 5 minutes)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Vitamin K injection
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Eye prophylaxis
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Hepatitis B vaccine
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">24-48 Hours</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Newborn blood spot (PKU, hypothyroid, etc.)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Hearing screening
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Critical congenital heart defect screening
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Jaundice assessment
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="warning" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-amber-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-5 h-5" />
                    Developmental Warning Signs
                  </CardTitle>
                  <CardDescription>
                    If you notice these signs, consult your pediatrician. Early intervention makes a difference.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {warningSignsByAge.map((item, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <Badge variant="outline" className="md:w-28 justify-center shrink-0">
                            {item.age}
                          </Badge>
                          <div className="flex-1">
                            <div className="grid md:grid-cols-2 gap-2">
                              {item.signs.map((sign, sIndex) => (
                                <div key={sIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                  {sign}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {index < warningSignsByAge.length - 1 && (
                          <hr className="my-4 border-border" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-5 h-5" />
                    Emergency Signs in Infants
                  </CardTitle>
                  <CardDescription>
                    Seek immediate medical care if your baby shows any of these symptoms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Fever over 100.4°F (38°C) in babies under 3 months
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Difficulty breathing or blue color
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Refusing to eat or drink
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Unusual drowsiness or hard to wake
                      </li>
                    </ul>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Continuous crying that can&apos;t be soothed
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Rash with fever
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Signs of dehydration (dry mouth, no wet diapers)
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                        Seizures or convulsions
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}