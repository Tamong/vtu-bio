import { z } from "zod";
import axios from "axios";
import {
  createTRPCRouter,
  //publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { nanoid } from "@/lib/utils";
import { api } from "@/utils/api";

export const config = {
  runtime: "edge", // this is a pre-requisite
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  url: z.string().url(),
});

interface Metatags {
  title: string;
  description: string;
  image: string;
}

const getMetatags = async (url: string): Promise<Metatags> => {
  try {
    // In the future, make my own api for this
    const response = await axios.get(`https://vtu.bio/api/metatags?url=${url}`);
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

type MetaTagsResponse = {
  title: string;
  description: string;
  image: string | null;
};

export const createRouter = createTRPCRouter({
  createSimpleLink: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      //const { data } = await api.tags.createMetatags.useQuery(input);
      //const { title, description, image } = data as MetaTagsResponse;
      const response = axios.get(
        "https://vtu.bio/api/metatags?url=" + input.url
      );
      const data = (await response).data;

      const link = await ctx.prisma.link.create({
        data: {
          userId: ctx.session.user.id,
          title: data.title || input.title,
          description: data.description || input.description,
          image: data.image || "",
          url: input.url,
          slug: nanoid(),
        },
      });
      return link;
    }),
});
