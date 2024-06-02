"use server";

import { ZodIssue } from "zod";
import { subscriptionFormSchema } from "../schemas/subscriptionFormSchema";

interface FormState {
  message: string;
  fields?: Record<string, string>;
  issues?: Array<ZodIssue>;
  isSuccessful?: boolean;
}

export const onSubmitSubscriptionAction = async (
  prevState: FormState,
  data: FormData
): Promise<FormState> => {
  const formData = {
    name: data.get("name"),
    email: data.get("email"),
  };

  const parsed = subscriptionFormSchema.safeParse(formData);
  if (!parsed.success) {
    console.log("error", parsed.error);

    return {
      message: "error",
      issues: parsed.error.issues,
      isSuccessful: false,
    };
  }

  if (parsed.data?.email === "abc@example.com") {
    console.log("already exists!");
    return {
      message: "Email already exists",
      fields: parsed.data,
      isSuccessful: false,
    };
  }
  console.log("success");
  return { message: "Subscribed!", isSuccessful: true };
};
