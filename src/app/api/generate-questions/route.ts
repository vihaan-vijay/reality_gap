import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { skill, domain, subdomain, questionType, claimedLevel } = await req.json();

    const prompt = `You are an expert technical interviewer. Generate exactly 5 challenging assessment questions for:
- Skill: ${skill}
- Domain: ${domain}
- Sub-domain: ${subdomain}
- Question Type: ${questionType}
- User Claimed Level: ${claimedLevel}/10

Rules:
1. Questions must be genuinely challenging for someone who CLAIMS level ${claimedLevel}/10
2. Questions should test REAL understanding, not just syntax recall
3. Each question must have exactly 4 options (A, B, C, D)
4. Include reasoning/explanation questions that require thinking

Return ONLY valid JSON in this exact format (no markdown, no extra text):
{
  "questions": [
    {
      "question": "The full question text here?",
      "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
      "correct": 0,
      "explanation": "Brief explanation of why this is correct and what it tests."
    }
  ]
}

The "correct" field is a 0-based index (0=A, 1=B, 2=C, 3=D).`;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content || "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generate questions error:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
