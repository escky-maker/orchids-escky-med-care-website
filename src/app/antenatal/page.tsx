"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  Apple,
  TestTube,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Pill,
  Baby,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const visitSchedule = [
  { week: "8-10", visit: "First prenatal visit", description: "Confirmation of pregnancy, initial assessment, dating ultrasound" },
  { week: "12", visit: "First trimester screening", description: "NT scan, blood tests, genetic counseling" },
  { week: "16", visit: "Follow-up visit", description: "Check fetal heartbeat, discuss test results" },
  { week: "18-20", visit: "Anatomy scan", description: "Detailed ultrasound to check fetal development" },
  { week: "24-28", visit: "Glucose screening", description: "Test for gestational diabetes, Rh antibody screening" },
  { week: "28-32", visit: "Third trimester care", description: "Growth monitoring, position check" },
  { week: "36", visit: "GBS screening", description: "Group B Strep test, cervical examination" },
  { week: "36-40", visit: "Weekly visits", description: "Monitor for labor signs, fetal movement" },
];

const nutritionGuidelines = [
  { nutrient: "Folic Acid", amount: "400-800 mcg daily", sources: "Leafy greens, fortified cereals, beans", purpose: "Prevents neural tube defects" },
  { nutrient: "Iron", amount: "27 mg daily", sources: "Red meat, spinach, fortified cereals", purpose: "Prevents anemia, supports baby's growth" },
  { nutrient: "Calcium", amount: "1000 mg daily", sources: "Dairy, fortified plant milk, leafy greens", purpose: "Builds baby's bones and teeth" },
  { nutrient: "DHA", amount: "200-300 mg daily", sources: "Fatty fish, algae supplements", purpose: "Brain and eye development" },
  { nutrient: "Protein", amount: "71g daily", sources: "Lean meat, eggs, legumes, tofu", purpose: "Supports fetal tissue growth" },
  { nutrient: "Vitamin D", amount: "600 IU daily", sources: "Sunlight, fortified foods, supplements", purpose: "Bone health, immune function" },
];

