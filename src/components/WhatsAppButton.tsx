import { siWhatsapp } from "simple-icons";
import { site } from "@/content/site";

/** Botón flotante abajo a la derecha, con la paleta del sitio en lugar del verde de WhatsApp. */
export function WhatsAppButton() {
  const { number, label, message } = site.whatsapp;
  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener"
      className="wa-float"
      aria-label={label}
      data-cursor="WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
        <path d={siWhatsapp.path} />
      </svg>
      <span className="wa-float-label t t-mono">{label}</span>
    </a>
  );
}
