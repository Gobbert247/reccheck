// components/PageHeader.tsx
export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="rc-card relative overflow-hidden p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(520px 320px at 15% 20%, rgba(160, 90, 255, 0.16), transparent 60%), radial-gradient(520px 340px at 85% 20%, rgba(0, 210, 255, 0.12), transparent 60%), url("/images/backgrounds/rc-paraphernalia-overlay-1920x1080.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen"
        }}
      />
      <div className="relative">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">{title}</h1>
        <div className="mt-3 h-px w-40 bg-gradient-to-r from-purple-400/40 via-cyan-300/30 to-transparent" />
        {subtitle && <p className="mt-4 text-sm text-zinc-300 max-w-[65ch]">{subtitle}</p>}
      </div>
    </div>
  );
}
