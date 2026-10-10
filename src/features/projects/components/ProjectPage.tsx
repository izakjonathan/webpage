import Link from "next/link";
import { getProjectNeighbours, type Project } from "../data/projects";

export default function ProjectPage({ project }: { project: Project }) {
  const neighbours = getProjectNeighbours(project.slug);
  return <main id="main-content" className="case-study">
    <section className="case-hero"><div data-reveal className="case-kicker">{project.status}</div><h1 data-reveal>{project.title}</h1><p data-reveal className="case-subtitle">{project.subtitle}</p></section>
    <section className="case-showcase project-overview" aria-label="Project overview">
      <span data-reveal className="case-section-label">{project.category} / {project.year}</span>
      <h2 data-reveal>{project.title}</h2><p data-reveal>{project.description}</p>
    </section>
    <section className="case-split"><div><span data-reveal className="case-section-label">01 / CHALLENGE</span><h2 data-reveal>Challenge</h2><p data-reveal>{project.challenge}</p></div><aside className="project-note"><span data-reveal className="case-section-label">PROJECT FOCUS</span><p data-reveal>{project.subtitle}</p></aside></section>
    <section className="case-wide-copy"><span data-reveal className="case-section-label">02 / APPROACH</span><h2 data-reveal>Approach</h2><p data-reveal>{project.approach}</p></section>
    <section className="case-wide-copy"><span data-reveal className="case-section-label">03 / SOLUTION</span><h2 data-reveal>Solution</h2><p data-reveal>{project.solution}</p></section>
    <section className="case-wide-copy"><span data-reveal className="case-section-label">04 / OUTCOME</span><h2 data-reveal>Outcome</h2><p data-reveal>{project.outcome}</p></section>
    {neighbours && <nav className="case-nav" aria-label="Other projects">
      <Link data-reveal href={`/projects/${neighbours.previous.slug}`}><small>Previous Project</small>{neighbours.previous.title}</Link>
      <Link data-reveal href={`/projects/${neighbours.next.slug}`}><small>Next Project</small>{neighbours.next.title}</Link>
    </nav>}
  </main>;
}
