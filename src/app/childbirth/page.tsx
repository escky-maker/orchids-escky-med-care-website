"use client";

import { motion } from "framer-motion";
import {
  Baby,
  Heart,
  Clock,
  AlertCircle,
  CheckCircle2,
  Stethoscope,
  Moon,
  Brain,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const laborStages = [
  {
    stage: "Early Labor",
    duration: "6-12 hours (first pregnancy)",
    cervix: "0-6 cm dilated",
    contractions: "5-30 min apart, 30-45 seconds",
    tips: ["Rest and relax", "Stay hydrated", "Time contractions", "Take a warm shower"],
  },
  {
    stage: "Active Labor",
    duration: "4-8 hours",
    cervix: "6-10 cm dilated",
    contractions: "3-5 min apart, 45-60 seconds",
    tips: ["Use breathing techniques", "Change positions frequently", "Consider pain management", "Stay focused"],
  },
  {
    stage: "Transition",
    duration: "15 min - 1 hour",
    cervix: "8-10 cm dilated",
    contractions: "2-3 min apart, 60-90 seconds",
    tips: ["Most intense phase", "Focus on one contraction at a time", "Trust your body", "Almost there!"],
  },
  {
    stage: "Pushing & Delivery",
    duration: "20 min - 2 hours",
    cervix: "Fully dilated",
    contractions: "Every 2-5 min",
    tips: ["Push with contractions", "Rest between pushes", "Follow provider guidance", "Meet your baby!"],
  },
];

const postpartumTimeline = [
  { time: "First 24 hours", tasks: ["Skin-to-skin contact", "First breastfeeding", "Monitor bleeding", "Rest and bond"] },
  { time: "1-2 weeks", tasks: ["Lochia (bleeding) continues", "Uterus contracting", "Milk coming in", "Limit visitors"] },
  { time: "2-6 weeks", tasks: ["6-week checkup scheduled", "Bleeding tapering off", "Establish feeding routine", "Watch for PPD signs"] },
  { time: "6-12 weeks", tasks: ["Postpartum checkup", "Discuss contraception", "Return to exercise (if cleared)", "Mental health check"] },
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

export default function ChildbirthPage() {
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
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Baby className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Childbirth & Postnatal Care</h1>
              <p className="text-muted-foreground">Labor preparation, delivery, and postpartum recovery</p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="preparation" className="space-y-8">
          <motion.div variants={itemVariants}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="preparation" className="py-3">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Preparation
              </TabsTrigger>
              <TabsTrigger value="labor" className="py-3">
                <Clock className="w-4 h-4 mr-2" />
                Labor & Delivery
              </TabsTrigger>
              <TabsTrigger value="recovery" className="py-3">
                <Heart className="w-4 h-4 mr-2" />
                Recovery
              </TabsTrigger>
              <TabsTrigger value="mental-health" className="py-3">
                <Brain className="w-4 h-4 mr-2" />
                Mental Health
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="preparation" className="space-y-6" id="preparation">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Birth Plan Essentials
                  </CardTitle>
                  <CardDescription>
                    Create a flexible birth plan to communicate your preferences. Remember, plans may change based on circumstances.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="environment">
                      <AccordionTrigger>Environment Preferences</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Lighting preferences (dim, natural)</li>
                          <li>• Music or quiet environment</li>
                          <li>• Who you want present during labor</li>
                          <li>• Photography/video preferences</li>
                          <li>• Mobility during labor</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="pain">
                      <AccordionTrigger>Pain Management Options</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Non-Pharmacological</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Breathing techniques</li>
                              <li>• Movement and positioning</li>
                              <li>• Water therapy (shower/tub)</li>
                              <li>• Massage and counterpressure</li>
                              <li>• TENS machine</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Pharmacological</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Epidural anesthesia</li>
                              <li>• Spinal block</li>
                              <li>• IV pain medications</li>
                              <li>• Nitrous oxide (if available)</li>
                              <li>• Local anesthesia</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after-birth">
                      <AccordionTrigger>Immediately After Birth</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Delayed cord clamping preference</li>
                          <li>• Skin-to-skin contact preferences</li>
                          <li>• Cord blood banking decision</li>
                          <li>• Feeding preferences (breast/formula)</li>
                          <li>• Newborn procedures timing</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Hospital Bag Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        For Mom
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>☐ Insurance card & ID</li>
                        <li>☐ Birth plan copies</li>
                        <li>☐ Comfortable robe/gown</li>
                        <li>☐ Toiletries</li>
                        <li>☐ Phone & charger</li>
                        <li>☐ Going-home outfit</li>
                        <li>☐ Nursing bras</li>
                        <li>☐ Slippers/socks</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Baby className="w-4 h-4 text-primary" />
                        For Baby
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>☐ Going-home outfit</li>
                        <li>☐ Swaddle blanket</li>
                        <li>☐ Car seat (installed!)</li>
                        <li>☐ Hat & mittens</li>
                        <li>☐ Diapers (hospital provides)</li>
                        <li>☐ Pacifier (if using)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        For Partner
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>☐ Snacks & drinks</li>
                        <li>☐ Change of clothes</li>
                        <li>☐ Phone & charger</li>
                        <li>☐ Toiletries</li>
                        <li>☐ Pillow/blanket</li>
                        <li>☐ Entertainment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="labor" className="space-y-6" id="labor">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Stages of Labor
                  </CardTitle>
                  <CardDescription>
                    Understanding what to expect during each stage of labor.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {laborStages.map((stage, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative"
                    >
                      <Card className="bg-muted/30">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-2">{stage.stage}</h3>
                              <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Duration</p>
                                  <p className="text-sm font-medium">{stage.duration}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Cervix</p>
                                  <p className="text-sm font-medium">{stage.cervix}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Contractions</p>
                                  <p className="text-sm font-medium">{stage.contractions}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {stage.tips.map((tip, tipIndex) => (
                                  <span
                                    key={tipIndex}
                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                  >
                                    {tip}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-amber-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-5 h-5" />
                    When to Go to the Hospital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">5-1-1 Rule</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Go when contractions are:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">5</div>
                          <span>minutes apart</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</div>
                          <span>minute long</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</div>
                          <span>hour pattern</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-destructive">Go Immediately If:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Water breaks (especially if not clear)
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Significant vaginal bleeding
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Decreased fetal movement
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Severe headache or vision changes
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Signs of preterm labor (before 37 weeks)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6" id="recovery">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600" />
                    Postpartum Recovery Timeline
                  </CardTitle>
                  <CardDescription>
                    What to expect during the fourth trimester and beyond.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {postpartumTimeline.map((period, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-24 shrink-0">
                                <span className="text-sm font-semibold text-primary">{period.time}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {period.tasks.map((task, taskIndex) => (
                                  <span
                                    key={taskIndex}
                                    className="text-sm bg-card border border-border px-3 py-1 rounded-full"
                                  >
                                    {task}
                                  </span>
                                ))}
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
                    <Stethoscope className="w-5 h-5 text-primary" />
                    Physical Recovery Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Vaginal Delivery</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Use ice packs for perineal swelling</li>
                        <li>• Sitz baths for comfort</li>
                        <li>• Peri bottle for hygiene</li>
                        <li>• Stool softeners as needed</li>
                        <li>• Kegel exercises when comfortable</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">C-Section Recovery</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Keep incision clean and dry</li>
                        <li>• Avoid lifting heavy objects</li>
                        <li>• Support abdomen when coughing</li>
                        <li>• Watch for infection signs</li>
                        <li>• Gradual return to activities</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="mental-health" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-violet-600" />
                    Postpartum Mental Health
                  </CardTitle>
                  <CardDescription>
                    Understanding the spectrum of postpartum mood disorders. You are not alone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Baby Blues</h4>
                        <p className="text-xs text-muted-foreground mb-2">Affects up to 80% of new mothers</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Mood swings, crying</li>
                          <li>• Anxiety, irritability</li>
                          <li>• Trouble sleeping</li>
                          <li>• Resolves within 2 weeks</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Postpartum Depression</h4>
                        <p className="text-xs text-muted-foreground mb-2">Affects 10-15% of mothers</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Persistent sadness</li>
                          <li>• Difficulty bonding</li>
                          <li>• Withdrawal from loved ones</li>
                          <li>• Requires professional help</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Postpartum Psychosis</h4>
                        <p className="text-xs text-muted-foreground mb-2">Rare - affects 1-2 per 1,000</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Confusion, disorientation</li>
                          <li>• Hallucinations, delusions</li>
                          <li>• Rapid mood swings</li>
                          <li>• Emergency - seek help immediately</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary" />
                    Self-Care & Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Daily Self-Care</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Sleep when baby sleeps
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Accept help from others
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Stay connected with loved ones
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Get fresh air and sunlight
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Maintain a basic routine
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">When to Seek Help</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Symptoms last beyond 2 weeks
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Unable to care for yourself or baby
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Thoughts of harming yourself or baby
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Severe anxiety or panic attacks
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          Hearing or seeing things others don&apos;t
                        </li>
                      </ul>
                    </div>
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
