import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { sanitizeSearchParam } from "@/lib/utils";
import { findMenuById } from "@/server/menus";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getMenu({ searchParams }: PageProps) {
  const query = await searchParams;
  const menuId = sanitizeSearchParam(query.menu);
  if (!menuId) redirect("/");
  const menu = await findMenuById(menuId);
  if (!menu) notFound();
  return menu;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const menu = await getMenu({ searchParams });
  return { title: menu.title };
}

export default async function ViewMenuPage({ searchParams }: PageProps) {
  const menu = await getMenu({ searchParams });
  return menu.title;
}
