import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => (
  <div className="min-h-screen grid lg:grid-cols-2 bg-background-light dark:bg-background-dark">
    {/* Branding panel — hidden on small screens */}
    <div className="hidden lg:flex flex-col justify-between p-12 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-secondary/10" />
      <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-secondary/10" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-secondary" />

      <div className="relative flex items-center gap-2 text-2xl font-display font-semibold uppercase tracking-wide">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/15 text-xl">
          🚗
        </span>
        CarDealer
      </div>

      <div className="relative">
        <h2 className="text-4xl font-display font-semibold uppercase leading-tight mb-4">
          Every unit,
          <br />
          <span className="text-secondary">tagged and tracked.</span>
        </h2>
        <p className="text-white/70 max-w-md">
          Stock levels, restocks, and sales — one dashboard for the whole lot.
        </p>
      </div>

      <p className="relative text-sm text-white/40">
        © {new Date().getFullYear()} CarDealer Inc.
      </p>
    </div>

    {/* Form panel */}
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="lg:hidden flex items-center gap-2 text-xl font-display font-semibold uppercase tracking-wide text-primary mb-8 justify-center">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-lg">
            🚗
          </span>
          CarDealer
        </div>

        <div className="tw-card p-6 sm:p-8">
          <h2 className="text-2xl font-display font-semibold uppercase tracking-wide mb-1 text-center">
            {title}
          </h2>
          <p className="text-sm text-text-muted dark:text-text-darkMuted text-center mb-6">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </div>
  </div>
);
