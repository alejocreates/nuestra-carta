import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeSearchParam(value: string | string[] | undefined) {
  return !value
    ? null
    : typeof value === "string"
      ? value
      : Array.isArray(value)
        ? value[0]
        : null;
}
