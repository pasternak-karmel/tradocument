"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { auth, signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "@/data/user";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // if (existingUser.isTwoFactorEnabled && existingUser.email) {
  //   if (code) {
  //     const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

  //     if (!twoFactorToken) {
  //       return { error: "Invalid code!" };
  //     }

  //     if (twoFactorToken.token !== code) {
  //       return { error: "Invalid code!" };
  //     }

  //     const hasExpired = new Date(twoFactorToken.expires) < new Date();

  //     if (hasExpired) {
  //       return { error: "Code expired!" };
  //     }

  //     await db.twoFactorToken.delete({
  //       where: { id: twoFactorToken.id },
  //     });

  //     const existingConfirmation = await getTwoFactorConfirmationByUserId(
  //       existingUser.id
  //     );

  //     if (existingConfirmation) {
  //       await db.twoFactorConfirmation.delete({
  //         where: { id: existingConfirmation.id },
  //       });
  //     }

  //     await db.twoFactorConfirmation.create({
  //       data: {
  //         userId: existingUser.id,
  //       },
  //     });
  //   } else {
  //     const twoFactorToken = await generateTwoFactorToken(existingUser.email);
  //     await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

  //     return { twoFactor: true };
  //   }
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/",
      // redirect: false,
    });
    // const session = await auth();
    // let redirectUrl = callbackUrl;
    // if (!redirectUrl) {
    //   if (session?.user.role === "ADMIN") {
    //     redirectUrl = "admin";
    //   } else if (session?.user.role === "AGENT") {
    //     redirectUrl = "agent";
    //   } else {
    //     redirectUrl = DEFAULT_LOGIN_REDIRECT;
    //   }
    // }

    return { success: "Logged succesufuly" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
