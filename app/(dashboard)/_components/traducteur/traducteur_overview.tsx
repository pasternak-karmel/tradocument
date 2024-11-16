import { GetAdminTraduction } from "@/actions/getTraductions";
import TranslationDataTable from "./translation-table";

export default async function Traducteur_overview() {
  const translations = await GetAdminTraduction();

  if ("error" in translations) {
    return <div>{translations.error}</div>;
  }
  
  return (
    <div className="container mx-auto py-10">
      <TranslationDataTable data={translations} />
    </div>
  );
}
