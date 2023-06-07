import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  //protectedProcedure,
} from "~/server/api/trpc";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

export const profileRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.vTuber.findUnique({
        where: {
          name: input.slug,
        },
        include: {
          association: true,
          tag: true,
          links: {
            include: {
              socialLink: true,
            },
          },
        },
      });

      return user;
    }),
});
