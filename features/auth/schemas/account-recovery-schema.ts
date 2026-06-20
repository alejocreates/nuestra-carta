import z from "zod";

export const accountRecoverySchema = z.object({
  email: z.email(),
});
