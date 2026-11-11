"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { site } from "@/content/site";

const ICONS = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
} as const;

function LinkIcon({ kind }: { kind: "linkedin" | "github" | "cv" }) {
  if (kind === "cv") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z" strokeLinejoin="round" />
        <path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d={ICONS[kind]} />
    </svg>
  );
}

/** Local time in Buenos Aires, refreshed every 30 s. Empty on the server so the markup matches on hydration. */
function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-AR", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

/** Meeting button plus the email with a copy button. */
export function ContactCta() {
  const { contact, email } = site;
  const [copied, setCopied] = useState(false);

  const meeting = `mailto:${email}?subject=${encodeURIComponent(contact.meeting.subject)}&body=${encodeURIComponent(contact.meeting.body)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers or insecure origins: select-and-copy fallback.
      const field = document.createElement("textarea");
      field.value = email;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="contact-cta">
      <div className="hero-magnetic">
        <MagneticButton label={contact.meeting.label} href={meeting} />
      </div>
      <div className="contact-mail">
        <span className="t t-mono contact-mail-address">{email}</span>
        <button type="button" className="contact-copy" onClick={copy} data-copied={copied || undefined} aria-label={copied ? contact.copied : `${contact.copy} ${email}`}>
          <span className="contact-copy-icon" aria-hidden>
            {copied ? (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5" />
              </svg>
            )}
          </span>
          <span className="t t-mono">{copied ? contact.copied : contact.copy}</span>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? contact.copied : ""}
        </span>
      </div>
    </div>
  );
}

/** Card with availability, local time and the social / CV links. */
export function ContactCard() {
  const { contact } = site;
  const time = useLocalTime(contact.timeZone);

  return (
    <div className="contact-card" data-reveal>
      <div className="contact-card-head">
        <span className="contact-status">
          <span className="contact-dot" aria-hidden />
          <span className="t t-mono">{contact.status}</span>
        </span>
        <span className="t t-mono contact-clock">{time ? `${contact.city} · ${time}` : contact.city}</span>
      </div>
      {contact.links.map((link, i) => {
        const pending = !link.href;
        const download = link.kind === "cv";
        const inner = (
          <>
            <span className="t t-mono contact-link-index" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="contact-link-icon">
              <LinkIcon kind={link.kind} />
            </span>
            <span className="contact-link-text">
              <span className="t t-h3 contact-link-name">{link.label}</span>
              <span className="t t-mono contact-link-handle">{pending ? contact.cvPending : link.handle}</span>
            </span>
            <span className="contact-link-arrow" aria-hidden>
              {download ? (
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 2.5v10M3.5 8 8 12.5 12.5 8" strokeLinecap="square" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4.5 11.5l7-7M5.5 4.5h6v6" strokeLinecap="square" />
                </svg>
              )}
            </span>
          </>
        );
        return pending ? (
          <div key={link.label} className="contact-link" aria-disabled="true">
            {inner}
          </div>
        ) : (
          <a key={link.label} className="contact-link" href={link.href} {...(download ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}>
            {inner}
          </a>
        );
      })}
    </div>
  );
}
