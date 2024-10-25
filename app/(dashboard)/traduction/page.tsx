import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { Columns } from "./columns";
import AddTraduction from "../_components/traduction";

import { GetTraduction } from "@/actions/getTraductions";

export default async function Traduction() {
  const data = await GetTraduction();

  return (
    <div className="h-auto">
      <div className="h-auto flex justify-between items-center">
        <div />
        <AddTraduction>
          <Button>
            <Plus />
            Nouvelle traduction
          </Button>
        </AddTraduction>
      </div>
      <h1 className="text-2xl text-center mt-6 underline">
        Vos traductions récentes
      </h1>
      {"error" in data ? (
        <div className="text-center">{data.error}</div>
      ) : (
        <DataTable columns={Columns} data={data} />
      )}
    </div>
  );
}
