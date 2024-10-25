import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTraduction from "../_components/traduction";

import { currentRole } from "@/lib/auth";

export default async function Traduction() {
  const role = await currentRole();

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
    </div>
  );
}
