"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";

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
  AlertTriangle,
  Activity,
  Thermometer,
  Droplets,
  Phone,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const laborStages = [
  {
    stage: "Early Labor (Latent Phase)",
    duration: "6-12 hours (first pregnancy), 4-8 hours (subsequent)",
    cervix: "0-6 cm dilated, 0-80% effaced",
    contractions: "5-30 min apart, 30-45 seconds",
    tips: ["Rest and relax", "Stay hydrated", "Time contractions", "Take a warm shower"],
    whatToDo: [
      "Rest as much as possible - save energy for active labor",
      "Eat light, easily digestible foods",
      "Stay hydrated with water, clear fluids, or electrolyte drinks",
      "Use relaxation techniques: breathing, meditation, warm bath",
      "Time contractions when they become regular",
      "Continue normal activities if comfortable",
    ],
  },
  {
    stage: "Active Labor",
    duration: "4-8 hours (first pregnancy), 2-5 hours (subsequent)",
    cervix: "6-8 cm dilated, 80-100% effaced",
    contractions: "3-5 min apart, 45-60 seconds, strong intensity",
    tips: ["Use breathing techniques", "Change positions frequently", "Consider pain management", "Stay focused"],
    whatToDo: [
      "Focus on breathing: slow, deep breaths during contractions",
      "Try different positions: walking, squatting, hands and knees",
      "Use counterpressure on lower back if needed",
      "Request pain relief if desired (epidural typically given now)",
      "Stay hydrated with ice chips or sips of water",
      "Rest between contractions",
    ],
  },
  {
    stage: "Transition Phase",
    duration: "15 min - 1 hour",
    cervix: "8-10 cm dilated, 100% effaced",
    contractions: "2-3 min apart, 60-90 seconds, very intense",
    tips: ["Most intense phase", "Focus on one contraction at a time", "Trust your body", "Almost there!"],
    whatToDo: [
      "Focus intensely on breathing - this is the hardest part",
      "Accept support from birth partner/doula",
      "May feel nauseous, shaky, or hot/cold - all normal",
      "Resist urge to push until fully dilated",
      "Use vocalization if it helps",
      "Remember: this phase is short, baby is almost here",
    ],
  },
  {
    stage: "Pushing & Delivery (Second Stage)",
    duration: "20 min - 3 hours (first), 5 min - 1 hour (subsequent)",
    cervix: "Fully dilated (10 cm)",
    contractions: "Every 2-5 min, with strong urge to push",
    tips: ["Push with contractions", "Rest between pushes", "Follow provider guidance", "Meet your baby!"],
    whatToDo: [
      "Push when you feel the urge during contractions",
      "Push like having a bowel movement - use abdominal muscles",
      "Take deep breath at start of contraction, hold and push",
      "Rest completely between contractions to conserve energy",
      "Try different positions if baby isn't descending",
      "Listen to provider's guidance during crowning",
    ],
  },
  {
    stage: "Placenta Delivery (Third Stage)",
    duration: "5-30 minutes",
    cervix: "Delivery complete",
    contractions: "Mild contractions continue",
    tips: ["Placenta delivery", "Skin-to-skin with baby", "Monitor for bleeding", "Initial breastfeeding"],
    whatToDo: [
      "Continue mild contractions to deliver placenta",
      "Provider may massage abdomen to help uterus contract",
      "Skin-to-skin contact with baby helps with bonding and warmth",
      "Try breastfeeding within first hour if desired",
      "Provider will examine placenta to ensure it's complete",
      "May need stitches if there was tearing (local anesthesia given)",
    ],
  },
];

