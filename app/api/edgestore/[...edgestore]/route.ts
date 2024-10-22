import { auth } from "@/auth";
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
  // const session = await auth();
  // if (!session) return "";
  return {
    // userId: session?.user.id,
    userId: "1234",
    userRole: "user",
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
    .beforeUpload(({ ctx, input, fileInfo }) => {
      return true;
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      return true;
    })
    .path(({ input }) => [{ type: input.type }]),

  Tradocument: es
    .fileBucket()
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
    .beforeUpload(({ ctx, input, fileInfo }) => {
      return true;
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      return true;
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
