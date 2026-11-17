import { requireAdmin } from "@/lib/admin-auth";
import {
  deleteProjectImage,
  uploadProjectImage,
  validateProjectImage,
} from "@/lib/cloudinary";
import { createProject, getManagedProjects } from "@/lib/projects";
import { validateProjectFields } from "@/lib/project-validation";

export async function GET(request: Request) {
  try {
    const access = await requireAdmin(request);
    if (!access.ok) return access.response;

    const projects = await getManagedProjects();
    return Response.json({ projects });
  } catch (error) {
    console.error("Failed to load admin projects.", error);
    return Response.json(
      { error: "The project list could not be loaded." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let uploadedPublicId: string | undefined;

  try {
    const access = await requireAdmin(request);
    if (!access.ok) return access.response;

    const formData = await request.formData();
    const validation = validateProjectFields(formData);
    if ("error" in validation) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const image = formData.get("image");
    if (!validateProjectImage(image)) {
      return Response.json(
        {
          error: "Choose a JPEG, PNG, or WebP image smaller than 10 MB.",
        },
        { status: 400 }
      );
    }

    const uploadedImage = await uploadProjectImage(image);
    uploadedPublicId = uploadedImage.publicId;
    const project = await createProject(validation.fields, uploadedImage);
    return Response.json({ project }, { status: 201 });
  } catch (error) {
    if (uploadedPublicId) {
      try {
        await deleteProjectImage(uploadedPublicId);
      } catch (cleanupError) {
        console.error(
          "Failed to clean up an image after project creation failed.",
          cleanupError
        );
      }
    }

    console.error("Failed to create a project.", error);
    return Response.json(
      { error: "The project could not be created. Please try again." },
      { status: 500 }
    );
  }
}
