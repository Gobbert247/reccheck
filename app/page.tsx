import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import FeatureTile from "@/components/FeatureTile";
import Link from "next/link";

export default function HomePage() {
  // HERO: balance scale with pills (exists in /images/tiles/)

  // Tiles: use EXACT filenames from /cpp/public/images/tiles/
  const TILE = {
    checker: "/images/tiles/magnifyingfocusonacapsule.png",
    alerts: "/images/tiles/warninginhandwithglowingpills.png",
    identify: "/images/tiles/drugtestingsetupwithcolorchart.png",
    firstaid: "/images/tiles/reachingforhealingessentials.png",
    resources: "/images/tiles/citymapandpartypreparations.png",
    risk: "/images/tiles/measuringmedicationriskandbalance.png",
  };

  return (
    <Shell>
      <PageHero
        eyebrow="RecCheck • Australia"
        title="Know what you're taking. Reduce risk. Help your mates."
        subtitle="Clear tools for interaction risk, verified alerts, first-aid escalation, and services — designed for real-world use."
        actions={[
          { label: "Start a check", href: "/checker", variant: "primary" },
          { label: "View alerts", href: "/alerts", variant: "secondary" },
          { label: "First aid", href: "/firstaid", variant: "secondary" },
        ]}
      >
        <div className="mt-6 rc-card rc-card-hover p-5">
          <div className="rc-cardHeader">
            <h2 className="rc-cardTitle">Quick access</h2>
            <p className="rc-cardSub">
              Fast navigation, calm language, and practical harm-reduction guidance.
            </p>
          </div>
          <div className="mt-4 rc-grid2">
            <div className="rc-cardInner">
              <p className="rc-muted">
                Choose a tool. The checker is a risk-screen (not a diagnosis).
                Alerts should be date-stamped and source-linked.
              </p>
              <div className="rc-divider" />
              <div className="flex flex-wrap gap-2">
                <Link className="rc-btn rc-btn-secondary" href="/checker">Checker</Link>
                <Link className="rc-btn rc-btn-secondary" href="/alerts">Alerts</Link>
                <Link className="rc-btn rc-btn-secondary" href="/identify">Identify</Link>
                <Link className="rc-btn rc-btn-secondary" href="/resources">Resources</Link>
              </div>
            </div>
            <div className="rc-cardInner">
              <p className="rc-muted" style={{ marginBottom: ".6rem" }}>
                Escalation:
              </p>
              <p className="rc-disclaimer">
                If someone is unconscious, seizing, overheating, or not breathing:
                call <strong>000</strong>.
              </p>
              <p className="mt-3 rc-muted">
                RecCheck supports safer decision-making and encourages timely
                help-seeking. It does not promote drug use.
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <div className="rc-container rc-page">
        <div className="rc-section">
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
        </div>

        <div className="rc-section">
          <h2 className="rc-h2">Safety & support</h2>
          <p className="rc-muted">Escalation guidance and pathways to help.</p>
          <div className="rc-grid3" style={{ marginTop: "1rem" }}>
            <FeatureTile
              title="First Aid"
              description="Clear steps for emergencies and when to call 000."
              href="/firstaid"
              imageSrc={TILE.firstaid}
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
              title="Risk Estimator"
              description="Dose, purity, and context: how risk changes in real settings."
              href="/risk-estimator"
              imageSrc={TILE.risk}
              badge="Context"
            />
          </div>
        </div>

        <div className="rc-section">
          <div className="rc-divider" />
          <p className="rc-disclaimer">
            RecCheck supports safer decision-making and encourages timely
            help-seeking. It does not promote drug use.
          </p>
        </div>
      </div>
    </Shell>
  );
}