const dangerSigns = {
  labor: [
    {
      sign: "Severe Vaginal Bleeding",
      description: "Heavy bleeding (soaking a pad in less than an hour) or passage of large clots",
      action: "Call 911 or go to emergency room immediately",
      management: "May indicate placental abruption or other serious complications requiring emergency cesarean section",
      severity: "critical",
    },
    {
      sign: "Water Breaking with Green/Brown Fluid",
      description: "Amniotic fluid that is dark green, brown, or has a foul smell",
      action: "Go to hospital immediately",
      management: "May indicate meconium passage (fetal distress) or infection. Requires immediate evaluation and monitoring",
      severity: "critical",
    },
    {
      sign: "Sudden Severe Headache with Vision Changes",
      description: "Intense headache with blurred vision, seeing spots, or flashing lights",
      action: "Go to emergency room immediately",
      management: "May indicate severe preeclampsia/eclampsia. Requires immediate blood pressure monitoring, lab work, and possible delivery",
      severity: "critical",
    },
    {
      sign: "Decreased or Absent Fetal Movement",
      description: "Baby moving less than usual or no movement after trying to stimulate baby",
      action: "Call provider immediately and go to hospital",
      management: "Requires immediate fetal monitoring (NST). May indicate fetal distress requiring emergency delivery",
      severity: "critical",
    },
    {
      sign: "Fever Above 100.4°F (38°C)",
      description: "Elevated temperature during labor",
      action: "Notify healthcare provider immediately",
      management: "May indicate chorioamnionitis (uterine infection). Requires antibiotics, close monitoring, and possible expedited delivery",
      severity: "high",
    },
    {
      sign: "Umbilical Cord Prolapse",
      description: "Feeling the umbilical cord in vagina or seeing it protruding after water breaks",
      action: "Call 911, get on hands and knees with hips elevated",
      management: "Medical emergency requiring immediate cesarean section to prevent baby from compressing cord",
      severity: "critical",
    },
    {
      sign: "Severe Constant Abdominal Pain",
      description: "Intense, unrelenting pain that doesn't ease between contractions",
      action: "Call 911 or go to emergency room immediately",
      management: "May indicate uterine rupture or placental abruption. Requires emergency assessment and possible immediate delivery",
      severity: "critical",
    },
    {
      sign: "Sudden Severe Swelling of Face and Hands",
      description: "Rapid swelling of face, hands, or around eyes with headache",
      action: "Go to emergency room immediately",
      management: "May indicate severe preeclampsia. Requires immediate blood pressure monitoring, magnesium sulfate, and possible delivery",
      severity: "critical",
    },
    {
      sign: "Seizures or Convulsions",
      description: "Uncontrolled shaking, loss of consciousness, or seizure activity",
      action: "Call 911 immediately and protect mother from injury",
      management: "Indicates eclampsia. Medical emergency requiring immediate magnesium sulfate, stabilization, and delivery",
      severity: "critical",
    },
    {
      sign: "Severe Difficulty Breathing",
      description: "Sudden shortness of breath, inability to catch breath, or chest pain",
      action: "Call 911 immediately",
      management: "May indicate pulmonary embolism, amniotic fluid embolism, or heart problems. Life-threatening emergency",
      severity: "critical",
    },
    {
      sign: "Abnormal Fetal Heart Rate Pattern",
      description: "Healthcare provider detects concerning heart rate pattern on monitor",
      action: "Follow provider's immediate instructions",
      management: "May indicate fetal distress. Requires position changes, oxygen, IV fluids, possible emergency delivery",
      severity: "critical",
    },
    {
      sign: "Sudden Cessation of Labor",
      description: "Contractions suddenly stop completely in active labor with severe pain",
      action: "Call provider immediately and go to hospital",
      management: "May indicate uterine rupture. Requires immediate evaluation and possible emergency cesarean section",
      severity: "critical",
    },
  ],
  postpartum: [
    {
      sign: "Excessive Postpartum Bleeding",
      description: "Soaking more than one pad per hour or passing clots larger than a golf ball",
      action: "Call provider immediately or go to emergency room",
      management: "May indicate postpartum hemorrhage. Requires uterine massage, medications (oxytocin, misoprostol), possible surgery",
      severity: "critical",
    },
    {
      sign: "Fever Above 100.4°F (38°C)",
      description: "Temperature elevation after delivery, especially with chills",
      action: "Contact provider within 2-4 hours",
      management: "May indicate endometritis or other infection. Requires antibiotics, possible hospital admission",
      severity: "high",
    },
    {
      sign: "Severe Abdominal Pain",
      description: "Intense pain not relieved by pain medication or pain with fever",
      action: "Go to emergency room",
      management: "May indicate infection, retained placenta, or internal bleeding. Requires examination, imaging, possible surgery",
      severity: "critical",
    },
    {
      sign: "Foul-Smelling Vaginal Discharge",
      description: "Strong, unpleasant odor with or without fever",
      action: "Contact provider within 24 hours",
      management: "May indicate uterine infection. Requires antibiotics and close monitoring",
      severity: "high",
    },
    {
      sign: "Chest Pain or Difficulty Breathing",
      description: "Shortness of breath, chest pain, or rapid heartbeat",
      action: "Call 911 immediately",
      management: "May indicate pulmonary embolism or heart problems. Life-threatening emergency requiring immediate hospitalization",
      severity: "critical",
    },
    {
      sign: "Leg Pain, Swelling, or Red Streaking",
      description: "One leg significantly more swollen than other, painful, or warm to touch",
      action: "Contact provider same day or go to ER if severe",
      management: "May indicate deep vein thrombosis (blood clot). Requires ultrasound and anticoagulation therapy",
      severity: "high",
    },
    {
      sign: "Severe Headache with Vision Changes",
      description: "Persistent severe headache with visual disturbances",
      action: "Go to emergency room immediately",
      management: "May indicate postpartum preeclampsia. Requires blood pressure monitoring, lab work, and medication",
      severity: "critical",
    },
    {
      sign: "C-Section Incision Problems",
      description: "Incision is red, hot, swollen, draining pus, or separating",
      action: "Contact provider within 24 hours",
      management: "May indicate wound infection. Requires antibiotics, possible wound care or drainage",
      severity: "high",
    },
    {
      sign: "Inability to Urinate",
      description: "Unable to pass urine or extreme pain with urination",
      action: "Contact provider same day",
      management: "May indicate urinary retention or infection. May require catheterization and antibiotics",
      severity: "high",
    },
    {
      sign: "Thoughts of Harming Self or Baby",
      description: "Intrusive thoughts about hurting yourself or your baby",
      action: "Call 911, national crisis line (988), or go to ER immediately",
      management: "Mental health emergency. Requires immediate psychiatric evaluation, possible hospitalization, and medication",
      severity: "critical",
    },
    {
      sign: "Severe Perineal Pain or Swelling",
      description: "Extreme pain in perineal area with increasing swelling or hardness",
      action: "Contact provider within 24 hours or same day if severe",
      management: "May indicate hematoma (blood collection under skin). May require drainage or surgical intervention",
      severity: "high",
    },
    {
      sign: "Sudden Severe Swelling of Face/Hands",
      description: "Rapid swelling of face, hands, or legs after delivery with headache",
      action: "Go to emergency room immediately",
      management: "May indicate postpartum preeclampsia. Requires immediate monitoring, lab work, and blood pressure medication",
      severity: "critical",
    },
    {
      sign: "Seizures",
      description: "Any seizure activity or convulsions after delivery",
      action: "Call 911 immediately",
      management: "Indicates postpartum eclampsia. Medical emergency requiring immediate hospitalization and magnesium sulfate",
      severity: "critical",
    },
    {
      sign: "Breast Engorgement with Fever",
      description: "Rock-hard, extremely painful breasts with fever and red streaks",
      action: "Contact provider within 24 hours",
      management: "May indicate severe mastitis or breast abscess. Requires antibiotics, possible drainage, continued breastfeeding",
      severity: "high",
    },
    {
      sign: "Persistent Vomiting",
      description: "Unable to keep down food or liquids for 12+ hours",
      action: "Contact provider same day",
      management: "May indicate infection or other complications. Requires evaluation, possible IV fluids and anti-nausea medication",
      severity: "high",
    },
    {
      sign: "Severe Dizziness or Fainting",
      description: "Extreme lightheadedness, feeling faint, or loss of consciousness",
      action: "Go to emergency room or call 911 if unconscious",
      management: "May indicate hemorrhage, dehydration, or cardiovascular problems. Requires immediate assessment and treatment",
      severity: "critical",
    },
    {
      sign: "Painful or Burning Urination with Fever",
      description: "Severe pain when urinating accompanied by fever, back pain, or blood in urine",
      action: "Contact provider within 24 hours",
      management: "May indicate urinary tract or kidney infection. Requires antibiotics and close monitoring",
      severity: "high",
    },
    {
      sign: "Severe Postpartum Anxiety",
      description: "Overwhelming panic, inability to sleep even when baby sleeps, intrusive scary thoughts",
      action: "Contact provider within 48 hours or go to ER if severe",
      management: "May indicate postpartum anxiety disorder or postpartum OCD. Requires mental health evaluation and treatment",
      severity: "high",
    },
  ],
};

