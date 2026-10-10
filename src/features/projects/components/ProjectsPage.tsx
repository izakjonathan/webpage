import ProjectRow from "./ProjectRow";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <>
      <div className="page-bg" aria-hidden="true" />

      <main id="main-content" className="main"><section className="projects-page"><div className="hero-meta"><span className="blend-text">01 / ARCHIVE</span><span className="blend-text">Selected work</span></div><h1 className="archive-title blend-text">Projects</h1><div className="project-list">{projects.map((project, index) => <ProjectRow key={project.title} project={project} index={index} />)}</div></section></main>
    </>
  );
}
