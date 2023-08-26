import { z } from "zod";
import {
  createTRPCRouter,
  //publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  image: z.string().url(),
  slug: z.string().min(7).max(7),
});

export const createRouter = createTRPCRouter({
  createSimpleLink: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.prisma.link.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          description: input.description,
          image: input.image,
          url: input.url,
          slug: input.slug,
        },
      });
      return link;
    }),
});
