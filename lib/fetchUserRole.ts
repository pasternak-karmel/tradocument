import { currentRole } from "@/lib/auth";

export async function fetchUserRole() {
  const user = await currentRole();
  return user || null;
}
