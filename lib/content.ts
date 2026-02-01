// Content loading utilities

export async function getExperiences() {
  const { experience } = await import('@/content/experience.json');
  return experience;
}

export async function getProjects() {
  const { projects } = await import('@/content/projects.json');
  return projects;
}

export async function getAbout() {
  const about = await import('@/content/about.json');
  return about;
}
