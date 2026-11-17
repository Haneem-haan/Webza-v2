import type { Metadata } from "next";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Portfolio Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
