"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/hooks/useAdmin";
import { toast } from "sonner";

const FormSchema = z.object({
  agentId: z.string({
    required_error: "Please select an traducteur.",
  }),
});

const SelectTraducteur = ({ traduction }: { traduction: string }) => {
  const { AllTraducteur, isLoading, isError, updateTraduction } = useAdmin();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    updateTraduction({ traductionId: traduction, userId: data.agentId });
    toast.success("All changes saved successfully");
  }

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="agentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Traducteur</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a traducteur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AllTraducteur.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id!}>
                      {agent.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Attribuer</Button>
      </form>
    </Form>
  );
};
export default SelectTraducteur;
