"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface UserRejoindre {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
}

export default function AuthorizeUser() {
  const queryClient = useQueryClient();

  const {
    data: pendingUsers = [],
    isLoading,
    error,
  } = useQuery<UserRejoindre[]>({
    queryKey: ["pending-users"],
    queryFn: async () => {
      const response = await fetch("/api/pending-users");
      if (!response.ok) {
        throw new Error("Failed to fetch pending users");
      }
      return response.json();
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/pending-users/${userId}/approve`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to approve user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
      toast({ title: "User approved successfully" });
    },
    onError: (error) => {
      toast({
        title: "Failed to approve user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/pending-users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
      toast({ title: "User deleted successfully" });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidatures en attente</CardTitle>
        <CardDescription>Validez ou supprimez les candidatures</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Spécialité</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{`${user.nom} ${user.prenom}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.specialite}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => approveMutation.mutate(user.id)}
                    variant="secondary"
                    size="sm"
                    disabled={
                      approveMutation.isPending || deleteMutation.isPending
                    }
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approuver
                  </Button>
                  <Button
                    onClick={() => deleteMutation.mutate(user.id)}
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    // disabled={
                    //   approveMutation.isLoading || deleteMutation.isLoading
                    // }
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
  );
}
