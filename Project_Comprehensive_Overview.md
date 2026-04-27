# RealityGap - Comprehensive Project Overview & Inch-by-Inch Details

## 1. Project Identity & Core Concept
**Project Name:** RealityGap
**Tagline:** AI System That Detects Skill Illusions
**Core Idea:** An AI-powered platform designed to measure the difference between a user's *perceived* knowledge (what they think they know) and their *actual* ability (what they can genuinely execute). 

**The Real-World Problem:**
With the rise of AI tools (ChatGPT, GitHub Copilot) and abundant video tutorials, many individuals fall into the trap of "skill illusion"—feeling confident because they can copy-paste or watch solutions without grasping the underlying logic. RealityGap solves this by providing a reality check, measuring actual competence and deep understanding.

## 2. Technology Stack & Infrastructure
Based on the project files and dependencies, RealityGap is built with a modern, high-performance web stack:

### Frontend Layer
- **Framework:** Next.js 15 (React 19) utilizing the App Router.
- **Styling:** Tailwind CSS (v4) with utility-first classes, optimized with `tailwind-merge` and `clsx`.
- **UI Components:** Radix UI (`@radix-ui/react-label`, `@radix-ui/react-slot`) for accessible, headless components.
- **Animations:** Framer Motion (`framer-motion`) for smooth transitions and loading animations.
- **Data Visualization:** Recharts (`recharts`) for generating interactive pie charts, line graphs, and bar charts.
- **Icons & Theming:** Lucide React for consistent iconography and `next-themes` for seamless Light/Dark mode toggling.

### Backend & AI Layer
- **API/Server:** Next.js API Routes (Node.js built-in, serverless functions).
- **AI Engine:** Llama-3.3-70b-instruct (accessed via OpenRouter API / OpenAI SDK `openai`).

### Database & Authentication
- **Database:** Supabase (PostgreSQL) for storing user sessions, progress, and behavior metrics.
- **Authentication:** Clerk (`@clerk/nextjs`) for secure and frictionless user login/signup.

### Hosting & Deployment
- **Platform:** Vercel (1-click deployment) for instant global edge hosting.

---

## 3. Inch-by-Inch Workflow Details

### Phase 1: Skill Claim & Configuration
1. **Skill Selection:** The user inputs the specific skill they want to test (e.g., Python).
2. **Domain & Sub-domain Selection:** The user narrows down their context. For example:
   - *Domain:* Web Development
   - *Sub-domain:* Django / FastAPI
3. **Format Preferences:** The user selects their preferred assessment type (e.g., quizzes, coding problems, reasoning tests).

### Phase 2: AI Question Generation & Loading State
1. **Dynamic Generation:** Upon initiating the assessment, a prompt is sent to the Llama-3.3-70b model to generate *unseen* problems, reasoning questions, and "explain-your-thinking" prompts tailored strictly to the chosen skill and domain.
2. **UI Feedback:** While the AI generates the challenge, a highly visible **Loading Animation** (using Framer Motion) is displayed so the user knows the system is processing their request. 

### Phase 3: The Assessment & Behavioral Analysis
The system doesn't just evaluate binary right/wrong answers. It monitors deep behavioral metrics:
- **Time Tracking:** How long the user takes to solve the problem.
- **Retries:** How many attempts they make.
- **Hint Usage:** Frequency of asking for help.
- **Error Patterns:** Identifying recurring logical flaws.
- **Explanation Quality:** Analyzing the user's ability to explain their code/logic in plain English.

### Phase 4: Gap Calculation & Report Generation
Once the test is concluded, the AI evaluates the user and generates a highly detailed, data-driven report containing:

1. **The Scores:**
   - **Claimed Skill Level:** (e.g., 8/10)
   - **Actual Demonstrated Skill:** (e.g., 4.3/10)
   - **Gap Score:** High/Medium/Low based on the mathematical difference.
   - **Overall Rating:** A final score out of 10.

2. **Visualizations (using Recharts):**
   - **Progress/Percentage Line:** A bar/line chart showing how much percentage they still have to learn.
   - **Pie Chart:** A clear visual breakdown of "Claimed Skill" vs. "Actual Skill" vs. "The Gap".

3. **Detailed AI Feedback & Categorization:**
   The AI breaks down the user's performance into meticulous categories:
   - **Immediate Action:** Areas to focus on, Areas to improve, Areas to practice.
   - **Long-term Strategy:** Areas to master, Areas to learn.
   - **Course Correction:** Areas to unlearn, Areas to relearn, Areas to forget, Areas to avoid, Areas to ignore.
   - **Constructive Motivation:** A direct, non-sugarcoated motivational sentence to encourage continuous learning.

---

## 4. UI/UX Design Principles
As defined in the project notes, the interface must stand out as premium and distinct from standard templates:
- **Simplicity & Speed:** Fast-loading, easy to navigate, and uncluttered.
- **Aesthetics:** Eye-catching, modern, and distinctively designed (leveraging Tailwind and Framer Motion).
- **Responsiveness:** Flawless experience across desktop, tablet, and mobile devices.
- **Accessibility & Customization:** Fully accessible for users with disabilities, featuring an intuitive Light/Dark mode toggle.
- **Reliability:** Secure data handling (via Supabase and Clerk) with consistent performance.

## 5. Development & Execution Roadmap
1. **MVP Frontend:** Build the static UI for the skill claim, mock the quiz, and design the gap score results page.
2. **AI Integration:** Wire up the Next.js API routes using the OpenAI SDK to communicate with the Llama-3.3-70b model for live question generation and grading.
3. **Database Integration:** Connect Supabase to store the generated gap results, behavioral metrics, and user history.
4. **UI/UX Polish:** Refine the frontend, add loading animations, polish charts, and ensure a premium look and feel (while strictly keeping Clerk, Supabase, and the AI logic intact).
5. **Deployment:** Push to GitHub and deploy continuously via Netlify.
