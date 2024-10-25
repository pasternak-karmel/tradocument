import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { Columns } from "./columns";
import AddTraduction from "../_components/traduction";

import { currentRole } from "@/lib/auth";
import { GetTraduction } from "@/actions/getTraductions";

export default async function Traduction() {
  const role = await currentRole();

  const data = await GetTraduction();

  if ("error" in data) {
    return <div>{data.error}</div>;
  }

  return (
    <div className="h-auto">
      <div className="h-auto flex justify-between items-center">
        <div />
        <AddTraduction>
          <Button>
            {" "}
            <Plus />
            Nouvelle traduction
          </Button>
        </AddTraduction>
      </div>
      <h1 className="text-2xl text-center mt-6 underline">
        Vos traductions réçentes
      </h1>
      <DataTable columns={Columns} data={data} />
    </div>
  );
}
