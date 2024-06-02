import { z } from "zod";

export const subscriptionFormSchema = z.object({
    name:z.string().trim().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    email: z.string().trim().email({
      message: "Email should be valid.",
    }),
  });