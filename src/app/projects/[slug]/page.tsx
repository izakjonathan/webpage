import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "../../../features/projects/data/projects";
import ProjectPage from "../../../features/projects/components/ProjectPage";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return { title: project.title, description: project.description, openGraph: { title: project.title, description: project.description, url: `/projects/${project.slug}`, type: "website" }, twitter: { card: "summary", title: project.title, description: project.description }, alternates: { canonical: `/projects/${project.slug}` } };
}
export default async function Page({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