const complications = [
  {
    name: "Preeclampsia/Eclampsia",
    description: "High blood pressure condition that can develop during pregnancy or postpartum",
    signs: ["Blood pressure ≥140/90", "Severe headache", "Vision changes", "Upper abdominal pain", "Swelling of hands/face"],
    management: "Blood pressure monitoring, magnesium sulfate, delivery is the only cure (timing depends on severity)",
  },
  {
    name: "Placental Abruption",
    description: "Premature separation of placenta from uterine wall",
    signs: ["Sudden severe abdominal pain", "Heavy bleeding", "Back pain", "Rapid contractions", "Fetal distress"],
    management: "Emergency delivery (usually C-section), blood transfusion if needed, IV fluids, monitoring",
  },
  {
    name: "Uterine Rupture",
    description: "Tearing of the uterus, most common in women with prior C-section",
    signs: ["Sudden severe abdominal pain", "Abnormal fetal heart rate", "Cessation of contractions", "Vaginal bleeding", "Shock"],
    management: "Emergency C-section, blood transfusion, possible hysterectomy if severe",
  },
  {
    name: "Shoulder Dystocia",
    description: "Baby's shoulders get stuck behind mother's pubic bone during delivery",
    signs: ["Baby's head delivers but body doesn't", "Turtle sign (head retracts)", "Prolonged delivery after head is out"],
    management: "McRoberts maneuver (legs to chest), suprapubic pressure, episiotomy, other positional changes, possible C-section",
  },
  {
    name: "Postpartum Hemorrhage",
    description: "Excessive bleeding after delivery (>500ml vaginal, >1000ml C-section)",
    signs: ["Soaking >1 pad/hour", "Large clots", "Dizziness", "Rapid heartbeat", "Pale skin"],
    management: "Uterine massage, oxytocin/other medications, manual removal of clots, possible surgery (D&C, hysterectomy)",
  },
  {
    name: "Amniotic Fluid Embolism",
    description: "Rare but serious condition where amniotic fluid enters mother's bloodstream",
    signs: ["Sudden shortness of breath", "Rapid heartbeat", "Cyanosis (blue skin)", "Seizures", "Altered consciousness"],
    management: "Emergency resuscitation, oxygen support, ICU admission, blood transfusion, emergency delivery",
  },
];

