"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/types/project";

export function usePublishedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", { cache: "no-store" });
        const result: { projects?: Project[]; error?: string } =
          await response.json();

        if (!response.ok || !Array.isArray(result.projects)) {
          throw new Error(result.error ?? "Projects are currently unavailable.");
        }

        if (active) {
          setProjects(result.projects);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Projects are currently unavailable."
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadProjects();
    return () => {
      active = false;
    };
  }, []);

  return { projects, isLoading, error };
}
