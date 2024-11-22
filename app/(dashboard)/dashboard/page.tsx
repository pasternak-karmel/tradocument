
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Traducteur_overview from "../_components/traducteur/traducteur_overview";
import AdminOverviewNew from "../_components/admin/admin_overview";
import DataTableTraducteur from "../_components/traducteur/traducteur-overview-new";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/auth/login");
  if (session.user.role === "admin") return <AdminOverviewNew />;
  if (session.user.role === "traducteur") return <DataTableTraducteur />;

  return (
    <div>
      <div>
        Dashboard
        <div className="container">
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
