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

  getLinks: protectedProcedure
    .input(z.object({ filter: z.string() }))
    .query(async ({ ctx, input }) => {
      const links = await ctx.prisma.link.findMany({
        where: {
          userId: ctx.session.user.id,
          AND: {
            OR: [
              {
                slug: {
                  contains: input.filter,
                },
              },
              {
                url: {
                  contains: input.filter,
                },
              },
              {
                title: {
                  contains: input.filter,
                },
              },
              {
                description: {
                  contains: input.filter,
                },
              },
            ],
          },
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
    }),
});
