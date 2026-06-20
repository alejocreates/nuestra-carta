import { cache } from "react";
import { db } from "@/lib/db";

export const findMenuById = cache(async (id: string) => {
  return db.query.menu.findFirst({ where: (menu, { eq }) => eq(menu.id, id) });
});
