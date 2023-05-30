import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const redirectRouter = createTRPCRouter({
  getUrl: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.link.findUnique({
        where: {
          slug: input.slug,
        },
      });

      return data;
    }),
});
