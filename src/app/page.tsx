"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { SignInButton, useUser } from "@clerk/nextjs";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        paddingTop: "160px",
        paddingBottom: "100px",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* subtle radial glow behind headline */}
        <div style={{
          position: "absolute",
          top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700, height: 400,
          background: "radial-gradient(ellipse, rgba(109,40,232,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ position: "relative" }}>
          {/* Pill badge */}
          <motion.div variants={fadeUp} style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "center" }}>
            <span className="pill-badge">
              <Zap size={11} style={{ color: "#a78bfa" }} />
              AI-Powered Reality Check
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 variants={fadeUp} style={{
            fontSize: "clamp(4rem, 12vw, 9rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "0.1em",
            color: "#fff",
          }}>
            Uncover The
          </motion.h1>
          <motion.h1 variants={fadeUp} className="gradient-text" style={{
            fontSize: "clamp(4rem, 12vw, 9rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}>
            Skill Gap
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeUp} style={{
            maxWidth: "520px",
            margin: "0 auto 2.75rem",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75,
          }}>
            The Dunning-Kruger effect is real. RealityGap uses advanced LLMs to dissect
            your expertise and show you exactly where you stand compared to industry benchmarks.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
            {isSignedIn ? (
              <Link href="/assess" className="btn-primary" style={{ textDecoration: "none" }}>
                Test Your Limits <ArrowRight size={15} />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary">
                  Test Your Limits <ArrowRight size={15} />
                </button>
              </SignInButton>
            )}
            <a href="#how-it-works" className="btn-outline">
              The Methodology
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 1.5rem",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {[
            { value: "73%", label: "Developers overestimate skills" },
            { value: "4.3×", label: "Avg claimed vs actual gap" },
            { value: "10 min", label: "To get your full report" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="gradient-text" style={{ fontSize: "2.75rem", fontWeight: 900, letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.35rem", letterSpacing: "0.04em" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section id="how-it-works" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "4rem" }}>
            <p className="section-label" style={{ marginBottom: "1rem" }}>The Methodology</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1 }}>
              Five Stages of<br />
              <span className="gradient-text">Truth</span>
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {[
              { num: "01", title: "Claim Your Skill", desc: "Select the skill, domain, and sub-domain. State your confidence level from 1–10." },
              { num: "02", title: "AI Generates Challenges", desc: "Llama 3.3-70B creates adaptive problems, reasoning questions, and explain-your-thinking prompts specific to your domain." },
              { num: "03", title: "Behavioral Analysis", desc: "The system tracks time per question, retry attempts, hint usage, and error patterns — not just right vs wrong." },
              { num: "04", title: "Gap Score Calculated", desc: "Your claimed level is measured against actual demonstrated ability to produce a precise confidence gap score." },
              { num: "05", title: "Detailed AI Report", desc: "Receive your rating, skill breakdown chart, focus areas, and a direct motivational message — no sugarcoating." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "2rem",
                  alignItems: "start",
                  padding: "2rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "default",
                }}
              >
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", paddingTop: "0.2rem" }}>{step.num}</span>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>Ready?</p>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>
              Face Your<br /><span className="gradient-text">Reality</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Stop assuming. Start knowing. Get an honest, data-driven breakdown of where you actually stand — in under 10 minutes.
            </p>
            {isSignedIn ? (
              <Link href="/assess" className="btn-primary" style={{ textDecoration: "none" }}>
                Start Your Assessment <ArrowRight size={15} />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary">
                  Start Your Assessment <ArrowRight size={15} />
                </button>
              </SignInButton>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
          © 2026 REALITYGAP — AI SKILL ILLUSION DETECTOR
        </span>
      </footer>
    </div>
  );
}
