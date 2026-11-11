import Link from "next/link";
import { VoxelField } from "@/components/VoxelField";
import { site } from "@/content/site";

export default function NotFound() {
  const { eyebrow, title, body, cta } = site.notFound;
  return (
    <main className="nf">
      <div className="nf-field">
        <VoxelField />
      </div>
      <p className="t t-label nf-eyebrow">{eyebrow}</p>
      <h1 className="t t-h1 nf-title">{title}</h1>
      <p className="t t-lead nf-body">{body}</p>
      <Link href="/" className="btn btn-primary btn-fit" style={{ zIndex: 1 }}>
        <p className="t t-btn dark">{cta}</p>
      </Link>
    </main>
  );
}
