import { auth } from "@/auth";
import { fetchUserRole } from "@/lib/fetchUserRole";
import { initEdgeStore } from "@edgestore/server";
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { z } from "zod";

type Context = {
  userId: string;
  userRole: "admin" | "user" | "traducteur";
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
  // async function createContext(): Promise<Context> {
  const session = await auth();

  // if (!session || !session.user?.id) {
  //   return {
  //     userId: "1234",
  //     userRole: "user",
  //   };
  // }
  if (!session || !session.user?.id) {
    throw new Error("Authentification requise");
  }

  // const role = (await fetchUserRole()) || "user";
  return {
    userId: session.user.id,
    userRole: "user",
    // userRole: role,
  };
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  myPublicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 10, // 1MB
    })
    .input(
      z.object({
        type: z.enum(["post", "profile"]),
      })
    )
    .path(({ input }) => [{ type: input.type }]),
  myArrowImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 100, // 10MB
    })
    .input(
      z.object({
        type: z.enum(["post", "profile"]),
      })
    )
    .beforeUpload(({}) => {
      return true;
    })
    .beforeDelete(({}) => {
      return true;
    })
    .path(({ input }) => [{ type: input.type }]),
  document: es
    .fileBucket()
    .input(
      z.object({
        type: z.enum(["post", "profile"]),
      })
    )
    .beforeUpload(({}) => {
      return true;
    })
    .beforeDelete(({}) => {
      return true;
    })
    .path(({ input }) => [{ type: input.type }]),

  Tradocument: es
    .fileBucket()
    .input(
      z.object({
        type: z.enum(["traduction", "profile"]),
      })
    )
    .path(({ ctx }) => [{ owner: ctx.userId }])
    .accessControl({
      OR: [
        {
          userId: { path: "owner" },
        },
        {
          userRole: { eq: "admin" },
        },
        {
          userRole: { eq: "traducteur" },
        },
      ],
    })
    .beforeUpload(async ({ ctx }) => {
      return true;
    })
    .beforeDelete(async ({ ctx }) => {
      return true;
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
