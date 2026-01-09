import Image from "next/image";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import FeatureTile from "@/components/FeatureTile";

export default function HomePage() {
  return (
    <Shell>
      <PageHero
        eyebrow="RecCheck • Australia"
        title="Clinical harm reduction tools, built for real-world use."
        subtitle="Check interactions, view verified alerts, and access practical resources — written in a calm, public-health tone."
        imageSrc="/images/molecule.jpg"
        actions={[
          { label: "Start interaction check", href: "/checker", variant: "primary" },
          { label: "View regional alerts", href: "/alerts", variant: "secondary" },
          { label: "Resources", href: "/resources", variant: "secondary" },
        ]}
      >
        <div className="mt-6 rc-card rc-card-hover p-5">
          <div className="rc-cardHeader">
            <h3 className="rc-cardTitle">Designed for mobile</h3>
            <p className="rc-cardSub">Readable, fast, and neutral — no fear-based messaging.</p>
          </div>
          <div className="mt-4 relative aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src="/images/phone-mockup.png"
              alt="RecCheck preview"
              fill
              priority
              className="object-cover opacity-95"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(420px 320px at 30% 18%, rgba(160, 90, 255, 0.20), transparent 60%), radial-gradient(460px 360px at 70% 22%, rgba(34, 211, 238, 0.12), transparent 60%)",
                mixBlendMode: "screen",
                opacity: 0.9,
              }}
            />
          </div>
          <p className="mt-4 rc-disclaimer">
            If someone is unconscious, seizing, or not breathing: call <strong>000</strong>.
            <Link href="/first-aid" className="rc-link">
              First aid guidance →
            </Link>
          </p>
        </div>
      </PageHero>

      <div className="rc-container rc-page">
        <section className="rc-section">
          <h2 className="rc-h2">Core tools</h2>
          <p className="rc-muted">Practical, evidence-aligned features. Designed for clarity and trust.</p>
          <div className="rc-grid3" style={{ marginTop: "1rem" }}>
            <FeatureTile
              title="Interaction Checker"
              description="Identify risky combinations and compounding effects."
              href="/checker"
              imageSrc="/images/molecule.jpg"
              badge="Core"
            />
            <FeatureTile
              title="Regional Alerts"
              description="Verified alerts by region, built for fast scanning."
              href="/alerts"
              imageSrc="/images/vials.jpg"
              badge="Verified"
            />
            <FeatureTile
              title="Identify"
              description="Neutral recognition cues and safer decision prompts."
              href="/identify"
              imageSrc="/images/smoke.jpg"
              badge="Guide"
            />
          </div>
        </section>

        <section className="rc-section">
          <h2 className="rc-h2">Support and safety</h2>
          <p className="rc-muted">Calm guidance, escalation advice, and pathways to help.</p>
          <div className="rc-grid3" style={{ marginTop: "1rem" }}>
            <FeatureTile
              title="First Aid"
              description="Clear steps for emergencies and when to call 000."
              href="/first-aid"
              imageSrc="/images/candles.jpg"
              badge="Safety"
            />
            <FeatureTile
              title="Resources"
              description="Services, education, and public-health aligned information."
              href="/resources"
              imageSrc="/images/chains.jpg"
              badge="Public health"
            />
            <FeatureTile
              title="About"
              description="Design principles, scope, and clinical intent."
              href="/resources#about"
              imageSrc="/images/molecule.jpg"
              badge="Transparency"
            />
          </div>
        </section>
      </div>
    </Shell>
  );
}
