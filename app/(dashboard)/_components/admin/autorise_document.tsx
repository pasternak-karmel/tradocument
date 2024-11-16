"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TRADUCTION } from "@/db/schema";
import { Check, Eye, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AuthorizeDocument = () => {
  const [documents, setDocuments] = useState<TRADUCTION[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/admin/fichier");
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentAction = async (
    documentId: string,
    action: "approve" | "reject"
  ) => {
    try {
      const response = await fetch(`/api/admin/fichier`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId,
          status: action === "approve" ? "completed" : "rejected",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update document status");
      }

      setDocuments(
        documents.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: action === "approve" ? "completed" : "rejected",
              }
            : doc
        )
      );

      toast.success(
        `Document ${
          action === "approve" ? "approved" : "rejected"
        } successfully`
      );
    } catch (error) {
      console.error("Error updating document status:", error);
      toast.error("Failed to update document status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents traduits en attente d'approbation</CardTitle>
        <CardDescription>
          Approuvez ou refusez les documents traduits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.nom}</TableCell>
                <TableCell>{doc.prenom}</TableCell>
                <TableCell>{doc.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doc.status === "completed"
                        ? "default"
                        : doc.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{`${doc.nom} ${doc.prenom}`}</DialogTitle>
                          <DialogDescription>
                            Email: {doc.email}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <p>Montant: {doc.montant}</p>
                          <p>De: {doc.traduction_from}</p>
                          <p>Vers: {doc.traduction_to}</p>
                          <p>
                            Fichier original:{" "}
                            <a
                              href={doc.fichier}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Voir le fichier
                            </a>
                          </p>
                          {doc.fichierTraduis && (
                            <p>
                              Fichier traduit:{" "}
                              <a
                                href={doc.fichierTraduis}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Voir la traduction
                              </a>
                            </p>
                          )}
                        </div>
                        <DialogFooter className="mt-4">
                          <Button
                            onClick={() =>
                              handleDocumentAction(doc.id, "approve")
                            }
                            disabled={doc.status !== "in progress"}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Approuver
                          </Button>
                          <Button
                            onClick={() =>
                              handleDocumentAction(doc.id, "reject")
                            }
                            variant="destructive"
                            disabled={doc.status !== "in progress"}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Refuser
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AuthorizeDocument;
