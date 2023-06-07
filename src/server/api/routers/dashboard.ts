import { z } from "zod";
import {
  createTRPCRouter,
  //publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

export const dashboardRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        links: {
          orderBy: {
            createdAt: "desc",
          },
        },
        vtubers: true,
      },
    });

    return user;
  }),

  getLinks: protectedProcedure.query(async ({ ctx }) => {
    const links = await ctx.prisma.link.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return links;
  }),

  deleteLink: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.link.delete({
        where: {
          id: input.id,
        },
      });

      return {
        success: true,
        message: "Link deleted",
      };
    }),
});
