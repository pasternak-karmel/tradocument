import { DemandeDevisTable } from "@/components/user/demande-devis-table";
import { db } from "@/db/drizzle";
import { DemandeDevis } from "@/db/schema";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminOverviewNew = async () => {
  const role = await currentRole();
  if (!role || role !== "admin") redirect("/");
  const demandeDevis = await db.select().from(DemandeDevis);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Demandes de Devis</h1>
      <DemandeDevisTable data={demandeDevis} />
    </div>
  );
};

export default AdminOverviewNew;
