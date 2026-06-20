import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const menu = pgTable("menu", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
});
