import MenuLink from "./MenuLink";

export default function Nav() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="nav">
        <nav className="nav-inner" aria-label="Main navigation">
          <MenuLink href="/" className="nav-logo blend-text">IZAK HYLLESTED</MenuLink>
          <MenuLink href="/#about" className="blend-text">ABOUT</MenuLink>
        </nav>
      </header>
      <footer className="footer-nav">
        <nav className="footer-inner" aria-label="Footer navigation">
          <a href="mailto:izakhyllested@icloud.com" className="blend-text">CONTACT</a>
          <MenuLink href="/projects" className="blend-text">PROJECTS</MenuLink>
        </nav>
      </footer>
    </>
  );
}
