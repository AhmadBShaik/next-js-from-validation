"use client";
import { onSubmitSubscriptionAction } from "@/app/actions/subscriptionFormAction";
import { subscriptionFormSchema } from "@/app/schemas/subscriptionFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "react-dom";

function SubscriptionForm() {
  const [state, formAction] = useFormState(onSubmitSubscriptionAction, {
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: "",
      email: "",
      ...(state.fields ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="min-h-dvh flex justify-center items-center">
      <div className="bg-blue-100 w-full max-w-sm mx-auto p-2.5">
        {state.message && !state.issues ? (
          <p className={state.isSuccessful ? "text-green-500" : "text-red-500"}>
            {state.message}
          </p>
        ) : (
          ""
        )}
        <Form.Root
          action={formAction}
          ref={formRef}
          onSubmit={handleSubmit(() => formRef.current?.submit())}
          className="space-y-2"
        >
          <Form.Field className="w-full" name="name">
            <div className="flex flex-col">
              <Form.Label className="text-black">Name</Form.Label>
              {errors.name && (
                <Form.Message className="text-red-500">
                  {errors.name.message}
                </Form.Message>
              )}
              {state.issues?.find((issue) => issue.path.includes("name"))
                ?.message ? (
                <Form.Message className="text-red-500">
                  {
                    state.issues?.find((issue) => issue.path.includes("name"))
                      ?.message
                  }
                </Form.Message>
              ) : null}
            </div>
            <Form.Control asChild>
              <input
                className="w-full px-2 py-1.5 rounded"
                {...register("name")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="w-full" name="email">
            <div className="flex flex-col">
              <Form.Label className="text-black">Email</Form.Label>
              {errors.email && (
                <Form.Message className="text-red-500">
                  {errors.email.message}
                </Form.Message>
              )}
              {state.issues?.find((issue) => issue.path.includes("email"))
                ?.message ? (
                <Form.Message className="text-red-500">
                  {
                    state.issues?.find((issue) => issue.path.includes("email"))
                      ?.message
                  }
                </Form.Message>
              ) : null}
            </div>
            <Form.Control asChild>
              <input
                className="w-full px-2 py-1.5 rounded"
                {...register("email")}
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button
              className="bg-blue-500 text-white rounded w-full px-2 py-1.5"
              style={{ marginTop: 10 }}
            >
              Subscribe
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}

export default SubscriptionForm;
