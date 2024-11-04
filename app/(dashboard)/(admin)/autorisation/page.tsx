import AuthorizeDocument from "../../_components/admin/autorise_document";
import AuthorizeUser from "../../_components/admin/autorise_user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function AdminAuthorization() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Page d'autorisation admin</h1>
      <Tabs defaultValue="documents">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">Documents traduits</TabsTrigger>
          <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
          <AuthorizeDocument />
        </TabsContent>
        <TabsContent value="users">
          <AuthorizeUser />
        </TabsContent>
      </Tabs>
    </div>
  );
}
