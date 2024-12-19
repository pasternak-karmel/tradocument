"use client";

import { CreateProcuration } from "@/actions/users";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEdgeStore } from "@/lib/edgestore";
import { ProcurationUser } from "@/lib/mail";
import { ProcurationFormData, ProcurationFormSchema } from "@/schemas";
import { generatePDF } from "@/utils/generate-pdf";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FileState } from "../multi-file";
import { FormStep1 } from "./procuration/FormStep1";
import { FormStep2 } from "./procuration/FormStep2";
import { FormStep3 } from "./procuration/FormStep3";
import { PreviewCard } from "./procuration/PreviewCard";
import { StepNavigation } from "./procuration/StepNavigation";

export default function ProcurationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const { edgestore } = useEdgeStore();
  const user = useCurrentUser();
  const router = useRouter();

  const form = useForm<ProcurationFormData>({
    resolver: zodResolver(ProcurationFormSchema),
    defaultValues: {
      // documents: [],
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: ProcurationFormData) => {
    if (!user) return router.push(`/ma-procuration`);

    if (fileStates.length === 0) {
      setError("Veuillez importer votre pièce d'identité ou votre passeport");
      return;
    }

    setLoading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      const imageUrls = await uploadFiles(fileStates, "document");

      data.pieceIdentite = imageUrls
        .filter(Boolean)
        .map((urlObj) => urlObj!.url);

      const result = await CreateProcuration(data);

      if (result?.error) {
        handleError(result.error, data.pieceIdentite);
      } else if (result?.success) {
        await handleSuccess(result.message, data);
      } else if (result?.maj) {
        setSuccess(result.message);
      }
    } catch (err) {
      setError("Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async (files: FileState[], type: string) => {
    return Promise.all(
      files.map(async (fileState) => {
        if (fileState.file instanceof File) {
          try {
            return await edgestore.document.upload({
              options: { temporary: true },
              file: fileState.file,
              input: { type: "post" },
              onProgressChange: (progress) => {
                updateFileProgress(fileState.key, progress);
              },
            });
          } catch (err) {
            console.error(`Erreur lors de l'upload du ${type}:`, err);
            return null;
          }
        }
        return null;
      })
    );
  };

  const handleError = async (errorMessage: string, urls: string[]) => {
    for (const url of urls) {
      await edgestore.document.delete({ url });
    }
    resetForm();
    setError(errorMessage);
  };

  const handleSuccess = async (message: string, data: ProcurationFormData) => {
    for (const url of data.pieceIdentite!) {
      await edgestore.document.confirmUpload({ url });
    }
    await ProcurationUser(data);
    if (data.pieceIdentite?.[0]) {
      await generatePDF(data);
    }
    setSuccess(message);
    resetForm();
  };

  const resetForm = () => {
    form.reset();
    setStep(1);
    setFileStates([]);
  };

  const updateFileProgress = (key: string, progress: FileState["progress"]) => {
    setFileStates((prevStates) => {
      const newStates = [...prevStates];
      const fileState = newStates.find((state) => state.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
      return newStates;
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FormStep1 form={form} loading={loading} />;
      case 2:
        return <FormStep2 form={form} loading={loading} />;
      case 3:
        return (
          <FormStep3
            form={form}
            loading={loading}
            fileStates={fileStates}
            setFileStates={setFileStates}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-16 mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-indigo-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Création de Procuration
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Formulaire de Procuration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
              {step < 3 && (
                <StepNavigation
                  step={step}
                  setStep={setStep}
                  loading={loading}
                  form={form}
                  onSubmit={form.handleSubmit(onSubmit)}
                />
              )}
            </form>
            <FormError message={error || ""} />
            <FormSuccess message={success} />
          </CardContent>
        </Card>
        <PreviewCard formData={form.watch()} />
      </div>
    </div>
  );
}
