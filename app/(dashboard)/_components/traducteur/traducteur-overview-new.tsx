import { db } from "@/db/drizzle";
import { DemandeDevis } from "@/db/schema";
import { currentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { DemandeDevisTraducteurTable } from "./newTraducteurTable";

const DataTableTraducteur = async () => {
  const user = await currentUser();
  if (!user || user.role !== "traducteur") redirect("/auth/login");
  const demandeDevis = await db
    .select()
    .from(DemandeDevis)
    .where(eq(DemandeDevis.traducteur, user.id));
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Demandes de Devis</h1>
      <DemandeDevisTraducteurTable data={demandeDevis} />
    </div>
  );
};

export default DataTableTraducteur;
