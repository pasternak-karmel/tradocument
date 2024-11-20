"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Download } from "lucide-react";

export type Article = {
  id: string;
  fichier: string;
  montant: number;
  status: string;
  fichierTraduis: string | null;
};

// const ActionsMenu = ({ articleId }: { articleId: string }) => {
//   const router = useRouter();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="h-8 w-8 p-0">
//           <span className="sr-only">Open menu</span>
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//         <DropdownMenuItem onClick={() => router.push(`/article/${articleId}`)}>
//           Consulter les infos de l&apos;article
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

export const Columns: ColumnDef<Article>[] = [
  // id
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
  // nom
  {
    accessorKey: "fichier",
    header: "Fichier original",
    cell: ({ row }) => (
      <a target="_blank" href={row.original.fichier} download>
        Voir le fichier
      </a>
    ),
  },
  // description
  {
    accessorKey: "montant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Montant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <p>{row.original.montant} €</p>,
  },
  // prix €
  {
    accessorKey: "status",
    header: "status",
  },
  {
    accessorKey: "fichierTraduis",
    header: "Traduction finale",
    cell: ({ row }) =>
      row.original.fichierTraduis ? (
        <div className="flex">

        <a target="_blank" href={row.original.fichierTraduis!} download>
          Télécharger 🫡
        </a>
        </div>
      ) : (
        <p>Presque terminé</p>
      ),
  },
  // actions
  // {
  //   id: "actions",
  //   cell: ({ row }) => <ActionsMenu articleId={row.original.id} />,
  // },
];
