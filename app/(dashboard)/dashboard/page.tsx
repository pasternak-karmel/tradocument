import AdminOverview from "@/app/(dashboard)/_components/admin/admin_overview";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TraducteurOverview from "../_components/traducteur/traducteur_overview";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/auth/login");
  if (session.user.role === "admin") return <AdminOverview />;
  if (session.user.role === "traducteur") return <TraducteurOverview />;

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
