import Shell from "@/components/Shell";
import Link from "next/link";

const tools = [
  {
    href: "/checker",
    title: "Interaction Checker",
    desc: "Check risky combos and red flags.",
  },
  {
    href: "/alerts",
    title: "Regional Alerts",
    desc: "Verified-only drug checking alerts.",
  },
  {
    href: "/firstaid",
    title: "First Aid",
    desc: "What to do if things go wrong.",
  },
  {
    href: "/identify",
    title: "Identify",
    desc: "Pill / powder / effect clues (harm reduction).",
  },
  {
    href: "/support",
    title: "Support",
    desc: "Counselling, services, and help.",
  },
  {
    href: "/events",
    title: "Community & Events",
    desc: "Harm reduction services near you.",
  },
];

export default function HomePage() {
  return (
    <Shell>
      <div className="rc-section">
        <h1 className="rc-h1">Know what you’re taking. Reduce risk. Help your mates.</h1>
        <p className="rc-lead mt-4">
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
      </div>

      <div className="rc-section">
        <h2 className="text-lg font-semibold">Quick tools</h2>
        <div className="rc-grid mt-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rc-card rc-card-hover p-4"
            >
              <div className="text-base font-semibold">{tool.title}</div>
              <div className="mt-1 text-sm text-zinc-300">{tool.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
