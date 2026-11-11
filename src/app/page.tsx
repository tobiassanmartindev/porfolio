import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { HeroName } from "@/components/HeroName";
import { Loader } from "@/components/Loader";
import { MagneticButton } from "@/components/MagneticButton";
import { Nav } from "@/components/Nav";
import { OrbitGallery } from "@/components/OrbitGallery";
import { TechIcon } from "@/components/TechIcon";
import { VoxelField } from "@/components/VoxelField";
import { ContactCard, ContactCta } from "@/components/ContactLinks";
import { experience, site } from "@/content/site";

export default function Home() {
  const { hero, orbit, experience: experienceHead, faq, contact } = site;
  const toContact = "/#contacto";
  return (
    <main className="page fonts-home">
      <Nav />

      <section id="top" className="hero" data-cursor={hero.cursorField}>
        <div className="hero-field">
          <VoxelField />
        </div>
        <div className="hero-content">
          <div className="hero-headline">
            <HeroName name={hero.name} cursor={hero.cursorName} />
            <p className="t t-label hero-role">{hero.role}</p>
            <p className="t t-lead">{hero.tagline}</p>
          </div>
          <div className="hero-actions">
            <div className="hero-magnetic">
              <MagneticButton label={hero.primary} href={toContact} />
            </div>
            <a href="/#proyectos" className="btn btn-ghost btn-fit btn-responsive">
              <p className="t t-btn">{hero.secondary}</p>
            </a>
          </div>
        </div>
        <div className="hero-aside hide-phone">
          <p className="t t-lead">{hero.aside}</p>
          <div className="availability">
            <i />
            <p className="t t-mono">{hero.availability}</p>
          </div>
        </div>
        <p className="t t-mono scroll-cue hide-phone">{hero.scroll}</p>
      </section>

      <About />

      <section id="proyectos" className="projects">
        <div className="section-head" data-reveal>
          <p className="t t-label" data-scramble>{orbit.label}</p>
          <h2 className="t t-display section-title">
            {orbit.heading.map((part) => (
              <span key={part.text} className={part.accent ? "about-accent" : undefined}>
                {part.text}
              </span>
            ))}
          </h2>
        </div>
        <div className="stage-orbit">
          <OrbitGallery />
        </div>
      </section>

      <section id="experiencia" className="experience">
        <div className="experience-head" data-reveal>
          <p className="t t-label experience-label" data-scramble>{experienceHead.label}</p>
          <div className="experience-intro">
            <h2 className="t t-statement">{experienceHead.intro}</h2>
          </div>
        </div>
        <div className="xp-list">
          <div className="divider" />
          {experience.map((job) => (
            <div key={job.company} style={{ display: "contents" }}>
              <article className="xp" data-reveal>
                <div className="xp-meta">
                  <h3 className="t t-h3">{job.company}</h3>
                  <div className="xp-role-row">
                    <p className="t t-label xp-role">{job.role}</p>
                    <p className="t t-mono">{job.period}</p>
                  </div>
                  <p className="t t-body">{job.description}</p>
                  <div className="tags">
                    {job.tech.map((tech) => (
                      <TechIcon key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
                <div className={`xp-logo${job.logo ? (job.wordmark ? " xp-logo-wordmark" : " xp-logo-img") : job.badge ? " xp-logo-badge" : ""}`}>
                  {job.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={job.logo} alt={`Logo de ${job.company}`} loading="lazy" decoding="async" />
                  ) : job.badge ? (
                    <span aria-hidden className="t t-mono xp-badge">
                      {job.badge}
                    </span>
                  ) : (
                    <span aria-hidden className="xp-initial">
                      {job.company[0]}
                    </span>
                  )}
                </div>
              </article>
              <div className="divider" />
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq">
        <div className="faq-row">
          <div className="faq-intro" data-reveal>
            <p className="t t-label" data-scramble>{faq.label}</p>
            <h2 className="t t-display" style={{ width: "100%" }}>
              {faq.title}
            </h2>
            <p className="t t-lead faq-sub">{faq.sub}</p>
            <div className="hero-magnetic">
              <MagneticButton label={faq.cta} href={toContact} />
            </div>
          </div>
          <div className="faq-list" data-reveal>
            <div className="divider" />
            {faq.items.map((item) => (
              <div key={item.q} style={{ display: "contents" }}>
                <div className="faq-item">
                  <h3 className="t t-h3">{item.q}</h3>
                  <p className="t t-body">{item.a}</p>
                </div>
                <div className="divider" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="contact-row">
          <div className="contact-intro" data-reveal>
            <p className="t t-label" data-scramble>{contact.label}</p>
            <h2 className="t t-display" style={{ width: "100%" }}>
              {contact.title}
            </h2>
            <p className="t t-lead faq-sub">{contact.sub}</p>
            <ContactCta />
          </div>
          <ContactCard />
        </div>
      </section>

      <Footer />
      <Loader />
    </main>
  );
}
