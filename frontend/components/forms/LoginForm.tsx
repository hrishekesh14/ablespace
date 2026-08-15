"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Triangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { loginAsGuest, loginWithGoogle } from "@/lib/api/auth";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.88c2.27-2.09 3.54-5.17 3.54-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.93H1.3v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.31 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32V6.59H1.3A11.98 11.98 0 000 12c0 1.94.46 3.77 1.3 5.41l4.01-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.3 6.59l4.01 3.09c.94-2.83 3.58-4.93 6.69-4.93z"
      />
    </svg>
  );
}

export function LoginForm() {
  const [loading, setLoading] = useState<"guest" | "google" | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  async function handleGuest() {
    setLoading("guest");
    const user = await loginAsGuest();
    login(user);
    router.push("/tasks");
  }

  async function handleGoogle() {
    setLoading("google");
    const user = await loginWithGoogle();
    login(user);
    router.push("/tasks");
  }

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-surface-subtle px-4">
      <div className="w-full max-w-[380px]">
        <div className="mb-6 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-surface">
            <Triangle className="h-5 w-5 fill-current" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
          <div className="mb-6 text-center">
            <h1 className="text-lg font-semibold text-ink">Let&apos;s get back on track</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Enter your email below to login to your account.
            </p>
          </div>

          <div className="space-y-2.5">
            <Button
              variant="primary"
              className="w-full"
              disabled={loading !== null}
              onClick={handleGuest}
            >
              {loading === "guest" ? "Continuing..." : "Continue as Guest"}
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              disabled={loading !== null}
              onClick={handleGoogle}
            >
              <GoogleIcon />
              {loading === "google" ? "Connecting..." : "Login with Google"}
            </Button>
          </div>

          <p className="mt-5 text-center text-xs leading-relaxed text-ink-faint">
            By clicking continue, you agree to our{" "}
            <a href="#" className="text-ink-muted underline underline-offset-2 hover:text-ink">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-ink-muted underline underline-offset-2 hover:text-ink">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
