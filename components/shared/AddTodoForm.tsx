"use client";

import React, { useState, useTransition } from "react";
import { CustomField } from "./CustomField";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { formSchema } from "@/validations";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { handleError } from "@/lib/utils";
import { createTodo } from "@/lib/actions/todo.actions";
import { updateCredits } from "@/lib/actions/user.actions";
import { creditFee } from "@/constants";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";

const AddTodoForm = ({ userId, creditBalance }: TodoAddTodoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const todo = {
        title: values.title,
        content: values.content,
      };

      const newTodo = await createTodo(userId, todo);
      if (newTodo) {
        startTransition(async () => {
          await updateCredits(userId, creditFee);
        });
        form.reset();
      }
    } catch (error) {
      handleError(error);
    } finally {
    }
    setIsSubmitting(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}

          <CustomField
            control={form.control}
            name="title"
            formLabel="Title"
            className="w-full"
            render={({ field }) => <Input {...field} className="input-field" />}
          />

          <CustomField
            control={form.control}
            name="content"
            formLabel="Content"
            className="w-full"
            render={({ field }) => (
              <Textarea {...field} className="input-field" />
            )}
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="submit-button capitalize"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add new todo"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddTodoForm;
