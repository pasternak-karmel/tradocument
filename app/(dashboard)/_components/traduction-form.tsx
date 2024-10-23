"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateLivreurSchema } from "@/schemas";
import { Input } from "@/components/ui/input";

export function AddTraductionForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof CreateLivreurSchema>>({
    resolver: zodResolver(CreateLivreurSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (updatedData: any) => {
      // const response = await LivreurCreated(updatedData);
      // if (response.error) {
      // } else {
      // }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["GetAllLivreur"],
        exact: true,
        refetchType: "active",
      });
      form.reset();
    },
  });

  function onSubmit(data: z.infer<typeof CreateLivreurSchema>) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 grid gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom du livreur" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="L'email du livreur" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "en cours..." : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
