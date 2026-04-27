"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ChevronRight, Loader2, Brain } from "lucide-react";

const SKILLS = ["Python", "JavaScript", "TypeScript", "React", "Node.js", "Java", "C++", "SQL", "Machine Learning", "Data Science"];
const DOMAINS: Record<string, string[]> = {
  Python: ["Web Development", "Data Science", "Machine Learning", "Automation"],
  JavaScript: ["Web Development", "Backend", "Mobile", "Game Dev"],
  TypeScript: ["Web Development", "Backend", "Full Stack"],
  React: ["Web Development", "Mobile (React Native)", "UI Libraries"],
  "Node.js": ["REST APIs", "Microservices", "Real-time Apps"],
  Java: ["Web Development", "Android", "Enterprise", "Data Structures"],
  "C++": ["Systems Programming", "Game Dev", "Competitive Programming"],
  SQL: ["Database Design", "Analytics", "Data Engineering"],
  "Machine Learning": ["Computer Vision", "NLP", "Reinforcement Learning"],
  "Data Science": ["Analytics", "Visualization", "Statistical Modeling"],
};
const SUBDOMAINS: Record<string, string[]> = {
  "Web Development": ["Django", "Flask", "FastAPI", "Next.js", "Express"],
  "Data Science": ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
  "Machine Learning": ["Scikit-learn", "TensorFlow", "PyTorch", "Keras"],
  "Automation": ["Selenium", "Playwright", "Scrapy", "Airflow"],
  "Backend": ["Express", "Fastify", "NestJS", "Hapi"],
  "Mobile": ["React Native", "Expo", "Ionic"],
  "Game Dev": ["Pygame", "Unity C#", "Phaser"],
  "UI Libraries": ["Radix UI", "Shadcn", "Chakra UI", "Material UI"],
  "REST APIs": ["Express", "Fastify", "NestJS"],
  "Microservices": ["Docker", "Kubernetes", "gRPC"],
  "Real-time Apps": ["Socket.io", "WebSockets", "SSE"],
  "Full Stack": ["Next.js", "Remix", "SvelteKit"],
  "Android": ["Spring Boot", "Hibernate", "JDBC"],
  "Enterprise": ["Spring", "Maven", "Gradle"],
  "Data Structures": ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
  "Systems Programming": ["POSIX", "Memory Management", "Multi-threading"],
  "Competitive Programming": ["STL", "Algorithms", "Graph Theory"],
  "Database Design": ["PostgreSQL", "MySQL", "ERD"],
  "Analytics": ["Power BI", "Tableau", "Google Analytics"],
  "Data Engineering": ["Spark", "Kafka", "Airflow"],
  "Computer Vision": ["OpenCV", "YOLO", "CNNs"],
  "NLP": ["Transformers", "BERT", "SpaCy"],
  "Reinforcement Learning": ["Q-Learning", "PPO", "OpenAI Gym"],
  "Statistical Modeling": ["R", "Statsmodels", "Scipy"],
  "Visualization": ["Plotly", "D3.js", "Bokeh"],
};
const QUESTION_TYPES = ["Quiz (MCQ)", "Problem Solving", "Code Explanation", "Debugging", "Mixed"];

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Report {
  claimedLevel: number;
  actualLevel: number;
  gapScore: "HIGH" | "MEDIUM" | "LOW";
  rating: number;
  motivation: string;
  focusAreas: string[];
  improveAreas: string[];
  masterAreas: string[];
  avoidAreas: string[];
}

