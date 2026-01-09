import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";

export default function IdentifyPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Identify"
        title="Recognise warning signs and reduce harm."
        subtitle="Neutral language. Practical cues, uncertainty, and when to avoid mixing or seek help."
        imageSrc="/images/smoke.jpg"
        actions={[
          { label: "Interaction checker", href: "/checker", variant: "primary" },
          { label: "First aid", href: "/first-aid", variant: "secondary" },
        ]}
      />
      <div className="rc-container rc-page">
        <div className="rc-card rc-card-hover p-6">
          <h3 className="rc-h3">Guidance</h3>
          <p className="rc-muted">Structure this into short cards: cues, risks, safer steps, when to get help.</p>
          <div className="rc-divider" />
          <div className="rc-placeholder">
            <h4 className="rc-placeholderTitle">TODO: Add Identify content blocks</h4>
            <p className="rc-placeholderText">Keep it public-health tone. Avoid explicit imagery.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
