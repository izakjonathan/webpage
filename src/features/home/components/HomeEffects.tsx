"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Optional motion only: server-rendered content remains readable without this component. */
export default function HomeEffects() {
  const hostRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLImageElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const shell = host?.parentElement;
    if (!host || !shell) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopMotion = () => {};
    const setupMotion = () => {
      stopMotion();
      if (media.matches) return;
      let frame = 0;
      let currentGraphic = 0;
      let currentPortrait = 0;
      let targetGraphic = 0;
      let targetPortrait = 0;
      const timers: ReturnType<typeof setTimeout>[] = [];
      const splash = splashRef.current;
      const items = Array.from(shell.querySelectorAll<HTMLElement>("[data-reveal]"));
      const reveal = (item: HTMLElement) => item.classList.remove("reveal-pending");
      let observer: IntersectionObserver | undefined;
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target as HTMLElement);
              observer?.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05 });
        items.forEach((item) => {
          // Never hide already visible content; reveal remains an optional enhancement.
          if (item.getBoundingClientRect().top > window.innerHeight) {
            item.classList.add("reveal-pending");
            observer?.observe(item);
          }
        });
        // Fail open if an observer never delivers.
        timers.push(setTimeout(() => items.forEach(reveal), 8000));
      }
      if (splash) {
        splash.classList.add("is-active");
        timers.push(setTimeout(() => splash.classList.add("is-leaving"), 2400));
        timers.push(setTimeout(() => splash.classList.remove("is-active", "is-leaving"), 3400));
      }
      const animate = () => {
        currentGraphic += (targetGraphic - currentGraphic) * 0.1;
        currentPortrait += (targetPortrait - currentPortrait) * 0.065;
        if (graphicRef.current) graphicRef.current.style.transform = `translate3d(-50%, ${currentGraphic}px, 0)`;
        if (portraitRef.current) portraitRef.current.style.transform = `translate3d(0, ${currentPortrait}px, 0)`;
        if (Math.abs(targetGraphic - currentGraphic) > 0.1 || Math.abs(targetPortrait - currentPortrait) > 0.1) {
          frame = requestAnimationFrame(animate);
        } else frame = 0;
      };
      const updateTargets = () => {
        const mobile = window.innerWidth <= 800;
        targetGraphic = window.scrollY * (mobile ? -0.12 : -0.08);
        targetPortrait = window.scrollY * (mobile ? -0.06 : -0.045);
        if (!frame) frame = requestAnimationFrame(animate);
      };
      const handlePointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        shell.style.setProperty("--mx", ((event.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        shell.style.setProperty("--my", ((event.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      };
      window.addEventListener("scroll", updateTargets, { passive: true });
      window.addEventListener("resize", updateTargets, { passive: true });
      window.addEventListener("pointermove", handlePointer, { passive: true });
      updateTargets();
      stopMotion = () => {
        timers.forEach(clearTimeout);
        if (frame) cancelAnimationFrame(frame);
        observer?.disconnect();
        items.forEach(reveal);
        splash?.classList.remove("is-active", "is-leaving");
        window.removeEventListener("scroll", updateTargets);
        window.removeEventListener("resize", updateTargets);
        window.removeEventListener("pointermove", handlePointer);
        shell.style.removeProperty("--mx");
        shell.style.removeProperty("--my");
        graphicRef.current?.style.removeProperty("transform");
        portraitRef.current?.style.removeProperty("transform");
      };
    };
    setupMotion();
    media.addEventListener("change", setupMotion);
    return () => { stopMotion(); media.removeEventListener("change", setupMotion); };
  }, []);

  return <div ref={hostRef} className="home-effects" aria-hidden="true">
    <div ref={splashRef} className="splash"><div className="splash-name"><span className="splash-line-wrap"><span className="splash-line">IZAK</span></span><span className="splash-line-wrap"><span className="splash-line">HYLLESTED</span></span></div></div>
    <div className="page-bg" />
    <div className="graphic-layer"><Image ref={graphicRef} src="/hero-graphic.webp" width={985} height={1398} sizes="125vw" preload alt="" className="graphic-image" /></div>
    <div className="portrait-layer"><Image ref={portraitRef} src="/profile.webp" width={1151} height={1536} sizes="(max-width: 800px) 126vw, 78vw" alt="" className="portrait" /></div>
  </div>;
}
