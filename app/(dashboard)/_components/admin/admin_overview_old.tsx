
"use client";
import { DataTable } from "./data-table";
import { Columns } from "./columns";
import { useAdmin } from "@/hooks/useAdmin";

const AdminOverview = () => {
  const { tableauFichier, TableauisLoading, TableauisError } = useAdmin();

  if (TableauisLoading) {
    return <div>Chargement...</div>;
  }

  if (TableauisError) {
    return <div>{TableauisError}</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center mt-6 underline">
        Tous les traductions
      </h1>
      <DataTable columns={Columns} data={tableauFichier} />
    </div>
  );
};

export default AdminOverview;

//admin can do assign traduction to other user (done)
//admin can authorize rejoignez nous (done)
