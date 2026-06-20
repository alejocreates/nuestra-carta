import { requiresAuth } from "@/features/auth/utils/requires-auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requiresAuth();
  return children;
}
