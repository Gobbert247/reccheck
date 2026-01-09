import Shell from "@/components/Shell";import PageHero from "@/components/PageHero";

export default function ResourcesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Resources"
        title="Public-health aligned information and pathways to support."
        subtitle="Sources, disclaimers, and service links — designed for trust and governance."
        imageSrc="/images/chains.jpg"
        actions={[
          { label: "Regional alerts", href: "/alerts", variant: "secondary" },
          { label: "First aid", href: "/firstaid", variant: "secondary" },
        ]}
      />
      <div className="rc-container rc-page">
        <div id="about" className="rc-card rc-card-hover p-6">
          <h3 className="rc-h3">About RecCheck</h3>
          <p className="rc-muted">RecCheck supports safer decision-making and encourages timely help-seeking. It does not promote drug use.</p>
          <div className="rc-divider" />
          <div className="rc-grid2">
            <div className="rc-cardInner">
              <h4 className="rc-h4">Clinical approach</h4>
              <p className="rc-muted">Neutral tone, clear risk framing, and escalation advice. Designed for accessibility and quick comprehension.</p>
            </div>
            <div className="rc-cardInner">
              <h4 className="rc-h4">Governance & sourcing</h4>
              <p className="rc-muted">Publish alerts only with credible attribution. Show timestamps and sources clearly.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
