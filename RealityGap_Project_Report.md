# RealityGap: AI Skill Illusion Detector
**Complete Project Report**

---

## 1. Executive Summary & Core Concept

**Project Name:** RealityGap
**Tagline:** *AI System That Detects Skill Illusions*

**Core Idea:**
RealityGap is an innovative, AI-powered platform designed to measure the critical difference between a user's *perceived* knowledge (what they think they know) and their *actual* ability (what they can genuinely execute). 

In the modern era of abundant AI tools (ChatGPT, GitHub Copilot) and endless video tutorials, many individuals fall into the trap of "skill illusion." They feel confident because they can copy-paste or watch solutions without grasping the underlying logic. RealityGap solves this by providing a definitive reality check, measuring actual competence and deep understanding rather than rote memorization.

---

## 2. Problem Statement

Today's biggest hidden problem in education and recruitment is the illusion of learning. People believe they are skilled because of:
- Binge-watching YouTube tutorials
- Over-reliance on AI assistants
- Watching solutions instead of actively solving problems
- Copy-paste coding habits

**The Result:**
- Students feel a false sense of confidence.
- Companies find candidates fundamentally unprepared despite impressive resumes.
- Learning becomes illusion-based.

**The Solution:**
RealityGap directly attacks this problem. Instead of another generic AI chatbot, RealityGap says: *"AI is causing a learning illusion — we built a system to measure reality."*

---

## 3. Technology Stack & Infrastructure

The project is built on a modern, high-performance, and scalable web stack, combining robust front-end frameworks with cutting-edge AI integrations.

### 3.1 Frontend Architecture
- **Core Framework:** Next.js 15 / React 19 (App Router)
- **Styling:** Tailwind CSS (v4) with utility-first classes, optimized using `tailwind-merge` and `clsx`.
- **UI Components:** Radix UI (`@radix-ui/react-label`, `@radix-ui/react-slot`) for accessible, headless primitive components.
- **Animations & Transitions:** Framer Motion (`framer-motion`) for smooth loading states and interactive transitions.
- **Data Visualization:** Recharts (`recharts`) for generating dynamic pie charts, line graphs, and bar charts to display gap analysis.
- **Icons & Theming:** Lucide React for consistent iconography and `next-themes` for seamless Light/Dark mode switching.
- **Type Safety:** TypeScript (`typescript` v5)

### 3.2 Backend & API Layer
- **Server Environment:** Next.js API Routes (Node.js built-in serverless functions).
- **AI Engine:** Llama-3.3-70b-instruct (Accessed securely via OpenRouter API / OpenAI SDK `openai` v6.25).

### 3.3 Database & Authentication
- **Database System:** Supabase (PostgreSQL) for scalable storage of user sessions, progress, assessment results, and behavior metrics.
- **User Authentication:** Clerk (`@clerk/nextjs`) for secure, frictionless, and scalable user identity management (login/signup).

### 3.4 Hosting & Deployment
- **Deployment Platform:** Vercel (1-click global edge hosting) for continuous integration, deployment, and highly optimized delivery.

---

## 4. Inch-by-Inch Workflow & Application Logic

### Phase 1: Skill Claim & Configuration
1. **Skill Selection:** The user inputs the specific skill they want to test (e.g., Python, JavaScript).
2. **Domain & Sub-domain Selection:** The user narrows down their context.
   - *Example Domain:* Web Development
   - *Example Sub-domain:* Django / FastAPI
3. **Format Preferences:** The user selects their preferred assessment type (e.g., quizzes, coding problems, reasoning tests).

### Phase 2: Dynamic AI Generation & Processing
1. **Prompt Engineering:** Upon initiating the assessment, a highly-structured prompt is sent to the Llama-3.3-70b model.
2. **Dynamic Generation:** The AI generates *unseen* problems, reasoning questions, and "explain-your-thinking" prompts tailored strictly to the chosen parameters.
3. **UI Feedback:** A highly visible **Loading Animation** (using Framer Motion) keeps the user engaged while the AI processes the request.

### Phase 3: The Assessment & Behavioral Analysis
The system evaluates far more than just binary right/wrong answers. It monitors deep behavioral metrics:
- **Time Tracking:** How long the user takes to solve the problem.
- **Retries:** The number of attempts made before reaching a solution.
- **Hint Usage:** Frequency and timing of asking for help.
- **Error Patterns:** Identifying recurring logical flaws.
- **Explanation Quality:** Analyzing the user's ability to articulate their code/logic in plain English.

### Phase 4: Gap Calculation & Report Generation
Post-assessment, the AI generates a highly detailed, data-driven report:

1. **The Core Metrics:**
   - **Claimed Skill Level:** Self-reported score (e.g., 8/10).
   - **Actual Demonstrated Skill:** Empirically tested score (e.g., 4.3/10).
   - **Gap Score:** Categorized as High/Medium/Low based on the mathematical difference.
   - **Overall Rating:** Final competency score out of 10.

2. **Visualizations (Powered by Recharts):**
   - **Progress Line/Bar Chart:** Showing the percentage of knowledge acquired vs. the percentage still to learn.
   - **Pie Chart:** Visual breakdown of "Claimed Skill" vs. "Actual Skill" vs. "The Gap".

3. **Detailed AI Feedback Categorization:**
   The AI breaks down performance into actionable categories:
   - *Immediate Action:* Areas to improve, practice, and focus on.
   - *Long-term Strategy:* Areas to master and learn.
   - *Course Correction:* Areas to unlearn, relearn, forget, and avoid.
   - *Constructive Motivation:* A direct, non-sugarcoated motivational summary encouraging continuous learning.

---

## 5. UI/UX Design Principles

The interface is built to stand out as a premium, modern application distinct from standard templates:
- **Simplicity & Speed:** Fast-loading, uncluttered layout emphasizing content.
- **Modern Aesthetics:** Eye-catching design utilizing Tailwind CSS and Framer Motion micro-interactions.
- **Full Responsiveness:** Flawless experience across desktop, tablet, and mobile devices.
- **Accessibility:** High contrast ratios, screen-reader friendly (Radix UI), and intuitive Light/Dark mode toggling.
- **Data Privacy & Reliability:** Secure, reliable data handling via Supabase and Clerk.

---

## 6. Future Scope & Expansion

RealityGap has immense potential to scale beyond an individual assessment tool:
- **Recruiter Dashboard:** Allowing companies to verify applicant skills autonomously.
- **Institutional Analytics:** Colleges and universities can track aggregate student comprehension levels.
- **Learning Recommendation Engine:** Suggesting specific courses or articles based on identified "gaps".
- **Interview Readiness Scoring:** Simulating technical interviews to provide a "readiness" percentile.

---

## CHAPTER 10: APPENDIX

### 10.1 SOURCE CODE

The following snippet demonstrates the core AI integration using the OpenRouter API to communicate with `llama-3.3-70b-instruct` for generating dynamic skill assessment questions.

```typescript
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// ===================================================================
// DYNAMIC AI ASSESSMENT GENERATOR
// Communicates with Llama-3.3-70b-instruct via OpenRouter API
// ===================================================================

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { skill, domain, subDomain, format } = await req.json();

    if (!skill || !domain) {
      return NextResponse.json({ error: 'Skill and domain are required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert technical assessor. 
Your goal is to generate an advanced assessment to measure the user's ACTUAL skill level vs their PERCEIVED skill level.
Skill: ${skill}
Domain: ${domain}
Sub-domain: ${subDomain || 'General'}
Format: ${format}

Generate 5 complex, scenario-based questions that test deep understanding rather than rote memorization.
Return ONLY a valid JSON object matching this structure:
{
  "title": "...",
  "questions": [
    {
      "id": 1,
      "type": "scenario",
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswerIndex": 0,
      "deepExplanation": "..."
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate the assessment JSON now." }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    return NextResponse.json({ success: true, assessment: result });
  } catch (error) {
    console.error('Error generating assessment:', error);
    return NextResponse.json({ error: 'Failed to generate assessment' }, { status: 500 });
  }
}
```

### 10.2 SCREENSHOTS

**Login Portal & Authentication Gate:**
This interface demonstrates the implementation of the Clerk authentication provider. It features a secure, frictionless entry point and supports seamless OAuth 2.0 social logins (like Google and GitHub) alongside standard email verification, minimizing onboarding friction for new users.

**Skill Claim & Configuration Dashboard:**
This screen showcases the initial user setup phase. A sleek, modern form built with Radix UI allows the user to define their target skill, domain, and sub-domain. Smooth Framer Motion transitions guide the user through selecting their preferred assessment format.

**Active Assessment Interface & Loading State:**
This view captures the dynamic assessment in progress. A highly visible, animated loading state appears while the Llama-3.3-70b AI generates personalized questions in real-time. Once loaded, the interface presents scenario-based questions alongside a timer to track behavioral metrics like time-to-answer and hint usage.

**Reality Gap Analysis Report:**
The final results dashboard featuring Recharts data visualizations. It highlights a clear pie chart contrasting the "Claimed Skill Level" with the "Actual Demonstrated Skill." A categorized feedback section provides constructive, non-sugarcoated insights—detailing areas to master, relearn, and focus on—empowering the user to overcome their skill illusion.
