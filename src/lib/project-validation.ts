export interface ProjectFields {
  title: string;
  categories: string[];
  description: string;
  isPublished: boolean;
  sortOrder: number;
  client?: string;
  year?: string;
  liveUrl?: string;
}

export function validateProjectFields(
  formData: FormData
): { fields: ProjectFields } | { error: string } {
  const titleValue = formData.get("title");
  const categoriesValue = formData.get("categories");
  const descriptionValue = formData.get("description");
  const publishedValue = formData.get("isPublished");
  const sortOrderValue = formData.get("sortOrder");

  if (
    typeof titleValue !== "string" ||
    typeof categoriesValue !== "string" ||
    typeof descriptionValue !== "string" ||
    (publishedValue !== "true" && publishedValue !== "false")
  ) {
    return { error: "Complete all required project fields." };
  }

  const title = titleValue.trim();
  const description = descriptionValue.trim();
  const categories = [
    ...new Set(
      categoriesValue
        .split(",")
        .map((category) => category.trim())
        .filter(Boolean)
    ),
  ];
  const sortOrderText =
    typeof sortOrderValue === "string" ? sortOrderValue.trim() : "0";
  const sortOrder = sortOrderText === "" ? 0 : Number(sortOrderText);

  if (!title || title.length > 120) {
    return { error: "Project names must be between 1 and 120 characters." };
  }

  if (
    categories.length === 0 ||
    categories.length > 8 ||
    categories.some((category) => category.length > 60)
  ) {
    return {
      error: "Add between 1 and 8 categories, each no longer than 60 characters.",
    };
  }

  if (description.length > 500) {
    return { error: "Project descriptions must be 500 characters or fewer." };
  }

  if (
    !Number.isInteger(sortOrder) ||
    sortOrder < 0 ||
    sortOrder > 10000
  ) {
    return { error: "Sort order must be a whole number between 0 and 10000." };
  }

  const clientValue = formData.get("client");
  const yearValue = formData.get("year");
  const liveUrlValue = formData.get("liveUrl");

  const client =
    typeof clientValue === "string" ? clientValue.trim().slice(0, 255) : undefined;
  const year =
    typeof yearValue === "string" ? yearValue.trim().slice(0, 30) : undefined;
  const liveUrl =
    typeof liveUrlValue === "string" ? liveUrlValue.trim().slice(0, 512) : undefined;

  return {
    fields: {
      title,
      categories,
      description,
      isPublished: publishedValue === "true",
      sortOrder,
      client,
      year,
      liveUrl,
    },
  };
}
