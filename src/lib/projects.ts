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
}

export interface NewProject extends ProjectFields {
  imageUrl: string;
  imagePublicId: string;
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

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image: row.image_url,
    categories: parseCategories(row.categories),
    description: row.description,
  };
}

function toManagedProject(row: ProjectRow): ManagedProject {
  return {
    ...toProject(row),
    isPublished: Boolean(row.is_published),
    sortOrder: row.sort_order,
  };
}

const projectColumns =
  "id, title, category, categories, description, image_url, is_published, sort_order";

export async function getPublishedProjects(): Promise<Project[]> {
  const [rows] = await getMysqlPool().execute<ProjectRow[]>(
    `SELECT ${projectColumns}
     FROM projects
     WHERE is_published = 1
     ORDER BY sort_order ASC, created_at DESC`
  );

  return rows.map(toProject);
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
      (id, title, category, categories, description, image_url, image_public_id, is_published, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      project.title,
      project.categories.join(", "),
      JSON.stringify(project.categories),
      project.description,
      project.imageUrl,
      project.imagePublicId,
      project.isPublished ? 1 : 0,
      project.sortOrder,
    ]
  );

  return {
    id,
    title: project.title,
    category: project.categories.join(", "),
    image: project.imageUrl,
    categories: project.categories,
    description: project.description,
    isPublished: project.isPublished,
    sortOrder: project.sortOrder,
  };
}

export async function updateProject(
  id: string,
  fields: ProjectFields
): Promise<ManagedProject | null> {
  await getMysqlPool().execute<ResultSetHeader>(
    `UPDATE projects
     SET title = ?, category = ?, categories = ?, description = ?, is_published = ?, sort_order = ?
     WHERE id = ?`,
    [
      fields.title,
      fields.categories.join(", "),
      JSON.stringify(fields.categories),
      fields.description,
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
