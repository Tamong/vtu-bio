import { profileRouter } from "~/server/api/routers/profile";
import { redirectRouter } from "~/server/api/routers/redirect";
import { createRouter } from "~/server/api/routers/create";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  redirect: redirectRouter,
  create: createRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
