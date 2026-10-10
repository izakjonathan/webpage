"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: the server never renders hidden content. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(document.querySelectorAll<HTMLElement>("main [data-reveal]"));
    const seen = new Set<HTMLElement>();
    let stop = () => {};
    const setup = () => {
      stop();
      if (media.matches || !("IntersectionObserver" in window)) return;
      let observer: IntersectionObserver | undefined;
      let watchdog: ReturnType<typeof setTimeout> | undefined;
      const reveal = (item: HTMLElement, instant = false) => {
        if (instant) item.classList.add("reveal-instant");
        item.classList.remove("reveal-pending");
        seen.add(item);
        observer?.unobserve(item);
      };
      const focus = (event: FocusEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        items.forEach(item => {
          if (item.contains(target) || target.contains(item)) reveal(item, true);
        });
      };
      // Defer until the router has committed its new DOM and scroll position.
      const frame = requestAnimationFrame(() => {
        try {
          observer = new IntersectionObserver(entries => {
            clearTimeout(watchdog);
            entries.forEach(entry => {
              if (entry.isIntersecting) reveal(entry.target as HTMLElement);
            });
          }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
          items.forEach(item => {
            if (seen.has(item)) return;
            // Preserve first paint, anchor landings and restored scroll positions.
            if (item.getBoundingClientRect().top < window.innerHeight || item.matches(":focus-within")) {
              reveal(item);
            } else {
              item.classList.add("reveal-pending");
              observer?.observe(item);
            }
          });
          // Initial observer delivery is required by the API. If it fails, fail open.
          watchdog = setTimeout(() => { observer?.disconnect(); items.forEach(item => reveal(item, true)); }, 2000);
        } catch {
          observer?.disconnect();
          items.forEach(item => reveal(item, true));
        }
      });
      document.addEventListener("focusin", focus);
      stop = () => {
        cancelAnimationFrame(frame);
        clearTimeout(watchdog);
        observer?.disconnect();
        document.removeEventListener("focusin", focus);
        items.forEach(item => item.classList.remove("reveal-pending", "reveal-instant"));
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => { stop(); media.removeEventListener("change", setup); };
  }, [pathname]);

  return null;
}
