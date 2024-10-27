"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CreateTraductionSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { Input } from "@/components/ui/input";

export function AddTraductionForm() {
  const user = useCurrentUser();
  const [montant, setMontant] = useState<number | null>(null);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const [nom, prenom] = user?.name
    .split(" ")
    .map((item: any) => item.trim()) || ["", ""];

  const form = useForm<z.infer<typeof CreateTraductionSchema>>({
    resolver: zodResolver(CreateTraductionSchema),
    defaultValues: {
      nom,
      prenom,
      email: user?.email || "",
    },
  });

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) =>
      fileStates.map((file) =>
        file.key === key ? { ...file, progress } : file
      )
    );
  }

  const onSubmit = async (values: z.infer<typeof CreateTraductionSchema>) => {
    if (fileStates.length === 0) {
      toast.error("Erreur!!!", {
        description: "Veuillez sélectionner le fichier à traduire",
      });
      return;
    }

    setLoading(true);

    try {
      for (const fileState of fileStates) {
        const res = await edgestore.document.upload({
          options: { temporary: true },
          file: fileState.file,
          input: { type: "profile" },
          onProgressChange: (progress) => {
            updateFileProgress(fileState.key, progress);
            if (progress === 100) {
              setTimeout(
                () => updateFileProgress(fileState.key, "COMPLETE"),
                1000
              );
            }
          },
        });

        const pageCount = await getPDFPageCount(res.url);
        if (!pageCount) {
          toast.error("Impossible de calculer le nombre de pages", {
            description:
              "Veuillez réessayer avec un autre fichier PDF, Word, ou Excel",
          });
          return;
        }

        setMontant(pageCount);
        setUrl(res.url);
      }
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        description: "Veuillez réessayer plus tard",
      });
    } finally {
      setLoading(false);
    }
  };

  const validate = async (values: z.infer<typeof CreateTraductionSchema>) => {
    if (!montant) {
      toast.error("Erreur!!!", {
        description: "Montant non calculé",
      });
      return;
    }
    setLoading(true);

    try {
      values.fichier = url;
      values.montant = montant;

      const response = await fetch(`/api/traduction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error("Erreur", {
          description: result.message || `Erreur HTTP: ${response.status}`,
        });
        return;
      }

      if (result.success) {
        try {
          await edgestore.document.confirmUpload({ url });
        } catch (err) {
          console.error("Confirmation d'upload échouée :", err);
          toast.error("Erreur lors de la confirmation d'upload", {
            description: "Réessayez plus tard ou contactez le support.",
          });
          return;
        }

        form.reset();
        setFileStates([]);
        setUrl("");
        router.push(`/traduction/payment?id=${result.message}`);
      } else {
        toast.error("Erreur lors de la validation du fichier", {
          description: result.message,
        });
        await edgestore.myArrowImages.delete({ url });
      }
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      toast.error("Une erreur inattendue s'est produite", {
        description: "Veuillez réessayer plus tard.",
      });
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
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} />
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
                  <Input placeholder="Email de réception" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                        <SelectItem value="français">Français</SelectItem>
                        <SelectItem value="anglais">Anglais</SelectItem>
                        <SelectItem value="espagnol">Espagnol</SelectItem>
                        <SelectItem value="arabe">Arabe</SelectItem>
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
                <FormLabel>Le document sera traduit en:</FormLabel>
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
                        <SelectItem value="français">Français</SelectItem>
                        <SelectItem value="anglais">Anglais</SelectItem>
                        <SelectItem value="espagnol">Espagnol</SelectItem>
                        <SelectItem value="arabe">Arabe</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <MultiFileDropzone
          value={fileStates}
          dropzoneOptions={{ maxFiles: 1 }}
          onChange={(files) => setFileStates(files)}
          onFilesAdded={(addedFiles) =>
            setFileStates([...fileStates, ...addedFiles])
          }
        />

        {montant !== null && (
          <div className="mt-4">
            <p className="text-lg font-bold">
              Montant à payer : {montant.toFixed(2)} €
            </p>
          </div>
        )}

        {montant !== null ? (
          <Button
            type="button"
            disabled={loading}
            onClick={() => validate(form.getValues())}
          >
            {loading ? <BeatLoader /> : "Valider la traduction"}
          </Button>
        ) : (
          <Button
            type="button"
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {loading ? <BeatLoader /> : "Nouvelle traduction"}
          </Button>
        )}
      </form>
    </Form>
  );
}
