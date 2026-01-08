// app/page.tsx
import Link from "next/link";

const quickLinks = [
  { href: "/checker", title: "Interaction Checker", desc: "Check risky combos and red flags.", icon: "/images/icons/rc-icon-checker.png" },
  { href: "/alerts", title: "Regional Alerts", desc: "Verified-only drug checking alerts.", icon: "/images/icons/rc-icon-warning.png" },
  { href: "/firstaid", title: "First Aid", desc: "What to do if things go wrong.", icon: "/images/icons/rc-icon-warning.png" },
  { href: "/identify", title: "Identify", desc: "Pill / powder / effect clues (harm reduction).", icon: "/images/icons/rc-icon-checker.png" },
  { href: "/support", title: "Support", desc: "Counselling, services, and help.", icon: "/images/icons/rc-icon-pin.png" },
  { href: "/events", title: "Community & Events", desc: "Harm reduction services near you.", icon: "/images/icons/rc-icon-pin.png" },
];

export default function HomePage() {
  return (
    <main className="rc-shell">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/reccheck-logo.png"
              alt="RecCheck"
              className="h-9 w-9 rounded-md"
            />
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-wide">RecCheck</div>
              <div className="text-xs text-zinc-300">Australian harm reduction</div>
            </div>
          </Link>

          {/* Primary nav CTAs always visible above the fold */}
          <div className="flex items-center gap-2">
            <Link
              href="/checker"
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15"
            >
              Checker
            </Link>
            <Link
              href="/alerts"
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15"
            >
              Alerts
            </Link>
            <Link
              href="/events"
              className="hidden rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15 sm:inline-flex"
            >
              Events
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Know what you're taking.
              <span className="block text-zinc-300">Reduce risk. Help your mates.</span>
            </h1>
            <div className="mt-4 h-px w-36 bg-gradient-to-r from-purple-400/40 via-cyan-300/30 to-transparent" />
            <p className="mt-4 max-w-xl text-base text-zinc-300">
              RecCheck is a harm-reduction toolkit: interaction checking, verified alerts,
              first-aid guidance, and community services — built for Australia.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-200">
                AU harm reduction
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-200">
                Verified sources
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-200">
                Non-judgemental
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/checker"
                className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                Start a check
              </Link>
              <Link
                href="/alerts"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
              >
                View verified alerts
              </Link>
              <Link
                href="/events"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Find services & events
              </Link>
            </div>
            <div className="mt-5 text-xs text-zinc-400">
              Not medical advice. If someone is unconscious, seizing, or not breathing: call 000.
            </div>
          </div>

          {/* Right side card with visual panel */}
          <div className="rc-card rc-card-hover relative overflow-hidden p-5 shadow-sm">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage: `radial-gradient(600px 400px at 20% 15%, rgba(160, 90, 255, 0.18), transparent 60%), radial-gradient(600px 420px at 80% 20%, rgba(0, 210, 255, 0.14), transparent 60%), url("/images/backgrounds/rc-paraphernalia-overlay-1920x1080.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "screen"
              }}
            />
            <div className="relative">
              <h2 className="text-sm font-semibold">Quick tools</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {quickLinks.slice(0, 4).map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img src={x.icon} alt="" className="h-5 w-5 opacity-80" />
                    </div>
                    <div className="text-sm font-semibold">{x.title}</div>
                    <div className="mt-1 text-xs text-zinc-300">{x.desc}</div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/support"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  Support
                </Link>
                <Link
                  href="/firstaid"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  First Aid
                </Link>
                <Link
                  href="/identify"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  Identify
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Below-the-fold grid */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:bg-black/40"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={x.icon} alt="" className="h-6 w-6 opacity-80" />
              </div>
              <div className="text-base font-semibold">{x.title}</div>
              <div className="mt-1 text-sm text-zinc-300">{x.desc}</div>
            </Link>
          ))}
        </div>
        <div className="h-14" />
      </div>
    </main>
  );
}
