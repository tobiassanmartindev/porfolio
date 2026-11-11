import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageCard } from "@/components/ImageCard";
import { MagneticButton } from "@/components/MagneticButton";
import { Nav } from "@/components/Nav";
import { projects, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

/** Screenshots are cropped from the top, where the useful part of a screen usually is. */
const TOP = "50% 0%";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: `${project.name} - Tobias Sanmartin`, description: project.lead } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects.find((p) => p.slug === project.next)!;
  const labels = site.caseLabels;

  return (
    <main className="case-page">
      <Nav caseStudy />

      <section className="case-section case-head">
        <div className="case-head-inner">
          <p className="t t-label">{project.meta}</p>
          <h1 className="t t-h1" style={{ width: "100%" }}>
            {project.name}
          </h1>
          <p className="t t-lead case-lead">{project.lead}</p>
          {project.live && (
            <div className="hero-magnetic">
              <MagneticButton label={labels.live} href={project.live} external />
            </div>
          )}
        </div>
      </section>

      <section className="case-section case-hero">
        <div className="case-hero-shot">
          <ImageCard src={project.image.src} alt={project.image.alt} radius={16} position={TOP} />
        </div>
      </section>

      <section className="case-section case-facts">
        <div className="facts-row">
          {project.facts.map((fact) => (
            <div key={fact.label} className="fact">
              <p className="t t-mono">{fact.label}</p>
              <h3 className="t t-h3" style={{ width: "100%" }}>
                {fact.value}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section case-story">
        <div className="story-row">
          <div className="story-block" data-reveal>
            <h2 className="t t-statement">{labels.brief}</h2>
            <p className="t t-lead">{project.brief}</p>
          </div>
          <div className="story-block" data-reveal>
            <h2 className="t t-statement">{labels.did}</h2>
            <p className="t t-lead">{project.did}</p>
          </div>
        </div>
      </section>

      {project.pair && (
        <section className="case-section case-pair">
          <div className="pair-row">
            <div className="pair-phone">
              <ImageCard src={project.pair.phone.src} alt={project.pair.phone.alt} radius={16} position={TOP} />
            </div>
            <div className="pair-detail">
              <ImageCard src={project.pair.detail.src} alt={project.pair.detail.alt} radius={16} position="0% 0%" />
            </div>
          </div>
        </section>
      )}

      <section className="case-section case-specs">
        <div className="specs-row">
          <div className="specs-block" data-reveal>
            <p className="t t-mono">{labels.features}</p>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature} className="t t-body">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="specs-block specs-stack" data-reveal>
            <p className="t t-mono">{labels.stack}</p>
            <ul className="stack-list">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  <span className="t t-stack">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="case-section case-gallery">
          <div className={`gallery-row${project.gallery.length === 1 ? " gallery-single" : ""}`}>
            {project.gallery.map((item) => (
              <div key={item.src} className="gallery-shot" style={{ aspectRatio: item.ratio ?? 1.6 }}>
                <ImageCard src={item.src} alt={item.alt} radius={16} position={TOP} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="case-section case-results">
        <div className="results-inner">
          <p className="t t-mono">{labels.results}</p>
          <div className="results-row" data-reveal>
            {project.results.map((result, i) => (
              <div key={result} className="result">
                <h2 className="t t-statement t-nowrap">{String(i + 1).padStart(2, "0")}</h2>
                <p className="t t-lead">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-quote">
        <div className="quote-inner" data-reveal>
          <p className="t t-mono">{labels.challenge}</p>
          <h2 className="t t-statement">{project.challenge}</h2>
        </div>
      </section>

      <section className="case-section case-next">
        <Link href={`/work/${next.slug}`} className="next-link">
          <p className="t t-mono">{site.footer.nextProject}</p>
          <h2 className="t t-display" style={{ width: "100%" }}>
            {`${next.name} →`}
          </h2>
        </Link>
      </section>

      <footer className="case-footer">
        <p className="t t-mono">{site.copyright}</p>
        <Link href="/" className="footer-home">
          <p className="t t-label">{site.footer.backToHome}</p>
        </Link>
      </footer>
    </main>
  );
}
