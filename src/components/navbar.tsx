"use client";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Brain } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 50,
      padding: "0 2.5rem",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(0,0,0,0.8)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: 28, height: 28,
            background: "linear-gradient(135deg, #7c3aed, #9b5cf6)",
            borderRadius: "6px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Brain size={16} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "-0.01em" }}>
            RealityGap
          </span>
        </Link>

        {/* Nav links + user */}
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <Link href="/assess" className="nav-link">Assessment</Link>
          <a href="#how-it-works" className="nav-link">Methodology</a>
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #9b5cf6)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "0.75rem", fontWeight: 700,
              }}>
                U
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}