const labTests = [
  { name: "Complete Blood Count (CBC)", timing: "First visit", purpose: "Check for anemia, infection" },
  { name: "Blood Type & Rh Factor", timing: "First visit", purpose: "Identify Rh incompatibility risk" },
  { name: "Rubella Immunity", timing: "First visit", purpose: "Ensure protection against rubella" },
  { name: "Hepatitis B & C", timing: "First visit", purpose: "Screen for viral hepatitis" },
  { name: "HIV Test", timing: "First visit", purpose: "Early detection for treatment" },
  { name: "Syphilis (VDRL/RPR)", timing: "First visit", purpose: "Prevent congenital syphilis" },
  { name: "Urinalysis", timing: "Each visit", purpose: "Check for UTI, protein, glucose" },
  { name: "NIPT/Cell-free DNA", timing: "10-14 weeks", purpose: "Screen for chromosomal abnormalities" },
  { name: "Glucose Challenge Test", timing: "24-28 weeks", purpose: "Screen for gestational diabetes" },
  { name: "Group B Strep", timing: "36-37 weeks", purpose: "Prevent newborn infection" },
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

export default function AntenatalPage() {
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
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Antenatal Care</h1>
              <p className="text-muted-foreground">Comprehensive prenatal guidance from first visit to delivery</p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="schedule" className="space-y-8">
          <motion.div variants={itemVariants}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="schedule" className="py-3">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="py-3">
                <Apple className="w-4 h-4 mr-2" />
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="labs" className="py-3">
                <TestTube className="w-4 h-4 mr-2" />
                Labs & Tests
              </TabsTrigger>
              <TabsTrigger value="risks" className="py-3">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Warning Signs
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="schedule" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Prenatal Visit Schedule
                  </CardTitle>
                  <CardDescription>
                    WHO recommends at least 8 contacts during pregnancy. Schedule may vary based on risk factors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-6">
                      {visitSchedule.map((visit, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="relative pl-10"
                        >
                          <div className="absolute left-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-semibold text-foreground">{visit.visit}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{visit.description}</p>
                                </div>
                                <span className="shrink-0 text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                                  Week {visit.week}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card id="first-visit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    First Visit Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="what-to-expect">
                      <AccordionTrigger>What to Expect</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Complete medical history review including previous pregnancies
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Physical examination and vital signs check
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Pregnancy confirmation and dating ultrasound
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Blood and urine tests ordered
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Discussion of lifestyle factors and prenatal vitamins
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="what-to-bring">
                      <AccordionTrigger>What to Bring</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Insurance card and ID
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            List of current medications and supplements
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Family medical history information
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            First day of last menstrual period (LMP)
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                            Questions for your healthcare provider
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6" id="nutrition">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="w-5 h-5 text-emerald-600" />
                    Prenatal Nutrition Guide
                  </CardTitle>
                  <CardDescription>
                    Essential nutrients for a healthy pregnancy. Weight gain target: 25-35 lbs for normal BMI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {nutritionGuidelines.map((item, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <Card className="bg-muted/30 h-full">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <Pill className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{item.nutrient}</h4>
                                <p className="text-sm text-primary font-medium">{item.amount}</p>
                                <p className="text-sm text-muted-foreground mt-1">{item.purpose}</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  <span className="font-medium">Sources:</span> {item.sources}
                                </p>
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
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Foods to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-destructive">Avoid Completely</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Raw or undercooked meat, fish, eggs</li>
                        <li>• Unpasteurized dairy and juices</li>
                        <li>• High-mercury fish (shark, swordfish, king mackerel)</li>
                        <li>• Alcohol in any amount</li>
                        <li>• Raw sprouts</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-amber-600">Limit Intake</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Caffeine (max 200mg/day)</li>
                        <li>• Processed meats (deli meats, hot dogs)</li>
                        <li>• Soft cheeses unless pasteurized</li>
                        <li>• Artificial sweeteners</li>
                        <li>• High-sodium foods</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="labs" className="space-y-6" id="labs">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-violet-600" />
                    Laboratory Tests & Screenings
                  </CardTitle>
                  <CardDescription>
                    Routine prenatal tests recommended by ACOG and WHO guidelines.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Test</th>
                          <th className="text-left py-3 px-4 font-semibold">Timing</th>
                          <th className="text-left py-3 px-4 font-semibold">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {labTests.map((test, index) => (
                          <motion.tr
                            key={index}
                            variants={itemVariants}
                            className="border-b last:border-0"
                          >
                            <td className="py-3 px-4 font-medium">{test.name}</td>
                            <td className="py-3 px-4">
                              <span className="text-sm bg-muted px-2 py-1 rounded">
                                {test.timing}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground text-sm">
                              {test.purpose}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Warning Signs - Seek Immediate Care
                  </CardTitle>
                  <CardDescription>
                    Contact your healthcare provider or go to the emergency room if you experience any of these symptoms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-destructive" />
                        Any Trimester
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Vaginal bleeding or fluid leakage
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Severe abdominal pain or cramping
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Severe headache with visual changes
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          High fever (over 100.4°F/38°C)
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Severe vomiting preventing fluid intake
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Baby className="w-4 h-4 text-destructive" />
                        Second/Third Trimester
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Decreased fetal movement
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Regular contractions before 37 weeks
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Sudden swelling of face, hands, or feet
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Pain or burning during urination
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Signs of preeclampsia (high BP, protein in urine)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Mental Health Screening</CardTitle>
                  <CardDescription>
                    Depression and anxiety affect 10-15% of pregnant women. Screening is recommended at each visit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The Edinburgh Postnatal Depression Scale (EPDS) is commonly used to screen for perinatal depression. 
                    Speak with your healthcare provider if you experience:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Persistent sadness or hopelessness
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Loss of interest in activities
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Excessive worry or anxiety
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Changes in sleep or appetite
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Difficulty bonding with baby
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Thoughts of self-harm
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
