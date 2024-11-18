"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Traduction } from "../../data/schema";
import SelectTraducteur from "./setTraducteur";

const ActionsMenu = ({ articleId }: { articleId: string }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/article/${articleId}`)}>
          Consulter les infos de l&apos;article
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Columns: ColumnDef<Traduction>[] = [
  // select
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //nom
  {
    accessorKey: "nom",
    header: "nom",
    cell: ({ row }) => <p>{row.original.nom}</p>,
  },
  //prenom
  {
    accessorKey: "prenom",
    header: "prenom",
    cell: ({ row }) => <p>{row.original.prenom}</p>,
  },
  //email
  {
    accessorKey: "email",
    header: "email",
    cell: ({ row }) => <p>{row.original.email}</p>,
  },
  //date de création
  {
    accessorKey: "created_at",
    header: "date created",
    cell: ({ row }) => <p>{row.original.created_at.toLocaleDateString()}</p>,
  },
  //status
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => <p>{row.original.status}</p>,
  },
  {
    accessorKey: "traduction_from",
    header: "Traduction de",
    cell: ({ row }) => <p>{row.original.traduction_from}</p>,
  },
  {
    accessorKey: "traduction_to",
    header: "Traduction pour",
    cell: ({ row }) => <p>{row.original.traduction_to}</p>,
  },
  {
    accessorKey: "montant",
    header: "Montant",
    cell: ({ row }) => <p>{row.original.montant} €</p>,
  },
  {
    accessorKey: "fichier",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fichier
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <a target="_blank" href={row.original.fichier} download>
        Voir le fichier
      </a>
    ),
  },
  // traducteur
  {
    accessorKey: "traducteur",
    header: "Traducteur",
    cell: ({ row }) =>
      row.original.traducteur ? (
        <p>{row.original.traducteur}</p>
      ) : (
        <SelectTraducteur traduction={row.original.id!} />
      ),
  },
  // actions
  // {
  //   id: "actions",
  //   cell: ({ row }) => <ActionsMenu articleId={row.original.id!} />,
  // },
];
