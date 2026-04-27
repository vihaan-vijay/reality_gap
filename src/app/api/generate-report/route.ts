import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });
  try {
    const { skill, domain, subdomain, claimedLevel, correct, total, timings, hints } = await req.json();

    const avgTime = timings.length ? (timings.reduce((a: number, b: number) => a + b, 0) / timings.length).toFixed(1) : "N/A";
    const accuracy = ((correct / total) * 100).toFixed(0);
    const actualLevel = Math.round((correct / total) * 10 * 10) / 10;
    const gap = claimedLevel - actualLevel;
    const gapScore = gap >= 4 ? "HIGH" : gap >= 2 ? "MEDIUM" : "LOW";

    const prompt = `You are an expert AI skill assessment engine. Analyze the following test results and return a detailed report.

Test Results:
- Skill: ${skill} (${domain} / ${subdomain})
- Claimed Level: ${claimedLevel}/10
- Correct Answers: ${correct}/${total} (${accuracy}%)
- Actual Calculated Level: ${actualLevel}/10
- Gap Score: ${gapScore}
- Average time per question: ${avgTime} seconds
- Hints used: ${hints}

Generate a realistic, honest, non-sugarcoated assessment report. Return ONLY valid JSON (no markdown):
{
  "claimedLevel": ${claimedLevel},
  "actualLevel": ${actualLevel},
  "gapScore": "${gapScore}",
  "rating": <number 1-10 based on actual performance>,
  "motivation": "<1 direct, honest, motivating sentence — no fluff, no sugar coating>",
  "focusAreas": ["<area 1>", "<area 2>", "<area 3>"],
  "improveAreas": ["<area 1>", "<area 2>", "<area 3>"],
  "masterAreas": ["<area 1>", "<area 2>"],
  "avoidAreas": ["<area 1>", "<area 2>"]
}

The areas should be specific to ${skill} / ${subdomain}. Be precise and technically accurate.`;

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 800,
    });

    const content = response.choices[0]?.message?.content || "";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI response");

    const report = JSON.parse(jsonMatch[0]);
    report.actualLevel = actualLevel;
    report.gapScore = gapScore;
    report.claimedLevel = claimedLevel;

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Generate report error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
