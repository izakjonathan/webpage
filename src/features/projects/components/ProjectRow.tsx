import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "../data/projects";

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-link"><article className="project-row project-reveal" data-reveal style={{ "--row-delay": `${Math.min(index * 40, 160)}ms` } as CSSProperties}>
      <span className="project-number blend-text">{String(index + 1).padStart(2, "0")}</span>
      <div className="project-main">
        <h2 className="blend-text">{project.title}</h2>
        <p className="blend-text">{project.description}</p>
      </div>
      <div className="project-side">
        <span className="blend-text">{project.category}</span>
        <span className="blend-text">{project.year}</span>
      </div>
    </article></Link>
  );
}
