"use client";

import { CreateTraducteur } from "@/actions/getTraductions";
import { ShowDestructive, ShowError } from "@/components/sonner-component";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddTraducteur } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";

export function AddTraducteurForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof AddTraducteur>>({
    resolver: zodResolver(AddTraducteur),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof AddTraducteur>) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await CreateTraducteur(values);
      if (response.error) {
        ShowError(response.error);
        return;
      }
    } catch (error) {
      console.error(error);
      ShowError("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-auto space-y-1 grid gap-6"
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nom du traducteur"
                    {...field}
                  />
                </FormControl>
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
                  <Input
                    disabled={loading}
                    placeholder="Email du traducteur"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Le mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Laissez vide si vous souhaitez générez un automatiquement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rôle</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg">
                      <SelectValue placeholder="Sélectionnez un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Rôle</SelectLabel>
                        <SelectItem value="traducteur">Traducteur</SelectItem>
                        <SelectItem value="coursier">
                          Transport coursier
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">{loading ? <BeatLoader /> : "Créer"}</Button>
      </form>
    </Form>
  );
}
