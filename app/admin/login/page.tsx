import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-dim px-6">
      <div className="w-full max-w-sm border border-border bg-surface p-8">
        <p className="font-display text-lg">{siteConfig.shortName} Admin</p>
        <h1 className="mt-1 text-2xl">Sign in</h1>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
