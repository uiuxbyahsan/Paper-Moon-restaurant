import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { SPACES } from "@/lib/content";

export function Spaces() {
  return (
    <section id="spaces" className="scroll-mt-24 bg-black py-24 sm:py-32">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>The Experience</Eyebrow>
          <h2 className="mt-3 text-4xl sm:text-5xl">Our Spaces, One Story</h2>
          <p className="mt-4 text-cream/60">
            From sunlit brunches to candlelit dinners and late-night conversations, every space at Paper Moon is designed to shape a different kind of moment.
          </p>
        </Reveal>

        <Stagger gap={0.12} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPACES.map((space) => (
            <StaggerItem key={space.name}>
              <article className="group relative h-[clamp(380px,46vw,520px)] overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-serif text-3xl text-cream">{space.name}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream/75 transition-all duration-500 ease-out sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    {space.caption}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
