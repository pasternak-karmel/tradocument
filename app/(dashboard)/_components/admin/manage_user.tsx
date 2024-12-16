"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface Users {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ManageUsers() {
  const queryClient = useQueryClient();

  const {
    data: pendingUsers = [],
    isLoading,
    error,
  } = useQuery<Users[]>({
    queryKey: ["All-users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/getUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch all users");
      }
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/admin/getUsers`, {
        method: "DELETE",
        body: JSON.stringify({
          id: userId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["All-users"] });
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

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est subvenue: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des utilisateurs</CardTitle>
        <CardDescription>Gérez les différents utilisateurs</CardDescription>
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
                <TableCell>{`${user.name}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
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
