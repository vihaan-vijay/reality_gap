"use client";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Brain } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid hsl(var(--border))",
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(var(--background), 0.8)",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #7c6cff, #a855f7)",
              borderRadius: "8px",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brain size={20} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "hsl(var(--foreground))" }}>
            Reality<span className="gradient-text">Gap</span>
          </span>
        </Link>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <ThemeToggle />
          {isSignedIn ? (
            <>
              <Link href="/assess" className="btn-primary" style={{ textDecoration: "none", padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                Start Test
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}
