import Image from "next/image";
import Link from "next/link";

export default function FeatureTile({
  title,
  description,
  href,
  imageSrc,
  imageAlt = "",
  badge,
}: {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  badge?: string;
}) {
  return (
    <Link href={href} className="rc-tile">
      <div className="rc-tileMedia" aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="rc-tileImg"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="rc-tileScrim" />
      </div>

      <div className="rc-tileBody">
        <div className="rc-tileTop">
          <h3 className="rc-tileTitle">{title}</h3>
          {badge ? <span className="rc-badge">{badge}</span> : null}
        </div>
        <p className="rc-tileDesc">{description}</p>
        <div className="rc-tileArrow" aria-hidden="true">→</div>
      </div>
    </Link>
  );
}
