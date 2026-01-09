import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";

export default function AlertsPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Regional Alerts"
        title="Verified alerts, built for fast scanning."
        subtitle="Only publish items attributable to credible sources. Show last-updated clearly."
        imageSrc="/images/vials.jpg"
        actions={[
          { label: "Interaction checker", href: "/checker", variant: "primary" },
          { label: "Resources", href: "/resources", variant: "secondary" },
        ]}
      />
      <div className="rc-container rc-page">
        <div className="rc-card rc-card-hover p-6">
          <h3 className="rc-h3">Recent alerts</h3>
          <p className="rc-muted">Each alert should include: source, date, region, and a short harm-reduction summary.</p>
          <div className="rc-divider" />
          <div className="rc-placeholder">
            <h4 className="rc-placeholderTitle">TODO: Render verified alerts feed</h4>
            <p className="rc-placeholderText">Remove any "seeded example alerts" copy and only show verified items.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
