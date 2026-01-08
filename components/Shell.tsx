"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/checker", label: "Checker" },
  { href: "/alerts", label: "Alerts" },
  { href: "/events", label: "Events" },
  { href: "/firstaid", label: "First Aid" },
  { href: "/identify", label: "Identify" },
  { href: "/support", label: "Support" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="rc-shell">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/reccheck-logo.png"
              alt="RecCheck"
              className="h-9 w-9 rounded-md"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-zinc-100">RecCheck</div>
              <div className="text-xs text-zinc-400">harm reduction • Australia</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const active = pathname?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={[
                    "rounded-lg px-3 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-white/12 text-zinc-100"
                      : "text-zinc-300 hover:bg-white/8 hover:text-zinc-100",
                  ].join(" ")}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/checker"
              className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Start
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-zinc-500">
        Not medical advice. If someone is unconscious, seizing, or not breathing: call 000.
      </footer>
    </div>
  );
}
