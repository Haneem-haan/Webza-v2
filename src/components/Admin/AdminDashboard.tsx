"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import type { ManagedProject } from "@/types/project";
import styles from "./AdminDashboard.module.scss";

interface AdminUser {
  id: string;
  name: string;
  email: string;
}

interface ProjectsResponse {
  projects?: ManagedProject[];
  error?: string;
  warning?: string;
  deleted?: boolean;
}

export default function AdminDashboard() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [projects, setProjects] = useState<ManagedProject[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [editingProject, setEditingProject] =
    useState<ManagedProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  const fetchDashboard = useCallback(async () => {
    const [projectResponse, adminResponse] = await Promise.all([
      fetch("/api/admin/projects", { cache: "no-store" }),
      authClient.admin.listUsers({ query: { limit: 100 } }),
    ]);
    const projectResult: ProjectsResponse = await projectResponse.json();

    if (!projectResponse.ok || !Array.isArray(projectResult.projects)) {
      throw new Error(
        projectResult.error ?? "The project list could not be loaded."
      );
    }

    if (adminResponse.error) {
      throw new Error(
        adminResponse.error.message ??
          "Administrator accounts could not be loaded."
      );
    }

    return {
      projects: projectResult.projects,
      admins: (adminResponse.data?.users ?? []).filter(
        (user) => user.role === "admin"
      ),
    };
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      const dashboard = await fetchDashboard();
      setError("");
      setProjects(dashboard.projects);
      setAdmins(dashboard.admins);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "The dashboard could not be loaded."
      );
    } finally {
      setIsLoading(false);
    }
  }, [fetchDashboard]);

  useEffect(() => {
    if (session?.user.role !== "admin") {
      return;
    }

    let active = true;
    async function loadInitialDashboard() {
      try {
        const dashboard = await fetchDashboard();
        if (active) {
          setError("");
          setProjects(dashboard.projects);
          setAdmins(dashboard.admins);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "The dashboard could not be loaded."
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialDashboard();
    return () => {
      active = false;
    };
  }, [fetchDashboard, session?.user.id, session?.user.role]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    const formData = new FormData(event.currentTarget);
    try {
      const result = await authClient.signIn.email({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      if (result.error) {
        setLoginError(result.error.message ?? "Sign-in failed.");
      }
    } catch (signInError) {
      setLoginError(
        signInError instanceof Error ? signInError.message : "Sign-in failed."
      );
    }
  }

  async function handleProjectSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setError("");
    setMessage("");
    setIsSaving(true);

    try {
      const response = await fetch(
        editingProject
          ? `/api/admin/projects/${editingProject.id}`
          : "/api/admin/projects",
        {
          method: editingProject ? "PATCH" : "POST",
          body: formData,
        }
      );
      const result: ProjectsResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "The project could not be saved.");
      }

      setEditingProject(null);
      form.reset();
      setMessage(editingProject ? "Project updated." : "Project uploaded.");
      setIsLoading(true);
      await loadDashboard();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "The project could not be saved."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleProjectDelete(project: ManagedProject) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
      });
      const result: ProjectsResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "The project could not be deleted.");
      }

      if (editingProject?.id === project.id) {
        setEditingProject(null);
      }

      setMessage(
        result.warning ??
          (result.deleted ? "Project deleted." : "Project removed.")
      );
      setIsLoading(true);
      await loadDashboard();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "The project could not be deleted."
      );
    }
  }

  async function handleAdminCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setError("");
    setMessage("");

    try {
      const result = await authClient.admin.createUser({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        role: "admin",
      });

      if (result.error) {
        setError(result.error.message ?? "The administrator could not be created.");
        return;
      }

      form.reset();
      setMessage("Administrator account created.");
      setIsLoading(true);
      await loadDashboard();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "The administrator could not be created."
      );
    }
  }

  async function handleSignOut() {
    try {
      await authClient.signOut();
      setProjects([]);
      setAdmins([]);
      setMessage("");
      setError("");
    } catch (signOutError) {
      setError(
        signOutError instanceof Error
          ? signOutError.message
          : "Could not sign out."
      );
    }
  }

  if (isSessionPending) {
    return (
      <main className={styles.page}>
        <p className={styles.status} role="status">
          Checking administrator session...
        </p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className={styles.page}>
        <section className={styles.loginCard} aria-labelledby="admin-title">
          <Link className={styles.brand} href="/">
            WEBZA<span>.</span>
          </Link>
          <p className={styles.eyebrow}>SECURE WORKSPACE</p>
          <h1 id="admin-title">Administrator sign in</h1>
          <p className={styles.intro}>
            Sign in with an account created by a Webza administrator.
          </p>
          <form className={styles.form} onSubmit={handleLogin}>
            <label>
              Email
              <input
                autoComplete="username"
                name="email"
                type="email"
                required
              />
            </label>
            <label>
              Password
              <input
                autoComplete="current-password"
                name="password"
                type="password"
                required
              />
            </label>
            {loginError && (
              <p className={styles.error} role="alert">
                {loginError}
              </p>
            )}
            <button className={styles.primaryButton} type="submit">
              Sign in
            </button>
          </form>
          <Link className={styles.backLink} href="/">
            Back to Webza
          </Link>
        </section>
      </main>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <main className={styles.page}>
        <section className={styles.loginCard}>
          <p className={styles.eyebrow}>ACCESS DENIED</p>
          <h1>Administrator access required</h1>
          <button
            className={styles.secondaryButton}
            onClick={() => void handleSignOut()}
            type="button"
          >
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <div>
            <Link className={styles.brand} href="/">
              WEBZA<span>.</span>
            </Link>
            <p className={styles.eyebrow}>PORTFOLIO CONTROL ROOM</p>
            <h1>Manage your work</h1>
          </div>
          <div className={styles.account}>
            <span>{session.user.email}</span>
            <button
              className={styles.secondaryButton}
              onClick={() => void handleSignOut()}
              type="button"
            >
              Sign out
            </button>
          </div>
        </header>

        {(error || message) && (
          <p className={error ? styles.error : styles.notice} role="status">
            {error || message}
          </p>
        )}

        <div className={styles.managementGrid}>
          <section className={styles.panel} aria-labelledby="project-form-title">
            <div className={styles.panelHeading}>
              <p className={styles.eyebrow}>
                {editingProject ? "EDIT PROJECT" : "NEW PROJECT"}
              </p>
              <h2 id="project-form-title">
                {editingProject ? "Update project" : "Upload a project"}
              </h2>
            </div>
            <form
              key={editingProject?.id ?? "new-project"}
              className={styles.form}
              onSubmit={handleProjectSave}
            >
              <label>
                Project name
                <input
                  autoComplete="off"
                  defaultValue={editingProject?.title ?? ""}
                  maxLength={120}
                  name="title"
                  required
                />
              </label>
              <label>
                Categories
                <input
                  defaultValue={editingProject?.categories.join(", ") ?? ""}
                  maxLength={512}
                  name="categories"
                  placeholder="Branding, Web Design"
                  required
                />
                <span className={styles.hint}>
                  Separate categories with commas.
                </span>
              </label>
              <label>
                Short description
                <textarea
                  defaultValue={editingProject?.description ?? ""}
                  maxLength={500}
                  name="description"
                  rows={3}
                />
              </label>
              {!editingProject && (
                <label>
                  Cover image
                  <input
                    accept="image/jpeg,image/png,image/webp"
                    name="image"
                    required
                    type="file"
                  />
                  <span className={styles.hint}>
                    JPEG, PNG, or WebP; maximum 10 MB.
                  </span>
                </label>
              )}
              {editingProject && (
                <p className={styles.hint}>
                  The current cover image is kept. Delete and recreate the
                  project to replace it.
                </p>
              )}
              <div className={styles.inlineFields}>
                <label>
                  Visibility
                  <select
                    defaultValue={
                      editingProject
                        ? editingProject.isPublished
                          ? "true"
                          : "false"
                        : "true"
                    }
                    name="isPublished"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </label>
                <label>
                  Display order
                  <input
                    defaultValue={editingProject?.sortOrder ?? 0}
                    max={10000}
                    min={0}
                    name="sortOrder"
                    type="number"
                  />
                </label>
              </div>
              <div className={styles.formActions}>
                <button
                  className={styles.primaryButton}
                  disabled={isSaving}
                  type="submit"
                >
                  {isSaving
                    ? "Saving..."
                    : editingProject
                      ? "Save changes"
                      : "Upload project"}
                </button>
                {editingProject && (
                  <button
                    className={styles.secondaryButton}
                    onClick={() => setEditingProject(null)}
                    type="button"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className={styles.panel} aria-labelledby="admins-title">
            <div className={styles.panelHeading}>
              <p className={styles.eyebrow}>TEAM ACCESS</p>
              <h2 id="admins-title">Add an administrator</h2>
            </div>
            <p className={styles.intro}>
              New administrators can sign in and manage projects and accounts.
            </p>
            <form className={styles.form} onSubmit={handleAdminCreate}>
              <label>
                Name
                <input autoComplete="name" name="name" required />
              </label>
              <label>
                Email
                <input
                  autoComplete="email"
                  name="email"
                  required
                  type="email"
                />
              </label>
              <label>
                Temporary password
                <input
                  autoComplete="new-password"
                  minLength={12}
                  name="password"
                  required
                  type="password"
                />
                <span className={styles.hint}>
                  Use at least 12 characters and share it securely.
                </span>
              </label>
              <button className={styles.primaryButton} type="submit">
                Create administrator
              </button>
            </form>
            <div className={styles.adminList}>
              <h3>Administrators ({admins.length})</h3>
              {admins.map((admin) => (
                <p key={admin.id}>
                  <span>{admin.name}</span>
                  <span>{admin.email}</span>
                </p>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.projectList} aria-labelledby="projects-title">
          <div className={styles.listHeading}>
            <div>
              <p className={styles.eyebrow}>PORTFOLIO</p>
              <h2 id="projects-title">Projects ({projects.length})</h2>
            </div>
            <button
              className={styles.secondaryButton}
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                void loadDashboard();
              }}
              type="button"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          {projects.length === 0 ? (
            <p className={styles.emptyState}>
              {isLoading ? "Loading projects..." : "No projects uploaded yet."}
            </p>
          ) : (
            <div className={styles.projectListGrid}>
              {projects.map((project) => (
                <article className={styles.projectCard} key={project.id}>
                  <div className={styles.projectImage}>
                    <Image
                      alt=""
                      fill
                      sizes="(max-width: 700px) 40vw, 180px"
                      src={project.image}
                    />
                  </div>
                  <div className={styles.projectInfo}>
                    <span
                      className={
                        project.isPublished
                          ? styles.published
                          : styles.draft
                      }
                    >
                      {project.isPublished ? "Published" : "Draft"}
                    </span>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                  <div className={styles.projectActions}>
                    <button
                      className={styles.secondaryButton}
                      onClick={() => setEditingProject(project)}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className={styles.secondaryButton}
                      onClick={() => void handleProjectDelete(project)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
