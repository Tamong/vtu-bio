import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

export const redirectRouter = createTRPCRouter({
  getUrl: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.link.update({
        where: {
          slug: input.slug,
        },
        data: { clicks: { increment: 1 } },
      });
      return data;
    }),
});
