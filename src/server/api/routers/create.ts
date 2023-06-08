import { z } from "zod";
import axios from "axios";
import {
  createTRPCRouter,
  //publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  url: z.string().url(),
});

const randomString = (length: number) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

interface Metatags {
  title: string;
  description: string;
  image: string;
}

const getMetatags = async (url: string): Promise<Metatags> => {
  try {
    // In the future, make my own api for this
    const response = await axios.get(`https://api.dub.sh/metatags?url=${url}`);
    const data: Metatags = response.data as Metatags;
    return {
      title: data.title,
      description: data.description,
      image: data.image,
    };
  } catch (err) {
    console.error(err);
    return {
      title: "",
      description: "",
      image: "",
    };
  }
};

export const createRouter = createTRPCRouter({
  createSimpleLink: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      const metatags = await getMetatags(input.url);

      const link = await ctx.prisma.link.create({
        data: {
          userId: ctx.session.user.id,
          title: metatags.title || input.title,
          description: metatags.description || input.description,
          image: metatags.image || "",
          url: input.url,
          slug: randomString(7),
        },
      });

      return link;
    }),
});
