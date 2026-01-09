import Image from "next/image";
import Link from "next/link";
import React from "react";

type Action =
  | { label: string; href: string; variant?: "primary" | "secondary" }
  | React.ReactNode;

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  imageSrc,
  imageAlt = "",
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  imageSrc: string;
  imageAlt?: string;
  actions?: Action[];
  children?: React.ReactNode;
}) {
  return (
    <section className="rc-hero">
      <div className="rc-heroMedia" aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="rc-heroImg"
          sizes="100vw"
        />
        <div className="rc-heroScrim" />
        <div className="rc-heroGlow" />
      </div>

      <div className="rc-container rc-heroContent">
        <div className="rc-heroInner">
          {eyebrow ? <p className="rc-eyebrow">{eyebrow}</p> : null}
          <h1 className="rc-heroTitle">{title}</h1>
          {subtitle ? <p className="rc-heroSubtitle">{subtitle}</p> : null}

          {actions?.length ? (
            <div className="rc-heroActions">
              {actions.map((a, idx) => {
                if (React.isValidElement(a)) return <div key={idx}>{a}</div>;
                const cls =
                  (a.variant ?? "secondary") === "primary"
                    ? "rc-btn rc-btn-primary"
                    : "rc-btn rc-btn-secondary";
                return (
                  <Link key={idx} href={a.href} className={cls}>
                    {a.label}
                  </Link>
                );
              })}
            </div>
          ) : null}

          {children ? <div className="rc-heroExtra">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
