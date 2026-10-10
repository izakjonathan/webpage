import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";
import ScrollReveal from "../components/ScrollReveal";
import Nav from "../components/Nav";
import { site } from "../config/site";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#000000" };
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: "website", locale: "en_GB" },
  twitter: { card: "summary", title: site.name, description: site.description },
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "black-translucent" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><Nav />{children}<ScrollReveal /></body></html>;
}
