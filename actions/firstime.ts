"use server";

import * as z from "zod";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const firstimeconnected = async () =>
  // values: z.infer<typeof SettingsSchema>
  {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    // const
  };
