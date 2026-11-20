import "server-only";

import { randomUUID } from "node:crypto";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { ManagedProject, Project } from "@/types/project";
import { getMysqlPool } from "@/lib/mysql";
import type { ProjectFields } from "@/lib/project-validation";

interface ProjectRow extends RowDataPacket {
  id: string;
  title: string;
  category: string;
  categories: string | string[];
  description: string;
  image_url: string;
  is_published: number;
  sort_order: number;
  image_public_id?: string;
  client?: string;
  year?: string;
  live_url?: string;
  gallery?: string | string[] | null;
  created_at?: Date | string;
}

export interface NewProject extends ProjectFields {
  imageUrl: string;
  imagePublicId: string;
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseCategories(value: ProjectRow["categories"]): string[] {
  const categories: unknown =
    typeof value === "string" ? JSON.parse(value) : value;

  if (
    !Array.isArray(categories) ||
    categories.some((category) => typeof category !== "string")
  ) {
    throw new Error("A project contains invalid category data.");
  }

  return categories;
}

function parseGallery(value: ProjectRow["gallery"]): string[] {
  if (!value) return [];
  try {
    const parsed: unknown =
      typeof value === "string" ? JSON.parse(value) : value;
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      return parsed;
    }
  } catch {
    // fallback to empty gallery
  }
  return [];
}

function toProject(row: ProjectRow): Project {
  const categories = parseCategories(row.categories);
  const gallery = parseGallery(row.gallery);
  const slug = toSlug(row.title) || row.id;

  return {
    id: row.id,
    slug,
    title: row.title,
    category: row.category,
    image: row.image_url,
    categories,
    description: row.description,
    client: row.client?.trim() ? row.client.trim() : row.title,
    industry: row.category,
    services: categories,
    year: row.year?.trim()
      ? row.year.trim()
      : row.created_at
        ? new Date(row.created_at).getFullYear().toString()
        : "2026",
    liveUrl: row.live_url?.trim() || undefined,
    deliverables: categories.length > 0 ? categories : ["Design & Development"],
    gallery: gallery.length > 0 ? gallery : [row.image_url],
  };
}

function toManagedProject(row: ProjectRow): ManagedProject {
  return {
    ...toProject(row),
    isPublished: Boolean(row.is_published),
    sortOrder: row.sort_order,
    imagePublicId: row.image_public_id,
  };
}

const projectColumns =
  "id, title, category, categories, description, image_url, image_public_id, client, year, live_url, gallery, is_published, sort_order, created_at";

export async function getPublishedProjects(): Promise<Project[]> {
  const [rows] = await getMysqlPool().execute<ProjectRow[]>(
    `SELECT ${projectColumns}
     FROM projects
     WHERE is_published = 1
     ORDER BY sort_order ASC, created_at DESC`
  );

  return rows.map(toProject);
}

export async function getPublishedProjectBySlug(
  slugOrId: string
): Promise<{
  project: Project;
  nextProject: { slug: string; title: string; category: string; image: string } | null;
  prevProject: { slug: string; title: string; category: string; image: string } | null;
} | null> {
  const projects = await getPublishedProjects();
  const normalized = slugOrId.toLowerCase().trim();

  const index = projects.findIndex(
    (p) => p.slug.toLowerCase() === normalized || p.id === slugOrId
  );

  if (index === -1) return null;

  const project = projects[index];
  const nextProject =
    projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const prevProject =
    projects.length > 1
      ? projects[(index - 1 + projects.length) % projects.length]
      : null;

  return {
    project,
    nextProject: nextProject
      ? {
          slug: nextProject.slug,
          title: nextProject.title,
          category: nextProject.category,
          image: nextProject.image,
        }
      : null,
    prevProject: prevProject
      ? {
          slug: prevProject.slug,
          title: prevProject.title,
          category: prevProject.category,
          image: prevProject.image,
        }
      : null,
  };
}

export async function getManagedProjects(): Promise<ManagedProject[]> {
  const [rows] = await getMysqlPool().execute<ProjectRow[]>(
    `SELECT ${projectColumns}
     FROM projects
     ORDER BY sort_order ASC, created_at DESC`
  );

  return rows.map(toManagedProject);
}

export async function createProject(
  fields: ProjectFields,
  image: { url: string; publicId: string }
): Promise<ManagedProject> {
  const project: NewProject = {
    ...fields,
    imageUrl: image.url,
    imagePublicId: image.publicId,
  };
  const id = randomUUID();

  await getMysqlPool().execute<ResultSetHeader>(
    `INSERT INTO projects
      (id, title, category, categories, description, image_url, image_public_id, client, year, live_url, is_published, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      project.title,
      project.categories.join(", "),
      JSON.stringify(project.categories),
      project.description,
      project.imageUrl,
      project.imagePublicId,
      project.client || project.title,
      project.year || new Date().getFullYear().toString(),
      project.liveUrl || "",
      project.isPublished ? 1 : 0,
      project.sortOrder,
    ]
  );

  return {
    id,
    slug: toSlug(project.title) || id,
    title: project.title,
    category: project.categories.join(", "),
    image: project.imageUrl,
    categories: project.categories,
    description: project.description,
    client: project.client || project.title,
    industry: project.categories.join(", "),
    services: project.categories,
    year: project.year || new Date().getFullYear().toString(),
    liveUrl: project.liveUrl,
    deliverables:
      project.categories.length > 0
        ? project.categories
        : ["Design & Development"],
    gallery: [project.imageUrl],
    isPublished: project.isPublished,
    sortOrder: project.sortOrder,
    imagePublicId: project.imagePublicId,
  };
}

export async function updateProject(
  id: string,
  fields: ProjectFields
): Promise<ManagedProject | null> {
  await getMysqlPool().execute<ResultSetHeader>(
    `UPDATE projects
     SET title = ?, category = ?, categories = ?, description = ?, client = ?, year = ?, live_url = ?, is_published = ?, sort_order = ?
     WHERE id = ?`,
    [
      fields.title,
      fields.categories.join(", "),
      JSON.stringify(fields.categories),
      fields.description,
      fields.client || fields.title,
      fields.year || new Date().getFullYear().toString(),
      fields.liveUrl || "",
      fields.isPublished ? 1 : 0,
      fields.sortOrder,
      id,
    ]
  );

  const [rows] = await getMysqlPool().execute<ProjectRow[]>(
    `SELECT ${projectColumns}
     FROM projects
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0] ? toManagedProject(rows[0]) : null;
}

export async function deleteProject(id: string): Promise<string | null> {
  const connection = await getMysqlPool().getConnection();

  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute<ProjectRow[]>(
      "SELECT image_public_id FROM projects WHERE id = ? FOR UPDATE",
      [id]
    );
    const imagePublicId = rows[0]?.image_public_id;

    if (!imagePublicId) {
      await connection.rollback();
      return null;
    }

    await connection.execute<ResultSetHeader>(
      "DELETE FROM projects WHERE id = ?",
      [id]
    );
    await connection.commit();
    return imagePublicId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
