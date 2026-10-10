"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

/** Repeated taps on the current route must still move to the requested section. */
export default function MenuLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(href, window.location.href);
    if (destination.pathname !== window.location.pathname || destination.search !== window.location.search) return;
    const target = destination.hash ? document.getElementById(decodeURIComponent(destination.hash.slice(1))) : null;
    if (destination.hash && !target) return;
    event.preventDefault();
    window.history.replaceState(window.history.state, "", destination.pathname + destination.search + destination.hash);
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0, left: 0 });
  };
  return <Link href={href} className={className} onClick={handleClick}>{children}</Link>;
}
