import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";

export default function FirstAidPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="First Aid"
        title="Clear actions. Calm language."
        subtitle="Prioritise airway/breathing/circulation, calling 000, and staying with the person."
        imageSrc="/images/candles.jpg"
        actions={[
          { label: "Interaction checker", href: "/checker", variant: "primary" },
          { label: "Resources", href: "/resources", variant: "secondary" },
        ]}
      />
      <div className="rc-container rc-page">
        <div className="rc-card rc-card-hover p-6">
          <h3 className="rc-h3">Emergency guidance</h3>
          <p className="rc-muted">Keep this page scannable: short headings + bullet steps + clear 000 triggers.</p>
          <div className="rc-divider" />
          <div className="rc-placeholder">
            <h4 className="rc-placeholderTitle">TODO: Insert first-aid modules</h4>
            <p className="rc-placeholderText">Add overdose response, overheating, seizures, and recovery position.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
