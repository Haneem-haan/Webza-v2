import "server-only";

import { getAuth } from "@/lib/auth";

type AdminAccess =
  | { ok: true; userId: string }
  | { ok: false; response: Response };

export async function requireAdmin(request: Request): Promise<AdminAccess> {
  const session = await getAuth().api.getSession({ headers: request.headers });

  if (!session) {
    return {
      ok: false,
      response: Response.json({ error: "Authentication is required." }, { status: 401 }),
    };
  }

  if (session.user.role !== "admin") {
    return {
      ok: false,
      response: Response.json({ error: "Administrator access is required." }, { status: 403 }),
    };
  }

  return { ok: true, userId: session.user.id };
}
