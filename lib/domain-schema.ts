import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

import type { MenuConfig } from "@/features/menus/types/menu-config";
import { defaultMenuConfig } from "@/features/menus/utils/default-menu-config";
import { user } from "./auth-schema";

export const business = pgTable("business", {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  description: text(),
  address: text(),
  image: text(),
  userId: text("user_id")
    .unique()
    .notNull()
    .references(() => user.id),
});

export const menu = pgTable("menu", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  config: jsonb().notNull().default(defaultMenuConfig).$type<MenuConfig>(),
  businessId: uuid("business_id")
    .notNull()
    .references(() => business.id),
});

export const category = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  order: integer().notNull(),
  menuId: uuid("menu_id")
    .notNull()
    .references(() => menu.id),
});

export const item = pgTable("item", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  order: integer().notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id),
});

export const businessRelations = relations(business, ({ one, many }) => ({
  user: one(user, {
    fields: [business.userId],
    references: [user.id],
  }),
  menus: many(menu),
}));

export const menuRelations = relations(menu, ({ one, many }) => ({
  business: one(business, {
    fields: [menu.businessId],
    references: [business.id],
  }),
  categories: many(category),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
  menu: one(menu, {
    fields: [category.menuId],
    references: [menu.id],
  }),
  items: many(item),
}));

export const itemRelations = relations(item, ({ one }) => ({
  category: one(category, {
    fields: [item.categoryId],
    references: [category.id],
  }),
}));