const postpartumTimeline = [
  { 
    time: "First 24 hours", 
    tasks: ["Skin-to-skin contact", "First breastfeeding attempt", "Monitor bleeding (lochia rubra)", "Vital signs monitoring", "Bonding time", "Rest as much as possible"],
    medical: "Healthcare team monitors bleeding, blood pressure, and recovery. Catheter removed if present. Pain management initiated."
  },
  { 
    time: "1-7 days", 
    tasks: ["Heavy bleeding continues (lochia rubra)", "Uterus contracting (involution)", "Afterpains during breastfeeding", "Milk coming in (days 2-5)", "Perineal/incision care"],
    medical: "Watch for signs of infection. Normal to pass small clots. Uterus should shrink and firm up. May have night sweats as body loses fluid."
  },
  { 
    time: "1-2 weeks", 
    tasks: ["Lochia changes to pink/brown", "Engorgement peaks around day 3-5", "Establish feeding routine", "Limit visitors and activity", "Rest when baby rests"],
    medical: "Follow-up if any complications. C-section staples/stitches removed around 7-10 days. Baby blues peak around day 5, should improve."
  },
  { 
    time: "2-6 weeks", 
    tasks: ["Bleeding tapering off (lochia serosa to alba)", "Increased energy levels", "Pelvic floor exercises", "Watch for PPD signs", "Prepare for 6-week checkup"],
    medical: "Resume light activities gradually. No sex, tampons, or douching until cleared at 6-week visit. Watch for warning signs of complications."
  },
  { 
    time: "6-12 weeks", 
    tasks: ["Postpartum checkup", "Cleared for exercise and sex", "Discuss contraception", "Mental health screening", "Return to work planning"],
    medical: "Pelvic exam to ensure healing. Blood pressure check. Discuss birth control. Screen for postpartum depression. Referrals if needed."
  },
];

const breastfeedingGuidance = {
  positioning: [
    { name: "Cradle Hold", description: "Baby's head in crook of arm, body facing yours" },
    { name: "Cross-Cradle", description: "Support baby's head with opposite hand, better for newborns" },
    { name: "Football Hold", description: "Baby tucked under arm, good for C-section recovery" },
    { name: "Side-Lying", description: "Both lying on side facing each other, good for night feeds" },
  ],
  latchSigns: {
    good: ["Wide mouth", "Lips flanged out", "Chin touching breast", "More areola visible above lip", "No pain after initial latch"],
    poor: ["Clicking sounds", "Dimpled cheeks", "Nipple pain throughout feed", "Lipstick-shaped nipple after", "Baby frustrated"],
  },
  commonIssues: [
    {
      issue: "Engorgement",
      signs: "Breasts hard, painful, shiny, may have low fever",
      management: "Frequent feeding, hand expression before latch, cold compresses after feeding, ibuprofen for pain",
    },
    {
      issue: "Plugged Duct",
      signs: "Tender lump in breast, redness in one area, no fever",
      management: "Frequent nursing from affected side, massage while feeding, warm compress before feeding, dangle feed",
    },
    {
      issue: "Mastitis",
      signs: "Breast pain, redness, fever >100.4°F, flu-like symptoms",
      management: "Antibiotics (call provider), continue nursing, rest, fluids, ibuprofen, warm compress",
    },
  ],
};

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

