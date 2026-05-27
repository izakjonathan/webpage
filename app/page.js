"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";

export default function Home() {
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const graphicRef = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const revealObserverRef = { current: null };

    let lastScrollForNav = window.scrollY || window.pageYOffset || 0;
    let navTicking = false;

    const updateNavState = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isDown = scrollY > lastScrollForNav && scrollY > 24;

      root.classList.toggle("is-scrolled", scrollY > 12);
      root.classList.toggle("is-scrolling-down", isDown);

      lastScrollForNav = scrollY;
      navTicking = false;
    };

    const handleNavScroll = () => {
      if (!navTicking) {
        navTicking = true;
        requestAnimationFrame(updateNavState);
      }
    };

    const setupReveals = () => {
      const items = Array.from(document.querySelectorAll("[data-reveal]"));

      if (!items.length) return null;

      if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("is-visible"));
        return null;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      items.forEach((item) => observer.observe(item));

      return observer;
    };
    let running = true;
    let raf = null;
    let loop = null;
    let targetGraphicY = 0;
    let currentGraphicY = 0;
    let targetPortraitY = 0;
    let currentPortraitY = 0;

    const setViewport = () => {
      const height = window.visualViewport?.height || window.innerHeight;
      root.style.setProperty("--app-height", `${height}px`);
    };

    const updateTargets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isMobile = window.innerWidth <= 800;
      targetGraphicY = scrollY * (isMobile ? -0.12 : -0.08);
      targetPortraitY = scrollY * (isMobile ? -0.06 : -0.045);
      raf = null;
    };

    const animate = () => {
      if (!running) return;
      currentGraphicY += (targetGraphicY - currentGraphicY) * 0.10;
      currentPortraitY += (targetPortraitY - currentPortraitY) * 0.065;
      if (graphicRef.current) graphicRef.current.style.transform = `translate3d(-50%, ${currentGraphicY.toFixed(2)}px, 0)`;
      if (portraitRef.current) portraitRef.current.style.transform = `translate3d(0, ${currentPortraitY.toFixed(2)}px, 0)`;
      loop = requestAnimationFrame(animate);
    };

    const handleScroll = () => { if (!raf) raf = requestAnimationFrame(updateTargets); };
    const handlePointer = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    };
    const finishSplash = () => {
      root.classList.remove("site-ready", "intro-complete", "scroll-reveals-ready");
      setSplashLeaving(true);

      window.setTimeout(() => {
        setSplashGone(true);
        root.classList.add("site-ready");

        window.setTimeout(() => {
          root.classList.add("intro-complete");
        }, 1500);

        window.setTimeout(() => {
          root.classList.add("scroll-reveals-ready");
          revealObserverRef.current = setupReveals();
        }, 2100);
      }, 900);
    };
    const waitForPage = async () => {
      const minimumTime = new Promise((resolve) => window.setTimeout(resolve, 2400));
      const imageLoads = Array.from(document.images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); });
      });
      await Promise.all([minimumTime, ...imageLoads]);
      if (document.readyState === "complete") finishSplash(); else window.addEventListener("load", finishSplash, { once: true });
    };

    setViewport(); updateTargets(); animate(); waitForPage();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", setViewport, { passive: true });
    window.addEventListener("orientationchange", setViewport, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.visualViewport?.addEventListener("resize", setViewport, { passive: true });
    window.visualViewport?.addEventListener("scroll", setViewport, { passive: true });
    return () => {
      running = false;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleNavScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", setViewport);
      window.removeEventListener("orientationchange", setViewport);
      window.removeEventListener("pointermove", handlePointer);
      window.visualViewport?.removeEventListener("resize", setViewport);
      window.visualViewport?.removeEventListener("scroll", setViewport);
      

      revealObserverRef.current?.disconnect();

      if (raf) cancelAnimationFrame(raf);
      if (loop) cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <>
      {!splashGone && <div className={splashLeaving ? "splash is-leaving" : "splash"}><div className="splash-name" aria-label="Izak Hyllested">
            <span className="splash-line-wrap"><span className="splash-line splash-line-1">IZAK</span></span>
            <span className="splash-line-wrap"><span className="splash-line splash-line-2">HYLLESTED</span></span>
          </div></div>}
      <div className="page-bg" aria-hidden="true" />
      <div className="graphic-layer" aria-hidden="true"><img ref={graphicRef} src="/hero-graphic.png" alt="" className="graphic-image" /></div>
      <div className="portrait-layer" aria-hidden="true"><img ref={portraitRef} src="/profile.jpg" alt="" className="portrait" /></div>
      <main className="main">
        <section className="hero">
          <div className="hero-meta hero-sequence hero-sequence-1"><span className="blend-text">00 / MMXXVI</span><span className="blend-text">Copenhagen</span></div>
          <div className="hero-title-wrap"><h1 className="hero-title hero-sequence hero-sequence-2 blend-text">Graphic<br />Designer &<br />Creative<br />Developer</h1></div>
          <div className="hero-grid hero-sequence hero-sequence-3">
            <div><div className="label blend-text">WHO</div><p className="blend-text">Izak Hyllested</p></div>
            <div><div className="label blend-text">WHAT</div><p className="blend-text">Interactive Systems<br />Identity<br />Frontend</p></div>
            <div><div className="label blend-text">WHEN</div><p className="blend-text">Available</p></div>
            <div><div className="label blend-text">HOW</div><p className="blend-text">Design + Code</p></div>
          </div>
        </section>
        <section data-reveal className="portrait-section reveal-block"><div className="portrait-spacer" /><div className="portrait-caption"><span className="blend-text">Portrait / Profile</span><span className="blend-text">Graphic Design + Web Development</span></div></section>
        <section data-reveal className="projects-section reveal-block"><div className="section-top"><span className="blend-text">01 / SELECTED WORK</span><Link href="/projects" className="blend-text">Full Archive →</Link></div><div className="project-list">{projects.map((project, index) => <ProjectRow key={project.title} project={project} index={index} />)}</div></section>
        
        
        <section data-reveal className="services-editorial reveal-block" id="services">
          <div className="services-intro">
            <span className="services-kicker blend-text">02 / SERVICES</span>
            <p className="services-statement blend-text">Design systems, brand identities and digital products built as complete visual experiences — from first concept to live deployment.</p>
          </div>

          <article className="service-editorial service-editorial-design">
            <div className="service-label blend-text">Identity / Direction</div>
            <div className="service-content">
              <h2 className="blend-text">Visual<br />Systems</h2>
              <p className="blend-text">Logos, typography, layout, brand systems, posters, menus and visual direction for businesses that need a sharper and more coherent identity.</p>
              <div className="service-tags">
                <span className="blend-text">Logos</span>
                <span className="blend-text">Brand Systems</span>
                <span className="blend-text">Print</span>
                <span className="blend-text">Art Direction</span>
              </div>
            </div>
          </article>

          <article className="service-editorial alt service-editorial-digital">
            <div className="service-label blend-text">Web / Product</div>
            <div className="service-content">
              <h2 className="blend-text">Digital<br />Interfaces</h2>
              <p className="blend-text">Websites, landing pages, dashboards and mobile-first interfaces designed around clarity, atmosphere and interaction.</p>
              <div className="service-tags">
                <span className="blend-text">Web Design</span>
                <span className="blend-text">UI Design</span>
                <span className="blend-text">Dashboards</span>
                <span className="blend-text">Case Studies</span>
              </div>
            </div>
          </article>

          <article className="service-editorial service-editorial-code">
            <div className="service-label blend-text">Build / Deploy</div>
            <div className="service-content">
              <h2 className="blend-text">Creative<br />Development</h2>
              <p className="blend-text">Custom Next.js sites, interactive tools, small web applications and deployment workflows that turn design ideas into working products.</p>
              <div className="service-tags">
                <span className="blend-text">Frontend</span>
                <span className="blend-text">Next.js</span>
                <span className="blend-text">Vercel</span>
                <span className="blend-text">Custom Tools</span>
              </div>
            </div>
          </article>
        </section>

<section data-reveal className="about-strip reveal-block" id="about"><p className="blend-text">I build visual systems, mobile-first web apps, editorial interfaces and experimental digital identities with a focus on typography, atmosphere and interaction.</p><a href="mailto:izakhyllested@icloud.com" className="blend-text">Start a project →</a></section>
      </main>
    </>
  );
}


