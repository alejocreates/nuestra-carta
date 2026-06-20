import { cache } from "react";
import { db } from "@/lib/db";

export const findMenuById = cache(async (id: string) => {
  const menu = await db.query.menu.findFirst({
    where: (menu, { eq }) => eq(menu.id, id),
    with: { categories: { with: { items: true } } },
  });

  if (!menu) return null;

  return {
    id: menu.id,
    title: menu.name,
    config: menu.config,
    categories: menu.categories.map((category) => ({
      id: category.id,
      title: category.name,
      order: category.order,
      items: category.items.map((item) => ({
        id: item.id,
        title: item.name,
        order: item.order,
      })),
    })),
  };
});