export default function AssessPage() {
  const [step, setStep] = useState<"config" | "quiz" | "report">("config");
  const [skill, setSkill] = useState("");
  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [claimedLevel, setClaimedLevel] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [timings, setTimings] = useState<number[]>([]);
  const [hints, setHints] = useState(0);

  const canStart = skill && domain && subdomain && questionType;

  async function startQuiz() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill, domain, subdomain, questionType, claimedLevel }),
      });
      const data = await res.json();
      setQuestions(data.questions);
      setStep("quiz");
      setStartTime(Date.now());
    } catch {
      alert("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const elapsed = (Date.now() - startTime) / 1000;
    setTimings((t) => [...t, elapsed]);
  }

  function nextQuestion() {
    setAnswers((a) => [...a, selected ?? -1]);
    setSelected(null);
    setStartTime(Date.now());
    if (current + 1 >= questions.length) {
      generateReport();
    } else {
      setCurrent((c) => c + 1);
    }
  }

  async function generateReport() {
    setLoading(true);
    const correct = answers.filter((a, i) => a === questions[i]?.correct).length;
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill, domain, subdomain, claimedLevel, correct, total: questions.length, timings, hints }),
      });
      const data = await res.json();
      setReport(data.report);
      setStep("report");
    } catch {
      alert("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: "1.5rem" }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <div style={{ background: "linear-gradient(135deg, #7c6cff, #a855f7)", borderRadius: "50%", padding: "1rem" }}>
              <Brain size={36} color="white" />
            </div>
          </motion.div>
          <motion.p animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: "hsl(var(--muted-foreground))", fontSize: "1.1rem" }}>
            {step === "config" ? "AI is crafting your personalized challenge…" : "Calculating your Reality Gap…"}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* CONFIG STEP */}
        <AnimatePresence mode="wait">
          {step === "config" && (
            <motion.div key="config" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Configure Your Assessment</h1>
              <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2.5rem" }}>Tell us what you claim to know. We'll find out what you actually do.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Skill */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Skill *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {SKILLS.map((s) => (
                      <button key={s} className={`tag-chip ${skill === s ? "active" : ""}`} onClick={() => { setSkill(s); setDomain(""); setSubdomain(""); }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Domain */}
                {skill && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Domain *</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {(DOMAINS[skill] || []).map((d) => (
                        <button key={d} className={`tag-chip ${domain === d ? "active" : ""}`} onClick={() => { setDomain(d); setSubdomain(""); }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Subdomain */}
                {domain && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Sub-domain *</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {(SUBDOMAINS[domain] || []).map((sd) => (
                        <button key={sd} className={`tag-chip ${subdomain === sd ? "active" : ""}`} onClick={() => setSubdomain(sd)}>
                          {sd}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Question type */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Assessment Type *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {QUESTION_TYPES.map((qt) => (
                      <button key={qt} className={`tag-chip ${questionType === qt ? "active" : ""}`} onClick={() => setQuestionType(qt)}>
                        {qt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Claimed level */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                    Your Claimed Skill Level: <span className="gradient-text">{claimedLevel}/10</span>
                  </label>
                  <input type="range" min={1} max={10} value={claimedLevel} onChange={(e) => setClaimedLevel(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#7c6cff", cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>
                    <span>Beginner</span><span>Intermediate</span><span>Expert</span>
                  </div>
                </div>

                <button className="btn-primary neon-glow" disabled={!canStart} onClick={startQuiz}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: canStart ? 1 : 0.5 }}>
                  Generate My Challenge <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* QUIZ STEP */}
          {step === "quiz" && questions.length > 0 && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
                  Question {current + 1} of {questions.length}
                </span>
                <div className="progress-bar" style={{ width: "60%" }}>
                  <div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
                </div>
                <button onClick={() => setHints((h) => h + 1)} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}>
                  Hint ({hints})
                </button>
              </div>

              <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.75rem", color: "#7c6cff", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1rem" }}>
                  {skill.toUpperCase()} · {domain} · {subdomain}
                </p>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.6, marginBottom: "2rem" }}>
                  {questions[current].question}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {questions[current].options.map((opt, i) => (
                    <button
                      key={i}
                      className={`option-card ${selected === i ? (i === questions[current].correct ? "correct" : "incorrect") : ""} ${selected !== null && i === questions[current].correct ? "correct" : ""}`}
                      onClick={() => handleAnswer(i)}
                    >
                      <span style={{ fontWeight: 600, color: "#7c6cff", marginRight: "0.75rem" }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>

                {selected !== null && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "8px", background: "rgba(124,108,255,0.1)", border: "1px solid rgba(124,108,255,0.2)" }}>
                    <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>
                      <strong style={{ color: "hsl(var(--foreground))" }}>Explanation:</strong> {questions[current].explanation}
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {selected !== null && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="btn-primary" onClick={nextQuestion}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  {current + 1 >= questions.length ? "Generate My Report" : "Next Question"} <ChevronRight size={18} />
                </motion.button>
              )}
            </motion.div>
          )}

          {/* REPORT STEP */}
          {step === "report" && report && (
            <ReportView report={report} skill={skill} domain={domain} subdomain={subdomain} claimedLevel={claimedLevel} answers={answers} questions={questions} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReportView({ report, skill, domain, subdomain, claimedLevel, answers, questions }: {
  report: Report; skill: string; domain: string; subdomain: string; claimedLevel: number; answers: number[]; questions: Question[];
}) {
  const correct = answers.filter((a, i) => a === questions[i]?.correct).length;
  const gapColor = report.gapScore === "HIGH" ? "#ef4444" : report.gapScore === "MEDIUM" ? "#f59e0b" : "#22c55e";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📊</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Your Reality Report</h1>
        <p style={{ color: "hsl(var(--muted-foreground))" }}>{skill} · {domain} · {subdomain}</p>
      </div>

      {/* Score cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { label: "Claimed Level", value: `${claimedLevel}/10`, color: "#7c6cff" },
          { label: "Actual Level", value: `${report.actualLevel}/10`, color: "#a855f7" },
          { label: "Gap Score", value: report.gapScore, color: gapColor },
          { label: "AI Rating", value: `${report.rating}/10`, color: "#22c55e" },
          { label: "Correct Answers", value: `${correct}/${questions.length}`, color: "#f59e0b" },
        ].map((card) => (
          <div key={card.label} className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: "0.8rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Gap bar */}
      <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h3 style={{ fontWeight: 600, marginBottom: "1rem" }}>Skill Gap Visualization</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { label: "Claimed", value: claimedLevel * 10, color: "#7c6cff" },
            { label: "Actual", value: report.actualLevel * 10, color: "#a855f7" },
          ].map((bar) => (
            <div key={bar.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", fontSize: "0.875rem" }}>
                <span>{bar.label}</span><span style={{ color: bar.color, fontWeight: 600 }}>{bar.value}%</span>
              </div>
              <div className="progress-bar">
                <motion.div initial={{ width: 0 }} animate={{ width: `${bar.value}%` }} transition={{ duration: 1, ease: "easeOut" }}
                  style={{ height: "100%", background: `linear-gradient(90deg, ${bar.color}, ${bar.color}aa)`, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback sections */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { title: "🎯 Focus Areas", items: report.focusAreas, color: "#7c6cff" },
          { title: "📈 Improve Areas", items: report.improveAreas, color: "#f59e0b" },
          { title: "🏆 Master Areas", items: report.masterAreas, color: "#22c55e" },
          { title: "🚫 Avoid Areas", items: report.avoidAreas, color: "#ef4444" },
        ].map((section) => (
          <div key={section.title} className="glass-card" style={{ padding: "1.25rem" }}>
            <h3 style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{section.title}</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {section.items.map((item, i) => (
                <li key={i} style={{ fontSize: "0.825rem", color: "hsl(var(--muted-foreground))", display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
                  <span style={{ color: section.color, marginTop: "2px" }}>▸</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Motivation */}
      <div className="glass-card neon-glow-purple" style={{ padding: "2rem", textAlign: "center", marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.75rem", color: "#7c6cff", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>AI SAYS</p>
        <p style={{ fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.7 }}>&ldquo;{report.motivation}&rdquo;</p>
      </div>

      <button className="btn-primary" style={{ width: "100%" }} onClick={() => window.location.reload()}>
        Take Another Assessment
      </button>
    </motion.div>
  );
}
