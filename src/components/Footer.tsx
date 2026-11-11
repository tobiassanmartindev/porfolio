import { site } from "@/content/site";
import { BreakGame } from "./BreakGame";
import { PixelWordmark } from "./PixelWordmark";

/** Dot wordmark, link columns and the bottom bar. */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wordmark-slot">
        <div className="wordmark">
          <PixelWordmark text={site.wordmark} />
        </div>
      </div>
      <div className="divider" />
      <div className="footer-cols" data-reveal>
        <div className="footer-col">
          <p className="t t-mono">{site.footer.navigateTitle}</p>
          {site.nav.links.map((link) => (
            <a key={link.href} href={link.href} className="footer-link">
              <p className="t t-btn">{link.label}</p>
            </a>
          ))}
        </div>
        <div className="footer-spacer" />
        <div className="footer-col">
          <p className="t t-mono">{site.footer.followTitle}</p>
          {site.footer.follow.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener" className="footer-link">
              <p className="t t-btn">{link.label}</p>
            </a>
          ))}
        </div>
        <BreakGame copy={site.footer.game} />
      </div>
      <div className="divider" />
      <div className="footer-bottom">
        <p className="t t-mono">{site.copyright}</p>
        <a href="/#top" className="footer-link">
          <p className="t t-label">{site.footer.backToTop}</p>
        </a>
      </div>
    </footer>
  );
}
