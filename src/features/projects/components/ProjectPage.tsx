import Link from "next/link";
import { getProjectNeighbours, type Project } from "../data/projects";

export default function ProjectPage({ project }: { project: Project }) {
  const neighbours = getProjectNeighbours(project.slug);
  return <main id="main-content" className="case-study">
    <section className="case-hero"><div className="case-kicker">{project.status}</div><h1>{project.title}</h1><p className="case-subtitle">{project.subtitle}</p></section>
    <section className="case-showcase project-overview" aria-label="Project overview">
      <span className="case-section-label">{project.category} / {project.year}</span>
      <h2>{project.title}</h2><p>{project.description}</p>
    </section>
    <section className="case-split"><div><span className="case-section-label">01 / CHALLENGE</span><h2>Challenge</h2><p>{project.challenge}</p></div><aside className="project-note"><span className="case-section-label">PROJECT FOCUS</span><p>{project.subtitle}</p></aside></section>
    <section className="case-wide-copy"><span className="case-section-label">02 / APPROACH</span><h2>Approach</h2><p>{project.approach}</p></section>
    <section className="case-wide-copy"><span className="case-section-label">03 / SOLUTION</span><h2>Solution</h2><p>{project.solution}</p></section>
    <section className="case-wide-copy"><span className="case-section-label">04 / OUTCOME</span><h2>Outcome</h2><p>{project.outcome}</p></section>
    {neighbours && <nav className="case-nav" aria-label="Other projects">
      <Link href={`/projects/${neighbours.previous.slug}`}><small>Previous Project</small>{neighbours.previous.title}</Link>
      <Link href={`/projects/${neighbours.next.slug}`}><small>Next Project</small>{neighbours.next.title}</Link>
    </nav>}
  </main>;
}
