"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Brain, Zap, Target, BarChart3, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* Hero */}
      <section className="animated-bg" style={{ position: "relative", padding: "5rem 1.5rem 4rem" }}>
        {/* Floating orbs */}
        <div style={{
          position: "absolute", top: "10%", left: "5%", width: 300, height: 300,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(124,108,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-high" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
                🧠 AI-Powered Skill Verification
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
              color: "hsl(var(--foreground))",
            }}>
              Stop Living in a{" "}
              <span className="gradient-text">Skill Illusion</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "hsl(var(--muted-foreground))",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}>
              AI tools made you feel expert. RealityGap measures the{" "}
              <strong style={{ color: "hsl(var(--foreground))" }}>actual gap</strong> between what you
              think you know and what you can genuinely execute. Get your reality check now.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              {isSignedIn ? (
                <Link href="/assess" className="btn-primary neon-glow" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  Start Assessment <ChevronRight size={18} />
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="btn-primary neon-glow" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Get Your Reality Check <ChevronRight size={18} />
                  </button>
                </SignInButton>
              )}
              <a href="#how-it-works" className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                See How It Works
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {[
            { value: "73%", label: "Developers overestimate their skills" },
            { value: "4.3x", label: "Avg gap between claimed vs actual" },
            { value: "10 min", label: "To get your full reality report" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="gradient-text" style={{ fontSize: "2.5rem", fontWeight: 800 }}>{stat.value}</div>
              <div style={{ fontSize: "0.85rem", color: "hsl(var(--muted-foreground))", marginTop: "0.25rem" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
              How <span className="gradient-text">RealityGap</span> Works
            </h2>
            <p style={{ color: "hsl(var(--muted-foreground))", maxWidth: "500px", margin: "0 auto" }}>
              Five steps to your honest skill reality check
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: <Target size={28} />, step: "01", title: "Claim Your Skill", desc: "Select the skill, domain, and sub-domain you want to be assessed on. Choose your preferred question type." },
              { icon: <Brain size={28} />, step: "02", title: "AI Generates Challenges", desc: "Llama 3.3-70B creates unseen, adaptive problems, reasoning questions, and explain-your-thinking prompts." },
              { icon: <Zap size={28} />, step: "03", title: "Behavioral Analysis", desc: "System tracks time taken, retries, hint usage, and error patterns — not just right vs wrong." },
              { icon: <BarChart3 size={28} />, step: "04", title: "Gap Score Calculated", desc: "Your claimed level vs actual demonstrated ability — measured precisely and objectively." },
              { icon: <Star size={28} />, step: "05", title: "Detailed AI Report", desc: "Get your rating, pie chart breakdown, areas to focus on, and a straight-talking motivational message." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-card hover-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: "2rem" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{
                    background: "linear-gradient(135deg, rgba(124,108,255,0.2), rgba(168,85,247,0.2))",
                    border: "1px solid rgba(124,108,255,0.3)",
                    borderRadius: "12px",
                    padding: "0.75rem",
                    color: "#a78bfa",
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#7c6cff", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>STEP {item.step}</div>
                    <h3 style={{ fontWeight: 600, marginBottom: "0.5rem", fontSize: "1.05rem" }}>{item.title}</h3>
                    <p style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div className="glass-card neon-glow-purple" style={{ maxWidth: "700px", margin: "0 auto", padding: "4rem 2rem" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, marginBottom: "1rem" }}>
              Are you really as good as you think?
            </h2>
            <p style={{ color: "hsl(var(--muted-foreground))", marginBottom: "2rem", lineHeight: 1.7 }}>
              Stop guessing. Get data. RealityGap gives you an honest, AI-generated
              breakdown of where you actually stand — in under 10 minutes.
            </p>
            {isSignedIn ? (
              <Link href="/assess" className="btn-primary neon-glow" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Take the Free Test Now <ChevronRight size={18} />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary neon-glow" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Take the Free Test Now <ChevronRight size={18} />
                </button>
              </SignInButton>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid hsl(var(--border))", padding: "2rem 1.5rem", textAlign: "center", color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          <Brain size={16} style={{ color: "#7c6cff" }} />
          <span>RealityGap — AI Skill Illusion Detector. Built to show you the truth.</span>
        </div>
      </footer>
    </div>
  );
}
