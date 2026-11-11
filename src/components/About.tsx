import Link from "next/link";
import { projects, site } from "@/content/site";
import { BreakEngine } from "./BreakEngine";
import { BreakableMonogram } from "./BreakableMonogram";
import { DragTile } from "./DragTile";
import { TechLogo } from "./TechIcon";

/** "About me" bento: who I am, numbers, what I do today, stack, services and projects. */
export function About() {
  const { label, title, lead, leadName, leadRest, body, location, stats, today, stack, services, projectsTitle, projectsIntro, breakable, breakCursor } = site.about;
  return (
    <section id="sobre-mi" className="about">
      <BreakEngine selector="#sobre-mi" cards=".about-card:not(.about-orbit)" floorOf=".about-grid" headOf=".about-head" />
      <div className="about-head" data-reveal>
        <p className="t t-label about-label" data-scramble data-cursor={breakCursor} data-cursor-big>
          {label}
        </p>
        <h2 className="t t-display about-title" data-cursor={breakCursor} data-cursor-big>
          {title.map((part) => (
            <span key={part.text} className={part.accent ? "about-accent" : undefined}>
              {part.text}
            </span>
          ))}
        </h2>
      </div>

      <div className="about-grid" data-spotlight data-cursor={breakCursor} data-cursor-big>
        <div className="about-card about-intro" data-reveal>
          <p className="t t-lead">
            {lead}
            <strong>{leadName}</strong>
            {leadRest}
          </p>
          <p className="t t-body">{body}</p>
          <div className="availability about-location">
            <i />
            <p className="t t-mono">{location}</p>
          </div>
        </div>

        <div className="about-card about-stats" data-reveal>
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat">
              <p className="t t-statement about-accent">{stat.value}</p>
              <p className="t t-mono">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="about-card about-orbit" data-reveal>
          <div className="about-ring about-ring-1" aria-hidden><i /></div>
          <div className="about-ring about-ring-2" aria-hidden><i /></div>
          <div className="about-ring about-ring-3" aria-hidden><i /></div>
          <BreakableMonogram copy={breakable} />
        </div>

        <div className="about-card about-today" data-reveal>
          <p className="t t-mono">{today.label}</p>
          <div className="about-roles">
            {today.roles.map((role) => (
              <a key={role.name} href={role.href} target="_blank" rel="noopener" className="about-role">
                <div className={`about-tile${role.logo ? (role.wordmark ? " about-tile-wordmark" : " about-tile-img") : ""}`}>
                  {role.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={role.logo} alt={`Logo de ${role.name}`} loading="lazy" decoding="async" />
                  ) : (
                    <p className="t t-label">{role.name[0]}</p>
                  )}
                </div>
                <div className="about-role-text">
                  <div className="about-role-head">
                    <h3 className="t t-h3">
                      {role.name} <span aria-hidden className="about-role-arrow">↗</span>
                    </h3>
                    <p className="t t-mono">{role.role}</p>
                  </div>
                  <p className="t t-body">{role.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="about-card about-stack" data-reveal>
          <p className="t t-mono">{stack.label}</p>
          <div className="about-stack-grid">
            {stack.items.map((item) => (
              <div key={item.name} className="about-tech">
                <DragTile cursor={stack.cursor}>
                  <TechLogo tech={item.tech} className="about-tech-icon" />
                </DragTile>
                <p className="t t-mono">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-card about-services" data-reveal>
          {services.map((service, i) => (
            <div key={service.title} className="about-service">
              <p className="t t-label about-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t t-h3">{service.title}</h3>
              <p className="t t-body">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="about-card about-projects" data-reveal>
          <p className="t t-label about-accent">{String(services.length + 1).padStart(2, "0")}</p>
          <h3 className="t t-h3">{projectsTitle}</h3>
          <p className="t t-body">{projectsIntro}</p>
          <div className="about-links">
            {projects.slice(0, 3).map((project) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="about-link">
                <p className="t t-btn">{project.name}</p>
                <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
