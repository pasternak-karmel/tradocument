"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, X, Eye, Trash2, UserPlus } from "lucide-react";

type TranslatedDocument = {
  id: string;
  title: string;
  translator: string;
  status: "En attente" | "Approuvé" | "Refusé";
};

type User = {
  id: string;
  username: string;
  role: "Traducteur" | "Admin";
};

export default function AdminAuthorization() {
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

  const [users, setUsers] = useState<User[]>([
    { id: "1", username: "jean.dupont", role: "Traducteur" },
    { id: "2", username: "marie.martin", role: "Traducteur" },
    { id: "3", username: "admin1", role: "Admin" },
  ]);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "Traducteur" as "Traducteur" | "Admin",
  });

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

  const handleAddUser = () => {
    if (newUser.username && newUser.password) {
      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          username: newUser.username,
          role: newUser.role,
        },
      ]);
      setNewUser({ username: "", password: "", role: "Traducteur" });
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Page d'autorisation admin</h1>
      <Tabs defaultValue="documents">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">Documents traduits</TabsTrigger>
          <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
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
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>
                Créez, modifiez ou supprimez des comptes utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  Ajouter un nouvel utilisateur
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) =>
                        setNewUser({ ...newUser, username: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Rôle</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value: "Traducteur" | "Admin") =>
                        setNewUser({ ...newUser, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Traducteur">Traducteur</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddUser}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter l'utilisateur
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom d'utilisateur</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
