import type { Metadata } from "next";
import { CursorBlock } from "@/components/CursorBlock";
import { MicroEffects } from "@/components/MicroEffects";
import { RevealEngine } from "@/components/RevealEngine";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: { icon: "/favicon.png" },
  openGraph: { title: site.title, description: site.description, images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <RevealEngine />
        <MicroEffects awayTitle={site.awayTitle} />
        <WhatsAppButton />
        <CursorBlock />
      </body>
    </html>
  );
}
