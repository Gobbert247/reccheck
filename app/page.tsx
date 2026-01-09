import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import FeatureTile from "@/components/FeatureTile";

export default function HomePage() {
  const TILE = {
    checker: "/images/tiles/magnifyingfocusonacapsule.png",
    alerts: "/images/tiles/warninginhandwithglowingpills.png",
    identify: "/images/tiles/drugtestingsetupwithcolorchart.png",
    firstAid: "/images/tiles/reachingforhealingessentials.png",
    resources: "/images/tiles/citymapandpartypreparations.png",
    risk: "/images/tiles/measuringmedicationriskandbalance.png",
  };

  return (
    <Shell>
      <PageHero
        eyebrow="RecCheck • Australia"
        title="Know what you're taking. Reduce risk. Help your mates."
        subtitle="Clear tools for interaction risk, verified alerts, first-aid escalation, and services — designed for real-world use."
        imageSrc=""
        actions={[
          { label: "Start a check", href: "/checker", variant: "primary" },
          { label: "View alerts", href: "/alerts", variant: "secondary" },
          { label: "First aid", href: "/first-aid", variant: "secondary" },
        ]}
      >
        <div className="mt-6 rc-card rc-card-hover p-5">
          <div className="rc-cardHeader">
            <h3 className="rc-cardTitle">Quick access</h3>
            <p className="rc-cardSub">
              Fast navigation, calm language, and practical harm-reduction guidance.
            </p>
          </div>
          <div className="mt-4 rc-grid2">
            <div className="rc-cardInner">
              <p className="rc-muted">
                Choose a tool. The checker is a risk-screen (not a diagnosis). Alerts must be source-linked and dated.
              </p>
              <div className="rc-divider" />
              <div className="flex flex-wrap gap-2">
                <a className="rc-btn rc-btn-secondary" href="/checker">Checker</a>
                <a className="rc-btn rc-btn-secondary" href="/alerts">Alerts</a>
                <a className="rc-btn rc-btn-secondary" href="/identify">Identify</a>
                <a className="rc-btn rc-btn-secondary" href="/resources">Resources</a>
              </div>
            </div>
            <div className="rc-cardInner">
              <p className="rc-muted" style={{ marginBottom: ".6rem" }}>
                Escalation:
              </p>
              <p className="rc-disclaimer">
                If someone is unconscious, seizing, overheating, or not breathing: call <strong>000</strong>.
              </p>
              <p className="mt-3 rc-muted">
                RecCheck supports safer decision-making and encourages timely help-seeking. It does not promote drug use.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <div className="rc-container rc-page">
        <section className="rc-section">
          <h2 className="rc-h2">Core tools</h2>
          <p className="rc-muted">Readable on mobile, credible in tone.</p>
          <div className="rc-grid3" style={{ marginTop: "1rem" }}>
            <FeatureTile
              title="Interaction Checker"
              description="Screen combinations for additive risks and common high-risk patterns."
              href="/checker"
              imageSrc={TILE.checker}
              badge="Core"
            />
            <FeatureTile
              title="Regional Alerts"
              description="Verified-only feed: source, date/time, region, and summary."
              href="/alerts"
              imageSrc={TILE.alerts}
              badge="Verified"
            />
            <FeatureTile
              title="Identify & Testing"
              description="Neutral guidance: uncertainty, red flags, and safer choices."
              href="/identify"
              imageSrc={TILE.identify}
              badge="Guide"
            />
          </div>
        </section>

        <section className="rc-section">
          <h2 className="rc-h2">Safety & support</h2>
          <p className="rc-muted">Escalation guidance and pathways to help.</p>
          <div className="rc-grid3" style={{ marginTop: "1rem" }}>
            <FeatureTile
              title="First Aid"
              description="Clear steps for emergencies and when to call 000."
              href="/first-aid"
              imageSrc={TILE.firstAid}
              badge="Safety"
            />
            <FeatureTile
              title="Resources"
              description="Services, education, and public-health aligned information."
              href="/resources"
              imageSrc={TILE.resources}
              badge="Public health"
            />
            <FeatureTile
              title="Risk Calculator"
              description="Dose, purity, and context: how risk changes in the real world."
              href="/checker"
              imageSrc={TILE.risk}
              badge="Context"
            />
          </div>
        </section>

        <section className="rc-section">
          <div className="rc-divider" />
          <p className="rc-disclaimer">
            RecCheck supports safer decision-making and encourages timely help-seeking. It does not promote drug use.
          </p>
        </section>
      </div>
    </Shell>
  );
}
