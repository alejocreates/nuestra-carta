import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { sanitizeSearchParam } from "@/lib/utils";
import { findMenuById } from "@/server/menus";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> => {
  const query = await searchParams;
  const menuId = sanitizeSearchParam(query.carta);
  if (!menuId) redirect("/");
  const menu = await findMenuById(menuId);
  if (!menu) notFound();

  return { title: menu ? { absolute: menu.title } : "No se encontró la carta" };
};

export default async function ViewMenuPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const menuId = sanitizeSearchParam(query.carta);
  if (!menuId) redirect("/");
  const menu = await findMenuById(menuId);
  if (!menu) notFound();

  return menu.title;
}
