import Link from "next/link";
import ProjectRow from "../../projects/components/ProjectRow";
import { projects } from "../../projects/data/projects";
import HomeEffects from "./HomeEffects";

export default function HomePage() {
  return (
    <div className="home-shell">
      <HomeEffects />
      <main id="main-content" className="main">
        <section className="hero">
          <div data-reveal className="hero-meta hero-sequence hero-sequence-1"><span className="blend-text">00 / MMXXVI</span><span className="blend-text">Copenhagen</span></div>
          <div data-reveal className="hero-title-wrap"><h1 className="hero-title hero-sequence hero-sequence-2 blend-text">Graphic<br />Designer &<br />Creative<br />Developer</h1></div>
          <div className="hero-grid hero-sequence hero-sequence-3">
            <div data-reveal><div className="label blend-text">WHO</div><p className="blend-text">Izak Hyllested</p></div>
            <div data-reveal><div className="label blend-text">WHAT</div><p className="blend-text">Interactive Systems<br />Identity<br />Frontend</p></div>
            <div data-reveal><div className="label blend-text">WHEN</div><p className="blend-text">Available</p></div>
            <div data-reveal><div className="label blend-text">HOW</div><p className="blend-text">Design + Code</p></div>
          </div>
        </section>
        <section className="portrait-section reveal-block"><div className="portrait-spacer" /><div data-reveal className="portrait-caption"><span className="blend-text">Portrait / Profile</span><span className="blend-text">Graphic Design + Web Development</span></div></section>
        <section className="projects-section reveal-block"><div data-reveal className="section-top"><span className="blend-text">01 / SELECTED WORK</span><Link href="/projects" className="blend-text">Full Archive →</Link></div><div className="project-list">{projects.map((project, index) => <ProjectRow key={project.title} project={project} index={index} />)}</div></section>


        <section className="services-editorial reveal-block" id="services">
          <div className="services-intro">
            <span data-reveal className="services-kicker blend-text">02 / SERVICES</span>
            <p data-reveal className="services-statement blend-text">Design systems, brand identities and digital products built as complete visual experiences — from first concept to live deployment.</p>
          </div>

          <article className="service-editorial service-editorial-design">
            <div data-reveal className="service-label blend-text">Identity / Direction</div>
            <div className="service-content">
              <h2 data-reveal className="blend-text">Visual<br />Systems</h2>
              <p data-reveal className="blend-text">Logos, typography, layout, brand systems, posters, menus and visual direction for businesses that need a sharper and more coherent identity.</p>
              <div data-reveal className="service-tags">
                <span className="blend-text">Logos</span>
                <span className="blend-text">Brand Systems</span>
                <span className="blend-text">Print</span>
                <span className="blend-text">Art Direction</span>
              </div>
            </div>
          </article>

          <article className="service-editorial alt service-editorial-digital">
            <div data-reveal className="service-label blend-text">Web / Product</div>
            <div className="service-content">
              <h2 data-reveal className="blend-text">Digital<br />Interfaces</h2>
              <p data-reveal className="blend-text">Websites, landing pages, dashboards and mobile-first interfaces designed around clarity, atmosphere and interaction.</p>
              <div data-reveal className="service-tags">
                <span className="blend-text">Web Design</span>
                <span className="blend-text">UI Design</span>
                <span className="blend-text">Dashboards</span>
                <span className="blend-text">Case Studies</span>
              </div>
            </div>
          </article>

          <article className="service-editorial service-editorial-code">
            <div data-reveal className="service-label blend-text">Build / Deploy</div>
            <div className="service-content">
              <h2 data-reveal className="blend-text">Creative<br />Development</h2>
              <p data-reveal className="blend-text">Custom Next.js sites, interactive tools, small web applications and deployment workflows that turn design ideas into working products.</p>
              <div data-reveal className="service-tags">
                <span className="blend-text">Frontend</span>
                <span className="blend-text">Next.js</span>
                <span className="blend-text">Vercel</span>
                <span className="blend-text">Custom Tools</span>
              </div>
            </div>
          </article>
        </section>

<section className="about-strip reveal-block" id="about"><p data-reveal className="blend-text">I build visual systems, mobile-first web apps, editorial interfaces and experimental digital identities with a focus on typography, atmosphere and interaction.</p><a data-reveal href="mailto:izakhyllested@icloud.com" className="blend-text">Start a project →</a></section>
      </main>
    </div>
  );
}
