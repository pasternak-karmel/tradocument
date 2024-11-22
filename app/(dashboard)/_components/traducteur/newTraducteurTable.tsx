"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, FileText, MapPin } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEMANDEDEVIS } from "@/db/schema";
import { UploadFileDialog } from "./dialog-provider";

const columns: ColumnDef<DEMANDEDEVIS>[] = [
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   },
  //   {
  //     accessorKey: "nom",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Nom
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       )
  //     },
  //     cell: ({ row }) => <div>{row.getValue("nom")}</div>,
  //   },
  //   {
  //     accessorKey: "prenom",
  //     header: "Prénom",
  //     cell: ({ row }) => <div>{row.getValue("prenom")}</div>,
  //   },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  //   {
  //     accessorKey: "pays",
  //     header: "Pays",
  //     cell: ({ row }) => <div>{row.getValue("pays")}</div>,
  //   },
  //   {
  //     accessorKey: "type",
  //     header: "Type",
  //     cell: ({ row }) => (
  //       <Badge variant={row.getValue("type") ? "default" : "secondary"}>
  //         {row.getValue("type") ? "Adresse" : "Fichier"}
  //       </Badge>
  //     ),
  //   },
  {
    accessorKey: "typeDocument",
    header: "Type de Document",
    cell: ({ row }) => <div>{row.getValue("typeDocument")}</div>,
  },
  {
    accessorKey: "langueSource",
    header: "Langue Source",
    cell: ({ row }) => <div>{row.getValue("langueSource")}</div>,
  },
  {
    accessorKey: "langueTraduit",
    header: "Langue Traduite",
    cell: ({ row }) => <div>{row.getValue("langueTraduit")}</div>,
  },
  {
    accessorKey: "fichier",
    header: "Fichier",
    cell: ({ row }) => {
      const type = row.getValue("type") as boolean;
      const fichiers = row.getValue("fichier") as string[] | null;
      if (!type && fichiers) {
        return (
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>{fichiers.length} fichier(s)</span>
          </div>
        );
      }
      return null;
    },
  },
  {
    accessorKey: "fichierTraduis",
    header: "Fichier Traduit",
    cell: ({ row }) => {
      const type = row.getValue("type") as boolean;
      const fichierTraduis = row.getValue("fichierTraduis") as string | null;
      if (!type && fichierTraduis) {
        return (
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <a target="_blank" href={fichierTraduis} download>
              fichier traduit
            </a>
          </div>
        );
      }
      return <UploadFileDialog id={row.original.id!} />;
    },
  },
  {
    accessorKey: "adresseDepart",
    header: "Adresse de Départ",
    cell: ({ row }) => {
      const type = row.getValue("type") as boolean;
      const adresseDepart = row.getValue("adresseDepart") as string | null;
      if (type && adresseDepart) {
        return (
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{adresseDepart}</span>
          </div>
        );
      }
      return null;
    },
  },
  {
    accessorKey: "adresseArriver",
    header: "Adresse d'Arrivée",
    cell: ({ row }) => {
      const type = row.getValue("type") as boolean;
      const adresseArriver = row.getValue("adresseArriver") as string | null;
      if (type && adresseArriver) {
        return (
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{adresseArriver}</span>
          </div>
        );
      }
      return null;
    },
  },
  //   {
  //     accessorKey: "montant",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Montant
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       )
  //     },
  //     cell: ({ row }) => <div>{row.getValue("montant")} €</div>,
  //   },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("status")}
      </Badge>
    ),
  },
  //   {
  //     accessorKey: "payer",
  //     header: "Payé",
  //     cell: ({ row }) => (
  //       <Badge variant={row.getValue("payer") ? "default" : "destructive"}>
  //         {row.getValue("payer") ? "Oui" : "Non"}
  //       </Badge>
  //     ),
  //   },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const devis = row.original

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => navigator.clipboard.writeText(devis.id)}
  //             >
  //               Copier l'ID du devis
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>Voir les détails</DropdownMenuItem>
  //             <DropdownMenuItem>Modifier le statut</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       )
  //     },
  //   },
];

export function DemandeDevisTraducteurTable({
  data,
}: {
  data: DEMANDEDEVIS[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} sur{" "}
          {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
