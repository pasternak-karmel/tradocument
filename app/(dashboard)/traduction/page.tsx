import { DemandeDevisTable } from "@/components/user/demande-devis-table";
import { db } from "@/db/drizzle";
import { DemandeDevis } from "@/db/schema";
import { currentUserId } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function DemandeDevisPage() {
  const userId = await currentUserId();
  if (!userId) redirect("/auth/login");
  const demandeDevis = await db
    .select()
    .from(DemandeDevis)
    .where(eq(DemandeDevis.userId, userId));

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Demandes de Devis</h1>
      <DemandeDevisTable data={demandeDevis} />
    </div>
  );
}
