
import Link from "next/link";

export default function ProjectPage({ params }) {
  const order = ["bar-os","rummy-500","product-dashboard","employee-app","portfolio"];

  const projects = {
    "bar-os": { title:"Bar OS Dashboard", status:"Active Development" },
    "rummy-500": { title:"Rummy 500", status:"Active Development" },
    "product-dashboard": { title:"Product Dashboard", status:"Live" },
    "employee-app": { title:"Employee App", status:"Concept" },
    "portfolio": { title:"Portfolio Website", status:"Live" }
  };

  const slug = params.slug;
  const project = projects[slug] || projects.portfolio;

  const current = Math.max(order.indexOf(slug),0);
  const prevSlug = order[(current - 1 + order.length) % order.length];
  const nextSlug = order[(current + 1) % order.length];

  return (
    <main className="case-study">
      <section className="case-hero">
        <div className="case-kicker">{project.status}</div>
        <h1>{project.title}</h1>
        <p className="case-subtitle">Case study template</p>
      </section>

      <section className="case-showcase">
        <img src="https://picsum.photos/1600/900?10" alt="" />
      </section>

      <section className="case-split">
        <div>
          <span className="case-section-label">01 / CHALLENGE</span>
          <h2>Challenge</h2>
          <p>Placeholder challenge content.</p>
        </div>
        <img src="https://picsum.photos/900/1100?11" alt="" />
      </section>

      <section className="case-split case-split-reverse">
        <img src="https://picsum.photos/900/1100?12" alt="" />
        <div>
          <span className="case-section-label">02 / APPROACH</span>
          <h2>Approach</h2>
          <p>Placeholder approach content.</p>
        </div>
      </section>

      <section className="case-wide-copy">
        <span className="case-section-label">03 / SOLUTION</span>
        <h2>Solution</h2>
        <p>Placeholder solution content.</p>
      </section>

      <section className="case-gallery">
        <img src="https://picsum.photos/1200/800?13" alt="" />
        <img src="https://picsum.photos/1200/800?14" alt="" />
        <img src="https://picsum.photos/1200/800?15" alt="" />
      </section>

      <nav className="case-nav">
        <Link href={`/projects/${prevSlug}`}>Previous Project</Link>
        <Link href="/projects">All Projects</Link>
        <Link href={`/projects/${nextSlug}`}>Next Project</Link>
      </nav>
    </main>
  );
}
