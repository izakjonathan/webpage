import assert from "node:assert/strict";
import { test } from "node:test";
import { getProject, getProjectNeighbours, projects } from "../src/features/projects/data/projects";

test("catalogue has unique route slugs and complete case-study content", () => {
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const field of ["title", "status", "subtitle", "challenge", "approach", "solution", "outcome", "description", "category", "year"] as const) assert.ok(project[field].trim());
    assert.equal(getProject(project.slug), project);
  }
});
test("unknown slugs do not fall back to an unrelated project", () => {
  for (const slug of ["missing", "__proto__", "constructor", ""]) {
    assert.equal(getProject(slug), undefined);
    assert.equal(getProjectNeighbours(slug), undefined);
  }
});
test("previous and next project links wrap through the same catalogue", () => {
  projects.forEach((project, index) => {
    const neighbours = getProjectNeighbours(project.slug);
    assert.equal(neighbours?.previous, projects[(index - 1 + projects.length) % projects.length]);
    assert.equal(neighbours?.next, projects[(index + 1) % projects.length]);
  });
});
