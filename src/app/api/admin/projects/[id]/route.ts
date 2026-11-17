import { requireAdmin } from "@/lib/admin-auth";
import { deleteProjectImage } from "@/lib/cloudinary";
import { deleteProject, updateProject } from "@/lib/projects";
import { validateProjectFields } from "@/lib/project-validation";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface ProjectRouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: ProjectRouteContext) {
  try {
    const access = await requireAdmin(request);
    if (!access.ok) return access.response;

    const { id } = await context.params;
    if (!uuidPattern.test(id)) {
      return Response.json({ error: "Invalid project ID." }, { status: 400 });
    }

    const formData = await request.formData();
    const validation = validateProjectFields(formData);
    if ("error" in validation) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const project = await updateProject(id, validation.fields);
    if (!project) {
      return Response.json({ error: "Project not found." }, { status: 404 });
    }

    return Response.json({ project });
  } catch (error) {
    console.error("Failed to update a project.", error);
    return Response.json(
      { error: "The project could not be updated. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: ProjectRouteContext) {
  try {
    const access = await requireAdmin(request);
    if (!access.ok) return access.response;

    const { id } = await context.params;
    if (!uuidPattern.test(id)) {
      return Response.json({ error: "Invalid project ID." }, { status: 400 });
    }

    const imagePublicId = await deleteProject(id);
    if (!imagePublicId) {
      return Response.json({ error: "Project not found." }, { status: 404 });
    }

    try {
      await deleteProjectImage(imagePublicId);
    } catch (error) {
      console.error(
        "Project was deleted but its Cloudinary image could not be removed.",
        error
      );
      return Response.json(
        {
          warning:
            "The project was deleted, but its stored image could not be removed.",
        },
        { status: 200 }
      );
    }

    return Response.json({ deleted: true });
  } catch (error) {
    console.error("Failed to delete a project.", error);
    return Response.json(
      { error: "The project could not be deleted. Please try again." },
      { status: 500 }
    );
  }
}
