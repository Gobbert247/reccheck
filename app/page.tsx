// app/page.tsx
import Link from "next/link";

const quickLinks = [
  { href: "/checker", title: "Interaction Checker", desc: "Check risky combos and red flags." },
  { href: "/alerts", title: "Regional Alerts", desc: "Verified-only drug checking alerts." },
  { href: "/firstaid", title: "First Aid", desc: "What to do if things go wrong." },
  { href: "/identify", title: "Identify", desc: "Pill / powder / effect clues (harm reduction)." },
  { href: "/support", title: "Support", desc: "Counselling, services, and help." },
  { href: "/events", title: "Community & Events", desc: "Harm reduction services near you." },
];

export default function HomePage() {
  return (
    <main className="rc-texture min-h-screen text-zinc-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <img
src="/images/reccheck-logo.jpg"              alt="RecCheck"
              className="h-9 w-9 rounded-md"
            />
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-wide">RecCheck</div>
              <div className="text-xs text-zinc-300">Australian harm reduction</div>
            </div>
          </Link>

          {/* Primary nav CTAs always visible above the fold */}
          <nav className="flex items-center gap-2">
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
          </nav>
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
            <p className="mt-4 max-w-xl text-base text-zinc-300">
              RecCheck is a harm-reduction toolkit: interaction checking, verified alerts,
              first-aid guidance, and community services — built for Australia.
            </p>
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
            <p className="mt-5 text-xs text-zinc-400">
              Not medical advice. If someone is unconscious, seizing, or not breathing: call
              000.
            </p>
          </div>

          {/* Right side card — keeps above-the-fold visual interest without pushing content down */}
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-sm">
            <h2 className="text-sm font-semibold">Quick tools</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {quickLinks.slice(0, 4).map((x) => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10"
                >
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

        {/* Below-the-fold grid (still high on the page) */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:bg-black/40"
            >
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
