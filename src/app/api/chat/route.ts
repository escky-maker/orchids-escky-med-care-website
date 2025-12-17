import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { isPremiumUser } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a knowledgeable and empathetic maternal and child health assistant for Escky Med Care. Your role is to provide evidence-based information about:

- Pregnancy and prenatal care (antenatal visits, nutrition, screenings, fetal development)
- Childbirth and labor preparation
- Postnatal care and recovery
- Newborn care (feeding, sleep, hygiene)
- Child development and milestones (0-5 years)
- Vaccinations and immunization schedules
- Common health concerns for mothers and children
- Growth tracking and monitoring
- Breastfeeding and infant nutrition

IMPORTANT GUIDELINES:
1. Base all responses on WHO, CDC, AAP, and other reputable medical guidelines
2. Always emphasize that your advice is for informational purposes only
3. Strongly encourage users to consult healthcare providers for personalized medical advice
4. Never diagnose conditions or prescribe treatments
5. If asked about serious symptoms or emergencies, immediately advise seeking medical attention
6. Be warm, supportive, and non-judgmental in your tone
7. Acknowledge cultural and individual differences in parenting practices
8. If you don't have specific information, clearly state "I don't have that specific information" rather than guessing
9. Provide practical, actionable advice when appropriate
10. Include safety warnings when relevant

Remember: You are a supportive resource, not a replacement for professional healthcare.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required to use the AI chatbot." },
        { status: 400 }
      );
    }

    const hasPremiumAccess = await isPremiumUser(email);

    if (!hasPremiumAccess) {
      return NextResponse.json(
        { error: "Premium subscription required. Please upgrade to access the AI Health Chatbot." },
        { status: 403 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ message: assistantMessage });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    
    if (error instanceof Error && 'status' in error && error.status === 401) {
      return NextResponse.json(
        { error: "Invalid OpenAI API key. Please check your OPENAI_API_KEY environment variable." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process chat request. Please try again." },
      { status: 500 }
    );
  }
}
