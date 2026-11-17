import { getPublishedProjects } from "@/lib/projects";

export async function GET() {
  try {
    const projects = await getPublishedProjects();
    return Response.json({ projects });
  } catch (error) {
    console.error("Failed to load published projects.", error);
    return Response.json(
      { error: "Projects are currently unavailable." },
      { status: 500 }
    );
  }
}
