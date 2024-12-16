import { Button } from "@/components/ui/button";
import AuthorizeDocument from "../../_components/admin/autorise_document";
import AuthorizeUser from "../../_components/admin/autorise_user";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddTraduction from "../../_components/traduction";
import ManageUsers from "../../_components/admin/manage_user";
export default function AdminAuthorization() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Page d'autorisation admin</h1>
        <AddTraduction role="traducteur">
          <Button>Ajouter un traducteur</Button>
        </AddTraduction>
      </div>
      <Tabs defaultValue="documents">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">Documents traduits</TabsTrigger>
          <TabsTrigger value="users">Gestion des candidatures</TabsTrigger>
          <TabsTrigger value="usersManage">Gestion des utilisateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
          <AuthorizeDocument />
        </TabsContent>
        <TabsContent value="users">
          <AuthorizeUser />
        </TabsContent>
        <TabsContent value="usersManage">
          <ManageUsers />
        </TabsContent>
      </Tabs>
    </div>
  );
}
