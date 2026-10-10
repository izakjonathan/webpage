import Link from "next/link";

export default function Nav() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="nav">
        <nav className="nav-inner" aria-label="Main navigation">
          <Link href="/" className="nav-logo blend-text">IZAK HYLLESTED</Link>
          <Link href="/#about" className="blend-text">ABOUT</Link>
        </nav>
      </header>
      <footer className="footer-nav">
        <nav className="footer-inner" aria-label="Footer navigation">
          <a href="mailto:izakhyllested@icloud.com" className="blend-text">CONTACT</a>
          <Link href="/projects" className="blend-text">PROJECTS</Link>
        </nav>
      </footer>
    </>
  );
}
