"use client";

import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Check, X, Eye } from "lucide-react";

import { TranslatedDocument } from "@/types";

const AuthorizeDocument = () => {
  const [documents, setDocuments] = useState<TranslatedDocument[]>([
    {
      id: "1",
      title: "Document 1",
      translator: "Jean Dupont",
      status: "En attente",
    },
    {
      id: "2",
      title: "Document 2",
      translator: "Marie Martin",
      status: "En attente",
    },
    {
      id: "3",
      title: "Document 3",
      translator: "Pierre Bernard",
      status: "Approuvé",
    },
  ]);

  const handleDocumentAction = (
    documentId: string,
    action: "approve" | "reject"
  ) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === documentId
          ? { ...doc, status: action === "approve" ? "Approuvé" : "Refusé" }
          : doc
      )
    );
  };
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
              <TableHead>Titre du document</TableHead>
              <TableHead>Traducteur</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.translator}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doc.status === "Approuvé"
                        ? "default"
                        : doc.status === "Refusé"
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
                          <DialogTitle>{doc.title}</DialogTitle>
                          <DialogDescription>
                            Traduit par {doc.translator}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <p>Contenu du document traduit...</p>
                        </div>
                        <DialogFooter className="mt-4">
                          <Button
                            onClick={() =>
                              handleDocumentAction(doc.id, "approve")
                            }
                            disabled={doc.status !== "En attente"}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Approuver
                          </Button>
                          <Button
                            onClick={() =>
                              handleDocumentAction(doc.id, "reject")
                            }
                            variant="destructive"
                            disabled={doc.status !== "En attente"}
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
