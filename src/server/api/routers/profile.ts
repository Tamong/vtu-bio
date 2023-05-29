import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.vTuber.findUnique({
        where: {
          name: input.slug,
        },
        include: {
          socialLinks: true,
          customLinks: true,
          association: true,
        },
      });

      return user;
    }),
});
