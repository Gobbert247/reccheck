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
        imageSrc="/images/mushrooms.jpg"
        actions={[
          { label: "Start interaction check", href: "/checker", variant: "primary" },
          { label: "View regional alerts", href: "/alerts", variant: "secondary" },
          { label: "Resources", href: "/resources", variant: "secondary" },
        ]}
      >
        <div className="mt-6 rc-card rc-card-hover p-5">
          <div className="rc-cardHeader">
            <h3 className="rc-cardTitle">Quick access</h3>
            <p className="rc-cardSub">
              Built for fast decisions on a phone. Clear layout, strong contrast, no fluff.
            </p>
          </div>
        </div>
      </PageHero>
      <div className="rc-container rc-page">
        <section className="rc-section">
          <h2 className="rc-h2">Core tools</h2>
          <p className="rc-muted">
            Practical, evidence-aligned features. Designed for clarity and trust.
          </p>
          <div className="rc-grid3" style={{ marginTop: "1rem" }}>
            <FeatureTile
              title="Interaction Checker"
              description="Identify risky combinations and compounding effects."
              href="/checker"
              imageSrc="/images/mushrooms.jpg"
              badge="Core"
            />
            <FeatureTile
              title="Regional Alerts"
              description="Verified alerts by region, built for fast scanning."
              href="/alerts"
              imageSrc="/images/mushrooms.jpg"
              badge="Verified"
            />
            <FeatureTile
              title="Identify"
              description="Neutral recognition cues and safer decision prompts."
              href="/identify"
              imageSrc="/images/mushrooms.jpg"
              badge="Guide"
            />
          </div>
        </section>
        <section className="rc-section">
          <h2 className="rc-h2">Support and safety</h2>
          <p className="rc-muted">
            Calm guidance, escalation advice, and pathways to help.
          </p>
          <div className="rc-grid3" style={{ marginTop: "1rem" }}>
            <FeatureTile
              title="First Aid"
              description="Clear steps for emergencies and when to call 000."
              href="/first-aid"
              imageSrc="/images/mushrooms.jpg"
              badge="Safety"
            />
            <FeatureTile
              title="Resources"
              description="Services, education, and public-health aligned information."
              href="/resources"
              imageSrc="/images/mushrooms.jpg"
              badge="Public Health"
            />
            <FeatureTile
              title="About"
              description="Design principles, scope, and clinical intent."
              href="/resources#about"
              imageSrc="/images/mushrooms.jpg"
              badge="Transparency"
            />
          </div>
        </section>
      </div>
    </Shell>
  );
}
