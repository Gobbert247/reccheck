import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";

export default function CheckerPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Interaction Checker"
        title="Check combinations with a clinical lens."
        subtitle="Identify additive risks (sedation, serotonin toxicity, cardiovascular strain) and make safer choices."
        imageSrc="/images/molecule.jpg"
        actions={[
          { label: "View alerts", href: "/alerts", variant: "secondary" },
          { label: "First aid", href: "/first-aid", variant: "secondary" },
        ]}
      />
      <div className="rc-container rc-page">
        <div className="rc-card rc-card-hover p-6">
          <h3 className="rc-h3">Checker</h3>
          <p className="rc-muted">Render your existing checker UI here (client component). This wrapper is the new styling.</p>
          <div className="rc-divider" />
          <div className="rc-placeholder">
            <h4 className="rc-placeholderTitle">TODO: Insert existing checker component</h4>
            <p className="rc-placeholderText">Replace this box with your current checker form/output.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
