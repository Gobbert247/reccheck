import Image from "next/image";
import Link from "next/link";
// If you already wrap with <Shell>, keep it. If not, keep your wrapper and paste the inner content.
import Shell from "@/components/Shell";

type Feature = {
  title: string;
  desc: string;
  href: string;
  imgSrc: string;
};

function FeatureTile({ title, desc, href, imgSrc }: Feature) {
  return (
    <Link href={href} className="rc-card rc-card-hover flex items-center gap-4 p-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <Image src={imgSrc} alt="" fill className="object-cover" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-zinc-100">{title}</div>
        <div className="mt-1 text-sm text-zinc-300">{desc}</div>
      </div>
      <div className="ml-auto hidden text-zinc-400 md:block">→</div>
    </Link>
  );
}

export default function Home() {
  return (
    <Shell>
      {/* HERO */}
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* LEFT: Brand + value prop */}
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/images/reccheck-logo.png"
              alt="RecCheck"
              width={84}
              height={84}
              priority
              className="rounded-2xl"
            />
            <div>
              <div className="text-3xl font-semibold tracking-tight text-zinc-100">
                RecCheck
              </div>
              <div className="text-sm text-zinc-400">
                harm reduction • Australia
              </div>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
            Know what you're taking.
            <span className="block text-zinc-300">
              Reduce risk. Help your mates.
            </span>
          </h1>

          <div className="mt-4 h-px w-44 bg-gradient-to-r from-purple-400/40 via-cyan-300/30 to-transparent" />

          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-zinc-300">
            Check interactions, view verified alerts, and find services and events — built for real-world use, not judgement.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/checker"
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Start a check
            </Link>
            <Link
              href="/alerts"
              className="rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              View alerts
            </Link>
            <Link
              href="/events"
              className="rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Find services & events
            </Link>
          </div>

          {/* Feature tiles */}
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <FeatureTile
              title="Interaction Checker"
              desc="Combinations and red flags."
              href="/checker"
              imgSrc="/images/tiles/A_flat-design_digital_mockup_of_a_web_application.png"
            />
            <FeatureTile
              title="Regional Alerts"
              desc="Verified updates and warnings."
              href="/alerts"
              imgSrc="/images/tiles/A_digital_screenshot_displays_a_mobile_app_interfa.png"
            />
            <FeatureTile
              title="Identify"
              desc="Safer recognition and risk cues."
              href="/identify"
              imgSrc="/images/tiles/A_black_and_white_vector_icon_features_a_circular_.png"
            />
          </div>
        </div>

        {/* RIGHT: Hero visual panel */}
        <div className="rc-card rc-card-hover relative overflow-hidden p-6">
          {/* Background image */}
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/images/hero/A_website_homepage_for_RecCheck,_a_mobile_applicat.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Gradient glaze */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(700px 420px at 18% 20%, rgba(160, 90, 255, 0.22), transparent 62%), radial-gradient(700px 460px at 82% 22%, rgba(0, 210, 255, 0.16), transparent 62%)",
              opacity: 0.9,
              mixBlendMode: "screen",
            }}
          />

          {/* Content */}
          <div className="relative">
            <div className="text-sm font-semibold text-zinc-100">
              Quick access
            </div>
            <p className="mt-2 text-sm text-zinc-300 max-w-[55ch]">
              Built for fast decisions on a phone. Clear layout, strong contrast, no fluff.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/checker"
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/icons/rc-icon-checker.png"
                    alt=""
                    width={24}
                    height={24}
                    priority
                    className="opacity-80"
                  />
                  <div className="text-sm font-semibold text-zinc-100">
                    Checker
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-300">
                  Add substances and see risks.
                </p>
              </Link>

              <Link
                href="/alerts"
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/icons/rc-icon-warning.png"
                    alt=""
                    width={24}
                    height={24}
                    priority
                    className="opacity-80"
                  />
                  <div className="text-sm font-semibold text-zinc-100">
                    Alerts
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-300">
                  Verified, recent, local.
                </p>
              </Link>

              <Link
                href="/events"
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/icons/rc-icon-pin.png"
                    alt=""
                    width={24}
                    height={24}
                    priority
                    className="opacity-80"
                  />
                  <div className="text-sm font-semibold text-zinc-100">
                    Events
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-300">
                  Services and harm reduction.
                </p>
              </Link>

              <Link
                href="/firstaid"
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/icons/rc-icon-warning.png"
                    alt=""
                    width={24}
                    height={24}
                    priority
                    className="opacity-80"
                  />
                  <div className="text-sm font-semibold text-zinc-100">
                    First aid
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-300">
                  What to do right now.
                </p>
              </Link>
            </div>

            <p className="mt-6 text-xs text-zinc-400">
              Not medical advice. If someone is unconscious, seizing, or not breathing: call 000.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
