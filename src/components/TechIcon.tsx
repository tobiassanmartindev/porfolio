import {
  siCypress,
  siDocker,
  siFigma,
  siGit,
  siGraphql,
  siMongodb,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siStorybook,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
  siVuedotjs,
} from "simple-icons";

/** To add a technology, import its icon above (search names at simpleicons.org) and list it here. */
const ICONS = {
  cypress: siCypress,
  docker: siDocker,
  figma: siFigma,
  git: siGit,
  graphql: siGraphql,
  mongodb: siMongodb,
  n8n: siN8n,
  nestjs: siNestjs,
  nextjs: siNextdotjs,
  nodejs: siNodedotjs,
  postgresql: siPostgresql,
  prisma: siPrisma,
  python: siPython,
  react: siReact,
  storybook: siStorybook,
  swagger: siSwagger,
  tailwind: siTailwindcss,
  typescript: siTypescript,
  vercel: siVercel,
  vite: siVite,
  vitest: siVitest,
  vue: siVuedotjs,
};

export type Tech = keyof typeof ICONS;

/** Square badge with a single-colour technology logo. The name shows as a tooltip. */
export function TechIcon({ tech }: { tech: Tech }) {
  const { title, path } = ICONS[tech];
  return (
    <div className="tag tag-icon" title={title}>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" role="img" aria-label={title}>
        <path d={path} />
      </svg>
    </div>
  );
}

/** Bare single-colour logo; it takes the colour of its parent (currentColor). */
export function TechLogo({ tech, className }: { tech: Tech; className?: string }) {
  const { title, path } = ICONS[tech];
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" role="img" aria-label={title}>
      <path d={path} />
    </svg>
  );
}
