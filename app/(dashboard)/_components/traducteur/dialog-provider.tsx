"use client";

import { FileState, MultiFileDropzone } from "@/components/multi-file";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { acceptedFileTypes } from "@/type";
import { FileUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DialogProps {
  id: string;
}

export function UploadFileDialog({ id }: DialogProps) {
  const [open, setOpen] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) =>
      fileStates.map((file) =>
        file.key === key ? { ...file, progress } : file
      )
    );
  }

  const onSubmit = async () => {
    if (fileStates.length === 0) {
      toast.error("Erreur!!!", {
        description: "Veuillez sélectionner le fichier traduit",
      });
      return;
    }

    setLoading(true);

    try {
      for (const fileState of fileStates) {
        const res = await edgestore.document.upload({
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
        setUrl(res.url);
      }

      const result = await fetch(`/api/traducteur/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, url: url }),
      });

      if (!result.ok) {
        throw new Error("Failed to upload file");
      }

      const response = await result.json();
      if (response.error) {
        throw new Error(response.error);
      }

      toast.success("Fichier uploadé avec succès");
      setOpen(false);
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        description:
          error instanceof Error
            ? error.message
            : "Veuillez réessayer plus tard",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <FileUp className="h-4 w-4" />
          <span className="sr-only">Upload translated file</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Translated File</DialogTitle>
          <DialogDescription>
            Upload the translated file for ID: {id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <MultiFileDropzone
            disabled={loading}
            value={fileStates}
            dropzoneOptions={{
              maxFiles: 1,
              accept: acceptedFileTypes,
            }}
            onChange={setFileStates}
            onFilesAdded={(addedFiles) =>
              setFileStates([...fileStates, ...addedFiles])
            }
          />
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSubmit} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
