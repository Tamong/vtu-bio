import {
  createTRPCRouter,
  //publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        vtubers: true,
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
