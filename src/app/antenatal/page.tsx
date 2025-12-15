"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  Bell,
  FileSearch,
  Lightbulb,
  User,
  Save,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

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

const comprehensiveLabTests = [
  {
    category: "Complete Blood Count (CBC)",
    timing: "First visit, 28 weeks, 36 weeks",
    tests: [
      { name: "Hemoglobin", normalRange: "11.0-14.0 g/dL", unit: "g/dL", low: "<11.0", high: ">16.0", 
        lowMeaning: "Anemia - supplement with iron 60-120mg daily, vitamin C, dietary changes",
        highMeaning: "Hemoconcentration - check hydration, possible preeclampsia" },
      { name: "Hematocrit", normalRange: "33-44%", unit: "%", low: "<33", high: ">44",
        lowMeaning: "Anemia - same as hemoglobin management",
        highMeaning: "Dehydration or polycythemia - increase fluid intake" },
      { name: "White Blood Cells", normalRange: "6,000-17,000/μL", unit: "/μL", low: "<6000", high: ">17000",
        lowMeaning: "Leukopenia - check for infection, immune compromise",
        highMeaning: "Infection or stress response - investigate source" },
      { name: "Platelets", normalRange: "150,000-400,000/μL", unit: "/μL", low: "<150000", high: ">400000",
        lowMeaning: "Thrombocytopenia - monitor, check for preeclampsia/HELLP",
        highMeaning: "Thrombocytosis - evaluate for inflammation" },
    ]
  },
  {
    category: "Blood Chemistry",
    timing: "First visit, as needed",
    tests: [
      { name: "Blood Glucose (Fasting)", normalRange: "70-95 mg/dL", unit: "mg/dL", low: "<70", high: ">95",
        lowMeaning: "Hypoglycemia - frequent small meals, complex carbs",
        highMeaning: "Possible gestational diabetes - perform OGTT" },
      { name: "Glucose Challenge Test (1-hour)", normalRange: "<140 mg/dL", unit: "mg/dL", high: "≥140",
        highMeaning: "Proceed to 3-hour OGTT, dietary counseling" },
      { name: "Blood Urea Nitrogen (BUN)", normalRange: "7-12 mg/dL", unit: "mg/dL", low: "<7", high: ">12",
        lowMeaning: "Normal in pregnancy (hemodilution)",
        highMeaning: "Dehydration, kidney dysfunction - check creatinine" },
      { name: "Creatinine", normalRange: "0.4-0.9 mg/dL", unit: "mg/dL", high: ">0.9",
        highMeaning: "Kidney dysfunction - calculate GFR, monitor closely" },
      { name: "ALT (Liver)", normalRange: "7-41 U/L", unit: "U/L", high: ">41",
        highMeaning: "Liver dysfunction - check for HELLP, preeclampsia, viral hepatitis" },
      { name: "AST (Liver)", normalRange: "12-38 U/L", unit: "U/L", high: ">38",
        highMeaning: "Same as ALT - hepatic evaluation needed" },
    ]
  },
  {
    category: "Thyroid Function",
    timing: "First visit (if indicated)",
    tests: [
      { name: "TSH", normalRange: "0.1-2.5 mIU/L (1st tri), 0.2-3.0 (2nd tri), 0.3-3.0 (3rd tri)", unit: "mIU/L", 
        low: "<0.1", high: ">3.0",
        lowMeaning: "Hyperthyroidism - endocrine referral, may need antithyroid drugs",
        highMeaning: "Hypothyroidism - levothyroxine supplementation" },
      { name: "Free T4", normalRange: "0.8-1.5 ng/dL", unit: "ng/dL", low: "<0.8", high: ">1.5",
        lowMeaning: "Hypothyroidism with low TSH indicates secondary cause",
        highMeaning: "Hyperthyroidism - correlate with TSH" },
    ]
  },
  {
    category: "Urinalysis",
    timing: "Every visit",
    tests: [
      { name: "Protein", normalRange: "Negative or trace", unit: "mg/dL", high: "≥1+",
        highMeaning: "Possible preeclampsia (if BP elevated), UTI, or kidney disease - 24hr urine collection" },
      { name: "Glucose", normalRange: "Negative", high: "Positive",
        highMeaning: "Glycosuria - perform glucose challenge test, check for GDM" },
      { name: "Ketones", normalRange: "Negative", high: "Positive",
        highMeaning: "Starvation ketosis or diabetic ketoacidosis - increase caloric intake, check glucose" },
      { name: "Bacteria/Nitrites", normalRange: "Negative", high: "Positive",
        highMeaning: "UTI - urine culture, antibiotics (cephalexin, amoxicillin)" },
      { name: "Leukocyte Esterase", normalRange: "Negative", high: "Positive",
        highMeaning: "WBCs in urine - UTI likely, perform culture" },
    ]
  },
  {
    category: "Infectious Disease Screening",
    timing: "First visit",
    tests: [
      { name: "HIV", normalRange: "Negative", high: "Positive",
        highMeaning: "Start antiretroviral therapy immediately, plan C-section if viral load >1000" },
      { name: "Hepatitis B Surface Antigen", normalRange: "Negative", high: "Positive",
        highMeaning: "Baby needs HBIG + vaccine at birth, check viral load" },
      { name: "Syphilis (RPR/VDRL)", normalRange: "Non-reactive", high: "Reactive",
        highMeaning: "Confirm with FTA-ABS, treat with penicillin based on stage" },
      { name: "Rubella IgG", normalRange: "Immune (≥10 IU/mL)", low: "<10",
        lowMeaning: "Susceptible - avoid exposure, vaccinate postpartum" },
    ]
  },
  {
    category: "Blood Type & Antibodies",
    timing: "First visit, 28 weeks",
    tests: [
      { name: "ABO Blood Type", normalRange: "A, B, AB, or O", 
        highMeaning: "Document for transfusion purposes" },
      { name: "Rh Factor", normalRange: "Positive or Negative", high: "Negative",
        highMeaning: "Give RhoGAM at 28 weeks and within 72hr postpartum if baby Rh+" },
      { name: "Antibody Screen", normalRange: "Negative", high: "Positive",
        highMeaning: "Identify specific antibody, monitor titers, possible fetal anemia" },
    ]
  },
  {
    category: "Genetic Screening",
    timing: "10-14 weeks, 16-20 weeks",
    tests: [
      { name: "NIPT (Cell-free DNA)", normalRange: "Low risk", high: "High risk",
        highMeaning: "Diagnostic testing (amniocentesis/CVS), genetic counseling" },
      { name: "NT (Nuchal Translucency)", normalRange: "<3.0 mm", unit: "mm", high: "≥3.0",
        highMeaning: "Increased risk chromosomal abnormality - offer diagnostic testing" },
      { name: "AFP (Alpha-fetoprotein)", normalRange: "0.5-2.5 MoM", unit: "MoM", low: "<0.5", high: ">2.5",
        lowMeaning: "Increased Down syndrome risk - further testing",
        highMeaning: "Neural tube defect or abdominal wall defect - detailed ultrasound" },
    ]
  },
  {
    category: "Group B Streptococcus",
    timing: "35-37 weeks",
    tests: [
      { name: "GBS Culture", normalRange: "Negative", high: "Positive",
        highMeaning: "Intrapartum antibiotic prophylaxis (penicillin G or ampicillin)" },
    ]
  },
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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [missedVisit, setMissedVisit] = useState(false);
  const [lastVisitDate, setLastVisitDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingLab, setSavingLab] = useState(false);

  const [maternalInfo, setMaternalInfo] = useState({
    full_name: "",
    date_of_birth: "",
    blood_type: "",
    height_cm: "",
    weight_kg: "",
    lmp_date: "",
    edd_date: "",
    gravida: "",
    para: "",
    living_children: "",
    previous_complications: "",
    allergies: "",
    current_medications: "",
    medical_history: "",
    partner_name: "",
    emergency_contact: "",
    emergency_phone: "",
  });

  const [labResult, setLabResult] = useState({
    test_name: "",
    test_date: "",
    result_value: "",
    result_numeric: "",
    unit: "",
    notes: "",
  });

  const [labResults, setLabResults] = useState<any[]>([]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      const { data: visitData } = await supabase
        .from("clinic_visits")
        .select("visit_date")
        .eq("user_id", user.id)
        .eq("visit_type", "antenatal")
        .order("visit_date", { ascending: false })
        .limit(1)
        .single();

      if (visitData) {
        const lastVisit = new Date(visitData.visit_date);
        const today = new Date();
        const daysSinceVisit = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysSinceVisit > 28) {
          setMissedVisit(true);
          setLastVisitDate(lastVisit.toLocaleDateString());
        }
      }

      const { data: infoData } = await supabase
        .from("maternal_info")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (infoData) {
        setMaternalInfo({
          full_name: infoData.full_name || "",
          date_of_birth: infoData.date_of_birth || "",
          blood_type: infoData.blood_type || "",
          height_cm: infoData.height_cm || "",
          weight_kg: infoData.weight_kg || "",
          lmp_date: infoData.lmp_date || "",
          edd_date: infoData.edd_date || "",
          gravida: infoData.gravida || "",
          para: infoData.para || "",
          living_children: infoData.living_children || "",
          previous_complications: infoData.previous_complications || "",
          allergies: infoData.allergies || "",
          current_medications: infoData.current_medications || "",
          medical_history: infoData.medical_history || "",
          partner_name: infoData.partner_name || "",
          emergency_contact: infoData.emergency_contact || "",
          emergency_phone: infoData.emergency_phone || "",
        });
      }

      const { data: labData } = await supabase
        .from("lab_results")
        .select("*")
        .eq("user_id", user.id)
        .order("test_date", { ascending: false });

      if (labData) {
        setLabResults(labData);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [user, authLoading, router]);

  const saveMaternalInfo = async () => {
    if (!user) return;
    setSavingInfo(true);

    const bmi = maternalInfo.height_cm && maternalInfo.weight_kg
      ? (parseFloat(maternalInfo.weight_kg) / Math.pow(parseFloat(maternalInfo.height_cm) / 100, 2)).toFixed(2)
      : null;

    const { error } = await supabase
      .from("maternal_info")
      .upsert({
        user_id: user.id,
        ...maternalInfo,
        bmi,
        updated_at: new Date().toISOString(),
      });

    setSavingInfo(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save maternal information",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Maternal information saved successfully",
      });
    }
  };

  const saveLabResult = async () => {
    if (!user || !labResult.test_name || !labResult.test_date) return;
    setSavingLab(true);

    const { error } = await supabase
      .from("lab_results")
      .insert({
        user_id: user.id,
        ...labResult,
        result_numeric: labResult.result_numeric ? parseFloat(labResult.result_numeric) : null,
      });

    setSavingLab(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save lab result",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Lab result saved successfully",
      });
      
      setLabResult({
        test_name: "",
        test_date: "",
        result_value: "",
        result_numeric: "",
        unit: "",
        notes: "",
      });

      const { data: labData } = await supabase
        .from("lab_results")
        .select("*")
        .eq("user_id", user.id)
        .order("test_date", { ascending: false });

      if (labData) {
        setLabResults(labData);
      }
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6 lg:px-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
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

        {missedVisit && (
          <motion.div variants={itemVariants} className="mb-6">
            <Alert className="border-amber-500/50 bg-amber-500/10">
              <Bell className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-600">Clinic Visit Reminder</AlertTitle>
              <AlertDescription className="text-amber-700">
                It&apos;s been over 4 weeks since your last clinic visit on {lastVisitDate}. 
                Please schedule your next prenatal appointment to ensure optimal care for you and your baby.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <Tabs defaultValue="profile" className="space-y-8">
          <motion.div variants={itemVariants}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
              <TabsTrigger value="profile" className="py-3">
                <User className="w-4 h-4 mr-2" />
                My Profile
              </TabsTrigger>
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
                Lab Tests
              </TabsTrigger>
              <TabsTrigger value="myresults" className="py-3">
                <TrendingUp className="w-4 h-4 mr-2" />
                My Results
              </TabsTrigger>
              <TabsTrigger value="risks" className="py-3">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Warnings
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="profile" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Maternal Information
                  </CardTitle>
                  <CardDescription>
                    Keep your personal and medical information up to date for better care
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={maternalInfo.full_name}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, full_name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={maternalInfo.date_of_birth}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, date_of_birth: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blood_type">Blood Type</Label>
                      <Input
                        id="blood_type"
                        value={maternalInfo.blood_type}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, blood_type: e.target.value })}
                        placeholder="e.g., O+, A-, AB+"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height_cm">Height (cm)</Label>
                      <Input
                        id="height_cm"
                        type="number"
                        value={maternalInfo.height_cm}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, height_cm: e.target.value })}
                        placeholder="e.g., 165"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight_kg">Pre-pregnancy Weight (kg)</Label>
                      <Input
                        id="weight_kg"
                        type="number"
                        value={maternalInfo.weight_kg}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, weight_kg: e.target.value })}
                        placeholder="e.g., 60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lmp_date">Last Menstrual Period (LMP)</Label>
                      <Input
                        id="lmp_date"
                        type="date"
                        value={maternalInfo.lmp_date}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, lmp_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edd_date">Expected Due Date (EDD)</Label>
                      <Input
                        id="edd_date"
                        type="date"
                        value={maternalInfo.edd_date}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, edd_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gravida">Gravida (Total Pregnancies)</Label>
                      <Input
                        id="gravida"
                        type="number"
                        value={maternalInfo.gravida}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, gravida: e.target.value })}
                        placeholder="e.g., 2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="para">Para (Births after 20 weeks)</Label>
                      <Input
                        id="para"
                        type="number"
                        value={maternalInfo.para}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, para: e.target.value })}
                        placeholder="e.g., 1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="living_children">Living Children</Label>
                      <Input
                        id="living_children"
                        type="number"
                        value={maternalInfo.living_children}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, living_children: e.target.value })}
                        placeholder="e.g., 1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner_name">Partner Name</Label>
                      <Input
                        id="partner_name"
                        value={maternalInfo.partner_name}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, partner_name: e.target.value })}
                        placeholder="Partner's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency_contact">Emergency Contact</Label>
                      <Input
                        id="emergency_contact"
                        value={maternalInfo.emergency_contact}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, emergency_contact: e.target.value })}
                        placeholder="Emergency contact name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency_phone">Emergency Phone</Label>
                      <Input
                        id="emergency_phone"
                        value={maternalInfo.emergency_phone}
                        onChange={(e) => setMaternalInfo({ ...maternalInfo, emergency_phone: e.target.value })}
                        placeholder="Emergency contact phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previous_complications">Previous Pregnancy Complications</Label>
                    <Textarea
                      id="previous_complications"
                      value={maternalInfo.previous_complications}
                      onChange={(e) => setMaternalInfo({ ...maternalInfo, previous_complications: e.target.value })}
                      placeholder="Describe any complications from previous pregnancies"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={maternalInfo.allergies}
                      onChange={(e) => setMaternalInfo({ ...maternalInfo, allergies: e.target.value })}
                      placeholder="List any known allergies (medications, food, environmental)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current_medications">Current Medications</Label>
                    <Textarea
                      id="current_medications"
                      value={maternalInfo.current_medications}
                      onChange={(e) => setMaternalInfo({ ...maternalInfo, current_medications: e.target.value })}
                      placeholder="List all current medications and supplements"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medical_history">Medical History</Label>
                    <Textarea
                      id="medical_history"
                      value={maternalInfo.medical_history}
                      onChange={(e) => setMaternalInfo({ ...maternalInfo, medical_history: e.target.value })}
                      placeholder="Chronic conditions, surgeries, family history of genetic conditions"
                      rows={4}
                    />
                  </div>

                  <Button onClick={saveMaternalInfo} disabled={savingInfo} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {savingInfo ? "Saving..." : "Save Maternal Information"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

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
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
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

          <TabsContent value="labs" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-violet-600" />
                    Comprehensive Lab Tests & Reference Ranges
                  </CardTitle>
                  <CardDescription>
                    Complete prenatal lab panel with normal ranges and interpretations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {comprehensiveLabTests.map((category, catIndex) => (
                      <AccordionItem key={catIndex} value={`category-${catIndex}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-2">
                            <TestTube className="w-4 h-4 text-violet-600" />
                            <div>
                              <span className="font-semibold">{category.category}</span>
                              <p className="text-xs text-muted-foreground">{category.timing}</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3">
                            {category.tests.map((test, testIndex) => (
                              <Card key={testIndex} className="bg-muted/30">
                                <CardContent className="p-4 space-y-2">
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-sm">{test.name}</h4>
                                    {test.unit && <span className="text-xs text-muted-foreground">{test.unit}</span>}
                                  </div>
                                  
                                  <div className="p-2 bg-emerald-500/10 rounded">
                                    <p className="text-xs font-medium text-emerald-700">Normal Range</p>
                                    <p className="text-sm text-emerald-900">{test.normalRange}</p>
                                  </div>
                                  
                                  {test.low && test.lowMeaning && (
                                    <div className="p-2 bg-blue-500/10 rounded">
                                      <p className="text-xs font-medium text-blue-700">Low (&lt;{test.low})</p>
                                      <p className="text-xs text-muted-foreground">{test.lowMeaning}</p>
                                    </div>
                                  )}
                                  
                                  {test.high && test.highMeaning && (
                                    <div className="p-2 bg-amber-500/10 rounded">
                                      <p className="text-xs font-medium text-amber-700">High ({test.high ? `>${test.high}` : 'Positive'})</p>
                                      <p className="text-xs text-muted-foreground">{test.highMeaning}</p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="myresults" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    Add Lab Result
                  </CardTitle>
                  <CardDescription>
                    Record your lab test results for tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="test_name">Test Name</Label>
                      <Input
                        id="test_name"
                        value={labResult.test_name}
                        onChange={(e) => setLabResult({ ...labResult, test_name: e.target.value })}
                        placeholder="e.g., Hemoglobin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="test_date">Test Date</Label>
                      <Input
                        id="test_date"
                        type="date"
                        value={labResult.test_date}
                        onChange={(e) => setLabResult({ ...labResult, test_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="result_value">Result (Text)</Label>
                      <Input
                        id="result_value"
                        value={labResult.result_value}
                        onChange={(e) => setLabResult({ ...labResult, result_value: e.target.value })}
                        placeholder="e.g., Negative, Positive, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="result_numeric">Result (Numeric)</Label>
                      <Input
                        id="result_numeric"
                        type="number"
                        step="0.01"
                        value={labResult.result_numeric}
                        onChange={(e) => setLabResult({ ...labResult, result_numeric: e.target.value })}
                        placeholder="e.g., 12.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        value={labResult.unit}
                        onChange={(e) => setLabResult({ ...labResult, unit: e.target.value })}
                        placeholder="e.g., g/dL, mg/dL"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={labResult.notes}
                      onChange={(e) => setLabResult({ ...labResult, notes: e.target.value })}
                      placeholder="Any additional notes or observations"
                      rows={2}
                    />
                  </div>

                  <Button onClick={saveLabResult} disabled={savingLab} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {savingLab ? "Saving..." : "Add Lab Result"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    My Lab Results History
                  </CardTitle>
                  <CardDescription>
                    Your recorded lab test results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {labResults.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No lab results recorded yet</p>
                  ) : (
                    <div className="space-y-3">
                      {labResults.map((result) => (
                        <Card key={result.id} className="bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{result.test_name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(result.test_date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                {result.result_numeric && (
                                  <p className="font-semibold">
                                    {result.result_numeric} {result.unit}
                                  </p>
                                )}
                                {result.result_value && (
                                  <p className="text-sm text-muted-foreground">{result.result_value}</p>
                                )}
                              </div>
                            </div>
                            {result.notes && (
                              <p className="text-xs text-muted-foreground mt-2">{result.notes}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
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
                      <ul className="space-y-2 text-sm text-sm text-muted-foreground">
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
