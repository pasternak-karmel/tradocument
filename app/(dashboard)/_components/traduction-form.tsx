"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateTraductionSchema } from "@/schemas";

import { useRouter } from "next/navigation";

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { getPDFPageCount } from "@/actions/calculate_montant_page";

export function AddTraductionForm() {
  const [montant, setMontant] = useState<number | null>(null);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [url, seturl] = useState("");
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateTraductionSchema>>({
    resolver: zodResolver(CreateTraductionSchema),
    defaultValues: {},
  });

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const onSubmit = async (values: z.infer<typeof CreateTraductionSchema>) => {
    setLoading(true);

    // console.log("here");
    try {
      if (fileStates.length === 0) {
        return toast.error("Erreur!!!", {
          description: "Veuillez sélectionner le fichier a traduire",
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });
      }

      if (!montant)
        return toast.error("Erreur!!!", {
          description: "Montant non calculer",
          action: { label: "Fermer", onClick: () => console.log("Undo") },
        });

      values.fichier = url;

      const response = await fetch(`/api/traduction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const result = await response.json();
        if (response.status === 401 || response.status === 400) {
          toast.error("Erreur", {
            description: result.message,
            action: { label: "Fermer", onClick: () => console.log("Undo") },
          });
        } else {
          throw new Error(
            result.message || `HTTP error! status: ${response.status}`
          );
        }
        return;
      }

      const result = await response.json();
      if (result.success) {
        await edgestore.document.confirmUpload({ url });
        form.reset();
        setFileStates([]);
        seturl("");
        router.push(`/traduction/payment?id=${result.message}`);
      } else {
        await edgestore.myArrowImages.delete({ url });
        return;
      }
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        description: "Veuillez réessayer plus tard",
        action: { label: "Fermer", onClick: () => console.log("Undo") },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 grid gap-4 py-4"
      >
        <FormField
          control={form.control}
          name="traduire_de"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Langue du document</FormLabel>
              <FormControl>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg">
                    <SelectValue placeholder="Sélectionnez une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Langue</SelectLabel>
                      <SelectItem value="français">français</SelectItem>
                      <SelectItem value="anglais">anglais</SelectItem>
                      <SelectItem value="espagnol">espagnol</SelectItem>
                      <SelectItem value="arabe">arabe</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="traduire_pour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Le document sera traduis en:</FormLabel>
              <FormControl>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-lg">
                    <SelectValue placeholder="Sélectionnez une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Langue</SelectLabel>
                      <SelectItem value="français">français</SelectItem>
                      <SelectItem value="anglais">anglais</SelectItem>
                      <SelectItem value="espagnol">espagnol</SelectItem>
                      <SelectItem value="arabe">arabe</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <MultiFileDropzone
          value={fileStates}
          dropzoneOptions={{
            maxFiles: 1,
          }}
          onChange={(files) => {
            setFileStates(files);
          }}
          onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
              addedFiles.map(async (addedFileState) => {
                try {
                  const res = await edgestore.document.upload({
                    options: { temporary: true },
                    file: addedFileState.file,
                    input: { type: "profile" },
                    onProgressChange: async (progress) => {
                      updateFileProgress(addedFileState.key, progress);
                      if (progress === 100) {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        updateFileProgress(addedFileState.key, "COMPLETE");
                      }
                    },
                  });

                  const pageCount = await getPDFPageCount(res.url);
                  if (!pageCount) {
                    // throw new Error(
                    //   "Impossible de calculer le nombre de pages."
                    // );
                    toast.error("Impossible de calculer le nombre de pages", {
                      description:
                        "Veuillez réessayer avec un autre fichier...",
                      action: {
                        label: "Fermer",
                        onClick: () => console.log("Undo"),
                      },
                    });
                  }

                  setMontant(pageCount);

                  seturl(res.url);
                } catch (err) {
                  updateFileProgress(addedFileState.key, "ERROR");
                }
              })
            );
          }}
        />

        {montant !== null && (
          <div className="mt-4">
            <p className="text-lg font-bold">Montant à payer : {montant} €</p>
          </div>
        )}

        <Button type="submit" disabled={montant === null || loading}>
          {loading ? "en cours..." : "Nouvelle traduction"}
        </Button>
      </form>
    </Form>
  );
}
