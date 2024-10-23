import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTraduction from "../_components/traduction";

export default function Traduction() {
  return (
    <div className="min-h-screen ">
      <div className="h-auto flex justify-between items-center">
        <div></div>
        <AddTraduction>
          <Button> <Plus/> Ajouter un traducteur</Button>
        </AddTraduction>
      </div>
    </div>
  );
}
