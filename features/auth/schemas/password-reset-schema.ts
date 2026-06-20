import z from "zod";

export const passwordResetSchema = z.object({
  newPassword: z.string().min(8).max(96),
});
