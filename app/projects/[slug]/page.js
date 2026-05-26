export default function ProjectPage({ params }) {
  const projects = {
    "bar-os": {
      title: "Bar OS Dashboard",
      subtitle: "Operations, finance and reporting platform"
    },
    "rummy-500": {
      title: "Rummy 500",
      subtitle: "Cross-device score tracking application"
    },
    "product-dashboard": {
      title: "Product Dashboard",
      subtitle: "Pricing and supplier intelligence"
    },
    "employee-app": {
      title: "Employee App",
      subtitle: "Internal hospitality operations platform"
    },
    "portfolio": {
      title: "Portfolio Website",
      subtitle: "Design system, typography and interaction"
    }
  };

  const project = projects[params.slug] || {
    title: params.slug,
    subtitle: "Case study"
  };

  return (
    <main style={{padding:"120px 24px",maxWidth:"1100px",margin:"0 auto"}}>
      <h1>{project.title}</h1>
      <p>{project.subtitle}</p>

      <section>
        <h2>Challenge</h2>
        <p>Add project-specific content.</p>
      </section>

      <section>
        <h2>Approach</h2>
        <p>Add project-specific content.</p>
      </section>

      <section>
        <h2>Solution</h2>
        <p>Add project-specific content.</p>
      </section>

      <section>
        <h2>Outcome</h2>
        <p>Add project-specific content.</p>
      </section>
    </main>
  );
}