function ChildbirthPage() {
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
              <p className="text-muted-foreground">Comprehensive guide to labor, delivery, danger signs, and postpartum recovery</p>
            </div>
          </div>
        </motion.div>

        <Alert className="mb-6 border-amber-500/50 bg-amber-50 dark:bg-amber-950/30">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900 dark:text-amber-100">Important Medical Information</AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            This guide is for educational purposes. Always contact your healthcare provider with concerns. In emergencies, call 911 or go to the nearest emergency room immediately.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="preparation" className="space-y-8">
          <motion.div variants={itemVariants}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
              <TabsTrigger value="preparation" className="py-3">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Preparation
              </TabsTrigger>
              <TabsTrigger value="labor" className="py-3">
                <Clock className="w-4 h-4 mr-2" />
                Labor Stages
              </TabsTrigger>
              <TabsTrigger value="danger-signs" className="py-3">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Danger Signs
              </TabsTrigger>
              <TabsTrigger value="complications" className="py-3">
                <Shield className="w-4 h-4 mr-2" />
                Complications
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

          <TabsContent value="preparation" className="space-y-6">
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
                              <li>• Hypnobirthing techniques</li>
                              <li>• Aromatherapy</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Pharmacological</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Epidural anesthesia (most common)</li>
                              <li>• Spinal block (for C-section)</li>
                              <li>• IV pain medications (opioids)</li>
                              <li>• Nitrous oxide (if available)</li>
                              <li>• Local anesthesia (for episiotomy/repair)</li>
                              <li>• Pudendal block (rare)</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after-birth">
                      <AccordionTrigger>Immediately After Birth</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Delayed cord clamping preference (1-3 minutes recommended)</li>
                          <li>• Skin-to-skin contact immediately after birth</li>
                          <li>• Cord blood banking decision</li>
                          <li>• Feeding preferences (breast/formula/both)</li>
                          <li>• Newborn procedures timing (vitamin K, eye ointment, hepatitis B vaccine)</li>
                          <li>• Circumcision decision (if applicable)</li>
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
                  <CardDescription>Pack at 36 weeks in case baby arrives early</CardDescription>
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
                        <li>☐ Birth plan copies (3-4)</li>
                        <li>☐ Comfortable robe/nightgown</li>
                        <li>☐ Toiletries & personal items</li>
                        <li>☐ Phone & charger (long cord)</li>
                        <li>☐ Going-home outfit (maternity size)</li>
                        <li>☐ Nursing bras (2-3)</li>
                        <li>☐ Slippers with grip/socks</li>
                        <li>☐ Extra underwear (disposable)</li>
                        <li>☐ Glasses (if you wear contacts)</li>
                        <li>☐ Snacks & drinks</li>
                        <li>☐ Entertainment (books, tablet)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Baby className="w-4 h-4 text-primary" />
                        For Baby
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>☐ Going-home outfit (newborn & 0-3 month)</li>
                        <li>☐ Swaddle blankets (2-3)</li>
                        <li>☐ Car seat (installed & inspected!)</li>
                        <li>☐ Hat & mittens</li>
                        <li>☐ Socks/booties</li>
                        <li>☐ Diapers (hospital provides, bring backup)</li>
                        <li>☐ Pacifier (if planning to use)</li>
                        <li>☐ Receiving blanket</li>
                        <li>☐ Burp cloths</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-primary" />
                        For Partner
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>☐ Snacks & drinks (lots!)</li>
                        <li>☐ Change of clothes (2 days)</li>
                        <li>☐ Phone & charger</li>
                        <li>☐ Toiletries</li>
                        <li>☐ Pillow/blanket</li>
                        <li>☐ Entertainment</li>
                        <li>☐ Camera</li>
                        <li>☐ Insurance/medical forms</li>
                        <li>☐ Cash for parking/cafeteria</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="labor" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Stages of Labor - Detailed Guide
                  </CardTitle>
                  <CardDescription>
                    Understanding what to expect during each stage and what you should do
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
                              
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold mb-2">What to Do:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                  {stage.whatToDo.map((action, actionIndex) => (
                                    <li key={actionIndex} className="flex items-start gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                      {action}
                                    </li>
                                  ))}
                                </ul>
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
                      <h4 className="font-semibold mb-3">5-1-1 Rule (First Pregnancy)</h4>
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
                          <span>minute long each</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</div>
                          <span>hour of this pattern</span>
                        </li>
                      </ul>
                      <p className="text-xs text-muted-foreground mt-4">
                        *If subsequent pregnancy, use 4-1-1 rule (contractions may progress faster)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-destructive">Go Immediately If:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Water breaks (especially if not clear or has greenish tint)
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplets className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Significant vaginal bleeding (more than spotting)
                        </li>
                        <li className="flex items-start gap-2">
                          <Activity className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Decreased or absent fetal movement
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Severe headache with vision changes (blurred, spots, flashing lights)
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Severe abdominal pain between contractions
                        </li>
                        <li className="flex items-start gap-2">
                          <Thermometer className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Fever above 100.4°F (38°C)
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Feeling something in vagina (possible cord prolapse)
                        </li>
                        <li className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                          Signs of preterm labor (before 37 weeks)
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
                  <CardTitle className="flex items-center gap-2">
                    <Baby className="w-5 h-5 text-primary" />
                    Breastfeeding Guidance
                  </CardTitle>
                  <CardDescription>Essential information for successful breastfeeding</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="positioning">
                      <AccordionTrigger>Breastfeeding Positions</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {breastfeedingGuidance.positioning.map((position, idx) => (
                            <div key={idx} className="border-l-2 border-primary pl-4">
                              <h4 className="font-semibold">{position.name}</h4>
                              <p className="text-sm text-muted-foreground">{position.description}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="latch">
                      <AccordionTrigger>Signs of Good vs. Poor Latch</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-emerald-600 mb-2">Good Latch ✓</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {breastfeedingGuidance.latchSigns.good.map((sign, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                  {sign}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-destructive mb-2">Poor Latch ✗</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {breastfeedingGuidance.latchSigns.poor.map((sign, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                                  {sign}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="issues">
                      <AccordionTrigger>Common Breastfeeding Issues</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {breastfeedingGuidance.commonIssues.map((item, idx) => (
                            <Card key={idx}>
                              <CardContent className="p-4">
                                <h4 className="font-semibold mb-2">{item.issue}</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  <span className="font-medium">Signs:</span> {item.signs}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium">Management:</span> {item.management}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="danger-signs" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Alert className="border-destructive bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <AlertTitle className="text-destructive">Critical: Know These Warning Signs</AlertTitle>
                <AlertDescription>
                  These danger signs require immediate medical attention. Do not wait. Call 911 or go to the emergency room if you experience any critical signs.
                </AlertDescription>
              </Alert>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Labor & Delivery Danger Signs
                  </CardTitle>
                  <CardDescription>
                    Warning signs during labor that require immediate medical attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dangerSigns.labor.map((sign, index) => (
                    <Card 
                      key={index} 
                      className={`${
                        sign.severity === 'critical' 
                          ? 'border-destructive bg-destructive/5' 
                          : 'border-amber-500 bg-amber-50 dark:bg-amber-950/30'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="shrink-0">
                            {sign.severity === 'critical' ? (
                              <AlertTriangle className="w-6 h-6 text-destructive" />
                            ) : (
                              <AlertCircle className="w-6 h-6 text-amber-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-lg">{sign.sign}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                sign.severity === 'critical' 
                                  ? 'bg-destructive text-destructive-foreground' 
                                  : 'bg-amber-500 text-white'
                              }`}>
                                {sign.severity === 'critical' ? 'CRITICAL' : 'HIGH RISK'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{sign.description}</p>
                            <div className="bg-card border border-border rounded-lg p-3 mb-3">
                              <p className="text-sm font-semibold text-destructive mb-1">
                                <Phone className="w-4 h-4 inline mr-1" />
                                Immediate Action:
                              </p>
                              <p className="text-sm">{sign.action}</p>
                            </div>
                            <div className="bg-muted rounded-lg p-3">
                              <p className="text-sm font-semibold mb-1">Medical Management:</p>
                              <p className="text-sm text-muted-foreground">{sign.management}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Postpartum Danger Signs
                  </CardTitle>
                  <CardDescription>
                    Warning signs after delivery (up to 6 weeks postpartum and beyond)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dangerSigns.postpartum.map((sign, index) => (
                    <Card 
                      key={index} 
                      className={`${
                        sign.severity === 'critical' 
                          ? 'border-destructive bg-destructive/5' 
                          : 'border-amber-500 bg-amber-50 dark:bg-amber-950/30'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="shrink-0">
                            {sign.severity === 'critical' ? (
                              <AlertTriangle className="w-6 h-6 text-destructive" />
                            ) : (
                              <AlertCircle className="w-6 h-6 text-amber-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-lg">{sign.sign}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                sign.severity === 'critical' 
                                  ? 'bg-destructive text-destructive-foreground' 
                                  : 'bg-amber-500 text-white'
                              }`}>
                                {sign.severity === 'critical' ? 'CRITICAL' : 'HIGH RISK'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{sign.description}</p>
                            <div className="bg-card border border-border rounded-lg p-3 mb-3">
                              <p className="text-sm font-semibold text-destructive mb-1">
                                <Phone className="w-4 h-4 inline mr-1" />
                                Immediate Action:
                              </p>
                              <p className="text-sm">{sign.action}</p>
                            </div>
                            <div className="bg-muted rounded-lg p-3">
                              <p className="text-sm font-semibold mb-1">Medical Management:</p>
                              <p className="text-sm text-muted-foreground">{sign.management}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/30">
                <Phone className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900 dark:text-blue-100">Emergency Contact Numbers</AlertTitle>
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <div className="space-y-1 mt-2">
                    <p>• <strong>Emergency Services:</strong> 911</p>
                    <p>• <strong>National Suicide & Crisis Lifeline:</strong> 988</p>
                    <p>• <strong>Postpartum Support International:</strong> 1-800-944-4773</p>
                    <p>• <strong>Your Healthcare Provider:</strong> [Add your provider&apos;s emergency number]</p>
                    <p>• <strong>Hospital L&D Unit:</strong> [Add your hospital&apos;s direct number]</p>
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          </TabsContent>

          <TabsContent value="complications" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-600" />
                    Major Labor & Delivery Complications
                  </CardTitle>
                  <CardDescription>
                    Understanding serious complications, their signs, and how they&apos;re managed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complications.map((complication, index) => (
                    <Card key={index} className="border-amber-500/50">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-sm font-bold text-amber-700">
                            {index + 1}
                          </span>
                          {complication.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{complication.description}</p>
                        
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-3">
                          <p className="text-sm font-semibold text-destructive mb-2">Warning Signs:</p>
                          <ul className="space-y-1">
                            {complication.signs.map((sign, signIndex) => (
                              <li key={signIndex} className="text-sm flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                                {sign}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                            <Stethoscope className="w-4 h-4" />
                            Medical Management:
                          </p>
                          <p className="text-sm text-muted-foreground">{complication.management}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Remember</AlertTitle>
                <AlertDescription>
                  Most births proceed without complications. Your healthcare team is trained to recognize and manage these conditions. Trust them, ask questions, and advocate for yourself if something doesn&apos;t feel right.
                </AlertDescription>
              </Alert>
            </motion.div>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-600" />
                    Postpartum Recovery Timeline
                  </CardTitle>
                  <CardDescription>
                    What to expect during the fourth trimester and beyond
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {postpartumTimeline.map((period, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <Card className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="w-28 shrink-0">
                                <span className="text-sm font-semibold text-primary">{period.time}</span>
                              </div>
                              <div className="flex-1">
                                <div className="mb-3">
                                  <h4 className="text-sm font-semibold mb-2">What&apos;s Happening:</h4>
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
                                <div className="bg-primary/5 rounded-lg p-3">
                                  <p className="text-sm text-muted-foreground">
                                    <span className="font-semibold">Medical Note:</span> {period.medical}
                                  </p>
                                </div>
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
                    Physical Recovery by Delivery Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">Vaginal Delivery</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold mb-1">Immediate Care (Days 1-3):</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Ice packs to perineum (first 24 hours)</li>
                            <li>• Peri bottle for hygiene after bathroom</li>
                            <li>• Witch hazel pads for hemorrhoids</li>
                            <li>• Stool softeners (take regularly!)</li>
                            <li>• Pain medication as prescribed</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1">Week 1-2:</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Warm sitz baths 2-3 times daily</li>
                            <li>• Stitches dissolve on their own</li>
                            <li>• Avoid stairs as much as possible</li>
                            <li>• No lifting anything heavier than baby</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1">Week 2-6:</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Gradually increase activity</li>
                            <li>• Start gentle pelvic floor exercises</li>
                            <li>• No sex, tampons, or douching</li>
                            <li>• Watch for signs of infection</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-lg">C-Section Recovery</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold mb-1">Immediate Care (Days 1-3):</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Keep incision clean and dry</li>
                            <li>• Support abdomen when coughing/laughing</li>
                            <li>• Get up and walk (reduces blood clots)</li>
                            <li>• Pain medication - stay ahead of pain</li>
                            <li>• Use pillow over incision when nursing</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1">Week 1-2:</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• NO lifting (not even older children)</li>
                            <li>• No driving until cleared by doctor</li>
                            <li>• Staples/stitches removed around day 7-10</li>
                            <li>• Shower okay, no baths yet</li>
                            <li>• Accept all help offered</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-1">Week 2-6:</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Still no heavy lifting</li>
                            <li>• No exercise beyond walking</li>
                            <li>• Incision may itch (normal healing)</li>
                            <li>• Numbness around incision is normal</li>
                            <li>• No sex until cleared at 6-week visit</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Lochia (Postpartum Bleeding)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Lochia Rubra</h4>
                          <p className="text-xs text-muted-foreground mb-2">Days 1-3</p>
                          <p className="text-sm mb-2">Bright red, heavy flow similar to heavy period</p>
                          <p className="text-xs text-muted-foreground">May have small clots. Change pad every 2-3 hours.</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Lochia Serosa</h4>
                          <p className="text-xs text-muted-foreground mb-2">Days 4-10</p>
                          <p className="text-sm mb-2">Pinkish-brown, lighter flow</p>
                          <p className="text-xs text-muted-foreground">Watery consistency. Less frequent pad changes.</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Lochia Alba</h4>
                          <p className="text-xs text-muted-foreground mb-2">Days 10-28+</p>
                          <p className="text-sm mb-2">Yellowish-white, minimal flow</p>
                          <p className="text-xs text-muted-foreground">Creamy discharge. May continue up to 6 weeks.</p>
                        </CardContent>
                      </Card>
                    </div>
                    <Alert className="border-amber-500/50">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-900 dark:text-amber-100">
                        <strong>Call your provider if:</strong> Bleeding increases after decreasing, large clots (bigger than golf ball), foul odor, soaking more than 1 pad/hour, or bleeding returns after stopping.
                      </AlertDescription>
                    </Alert>
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
                    Postpartum Mental Health Spectrum
                  </CardTitle>
                  <CardDescription>
                    Understanding the range of postpartum mood disorders. You are not alone, and help is available.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Baby Blues</h4>
                        <p className="text-xs text-muted-foreground mb-2">Affects 50-80% of new mothers</p>
                        <p className="text-xs font-semibold mb-2">Symptoms:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground mb-3">
                          <li>• Mood swings</li>
                          <li>• Crying spells</li>
                          <li>• Anxiety</li>
                          <li>• Difficulty sleeping</li>
                          <li>• Irritability</li>
                          <li>• Feeling overwhelmed</li>
                        </ul>
                        <p className="text-xs font-semibold">Timeline:</p>
                        <p className="text-xs text-muted-foreground">Peaks around day 5, resolves within 2 weeks</p>
                        <p className="text-xs font-semibold mt-2">Treatment:</p>
                        <p className="text-xs text-muted-foreground">Rest, support, self-care. No medication needed.</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Postpartum Depression (PPD)</h4>
                        <p className="text-xs text-muted-foreground mb-2">Affects 10-15% of mothers</p>
                        <p className="text-xs font-semibold mb-2">Symptoms:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground mb-3">
                          <li>• Persistent sadness</li>
                          <li>• Loss of interest in activities</li>
                          <li>• Difficulty bonding with baby</li>
                          <li>• Appetite changes</li>
                          <li>• Excessive guilt or worthlessness</li>
                          <li>• Thoughts of self-harm</li>
                        </ul>
                        <p className="text-xs font-semibold">Timeline:</p>
                        <p className="text-xs text-muted-foreground">Can start anytime in first year, often within 1-3 weeks</p>
                        <p className="text-xs font-semibold mt-2">Treatment:</p>
                        <p className="text-xs text-muted-foreground">Therapy, medication, support groups. Highly treatable.</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Postpartum Psychosis</h4>
                        <p className="text-xs text-muted-foreground mb-2">Rare - 1-2 per 1,000 births</p>
                        <p className="text-xs font-semibold mb-2">Symptoms:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground mb-3">
                          <li>• Confusion, disorientation</li>
                          <li>• Hallucinations</li>
                          <li>• Delusions</li>
                          <li>• Paranoia</li>
                          <li>• Rapid mood swings</li>
                          <li>• Bizarre behavior</li>
                        </ul>
                        <p className="text-xs font-semibold">Timeline:</p>
                        <p className="text-xs text-muted-foreground">Sudden onset within first 2 weeks (often within 48-72 hours)</p>
                        <p className="text-xs font-semibold mt-2">Treatment:</p>
                        <p className="text-xs text-destructive">MEDICAL EMERGENCY - hospitalization required immediately</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-violet-500/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Postpartum Anxiety & OCD</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Postpartum Anxiety</h4>
                          <p className="text-sm text-muted-foreground mb-2">Affects 10-15% of new mothers</p>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Constant worry about baby&apos;s safety</li>
                            <li>• Racing thoughts</li>
                            <li>• Physical symptoms (rapid heartbeat, nausea)</li>
                            <li>• Difficulty relaxing or sleeping</li>
                            <li>• Panic attacks</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Postpartum OCD</h4>
                          <p className="text-sm text-muted-foreground mb-2">Affects 3-5% of new mothers</p>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Intrusive, disturbing thoughts about baby</li>
                            <li>• Fear of being alone with baby</li>
                            <li>• Repetitive behaviors (checking, cleaning)</li>
                            <li>• Hypervigilance</li>
                            <li>• Avoiding baby out of fear</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-primary" />
                    Self-Care & Support Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Daily Self-Care</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Sleep when baby sleeps - prioritize rest over chores
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Accept help from others - let them bring meals, do laundry
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Stay connected - text, video call, or meet with loved ones
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Get fresh air daily - even 10 minutes outside helps
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Eat nutritious meals - keep easy snacks accessible
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Shower daily - basic hygiene boosts mood
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          Lower expectations - survival mode is okay
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-destructive">When to Seek Professional Help</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Symptoms last longer than 2 weeks
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Symptoms are getting worse, not better
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Unable to care for yourself or baby
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Thoughts of harming yourself or baby
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Severe anxiety or panic attacks
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Hearing or seeing things others don&apos;t
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Feeling disconnected from reality
                        </li>
                        <li className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                          Partner/family expresses concern
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-emerald-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    Support Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold">National Suicide & Crisis Lifeline</p>
                        <p className="text-muted-foreground">Call or text: <strong>988</strong></p>
                        <p className="text-xs text-muted-foreground">24/7 confidential support</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold">Postpartum Support International (PSI)</p>
                        <p className="text-muted-foreground">Call: <strong>1-800-944-4773</strong> (4PPD)</p>
                        <p className="text-muted-foreground">Text: <strong>800-944-4773</strong> (English) or <strong>971-203-7773</strong> (Spanish)</p>
                        <p className="text-xs text-muted-foreground">Mon-Fri 8am-11pm ET</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Heart className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold">Online Support</p>
                        <p className="text-muted-foreground">PSI Online Support Groups: <strong>postpartum.net</strong></p>
                        <p className="text-xs text-muted-foreground">Free weekly online support meetings</p>
                      </div>
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
export default function ChildbirthPageWrapper() {
  return (
    <ProtectedRoute>
      <ChildbirthPage />
    </ProtectedRoute>
  );
}
