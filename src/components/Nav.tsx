import Link from "next/link";
import { site } from "@/content/site";
import { NavMenu } from "./NavMenu";
import { TaglineSlot } from "./TaglineSlot";

/** Floating nav pill. Home shows the typewriter; case studies show a static label. */
export function Nav({ caseStudy = false }: { caseStudy?: boolean }) {
  return (
    <div className="nav">
      <Link href="/" className="nav-brand">
        <p className="t t-label">{site.brand}</p>
      </Link>
      {caseStudy ? <p className="t t-mono">{site.footer.caseStudy}</p> : <TaglineSlot />}
      <NavMenu homeFonts={!caseStudy} />
    </div>
  );
}
