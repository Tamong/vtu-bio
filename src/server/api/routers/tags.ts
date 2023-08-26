import { NextFetchEvent, type NextRequest } from "next/server";
import { parse } from "node-html-parser";
import { isValidUrl } from "@/lib/utils";
import { ratelimit, recordMetatags } from "@/lib/upstash";
import { getToken } from "next-auth/jwt";
import { ipAddress } from "@vercel/edge";
import { api } from "~/utils/api";

export const config = {
  runtime: "edge",
};

type MetaTag = {
  property: string | null;
  content: string;
};

type LinkTag = {
  rel: string;
  href: string;
};

type MetaTagsResponse = {
  title: string;
  description: string;
  image: string | null;
};

export default async function handler(req: NextRequest, ev: NextFetchEvent) {
  if (req.method === "GET") {
    const url = req.nextUrl.searchParams.get("url");
    if (!url || !isValidUrl(url)) {
      return new Response("Invalid URL", { status: 400 });
    }

    // Rate limit if user is not logged in
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!session?.email) {
      const ip =
        (ipAddress as (req: NextRequest) => string | undefined)(req) ||
        "0.0.0.0";
      const { success } = await ratelimit().limit(ip);
      if (!success) {
        return new Response("Don't DDoS me pls 🥺", { status: 429 });
      }
    }

    const metatags = await getMetaTags(url);
    return new Response(JSON.stringify(metatags), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(`Method ${req.method} Not Allowed`, { status: 405 });
  }
}

const getHtml = async (url: string) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // timeout if it takes longer than 5 seconds
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "dub-bot/1.0",
      },
    });
    clearTimeout(timeoutId);
    return await response.text();
  } catch (error) {
    // Handle fetch errors
    console.error("Fetch request failed:", error);
    return null;
  }
};

const getHeadChildNodes = (
  html: string
): { metaTags: MetaTag[]; title: string | null; linkTags: LinkTag[] } => {
  const ast = parse(html); // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll("meta").map(({ attributes }) => {
    const property =
      attributes.property || attributes.name || attributes.href || "unknown";
    return {
      property,
      content: attributes.content || "",
    };
  });
  const title = ast.querySelector("title")?.innerText || "No title";
  const linkTags = ast.querySelectorAll("link").map(({ attributes }) => {
    const { rel, href } = attributes;
    return {
      rel: rel || "unknown",
      href: href || "unknown",
    };
  });

  return { metaTags, title, linkTags };
};

const getRelativeUrl = (url: string, imageUrl: string): string | null => {
  if (!imageUrl) {
    return null;
  }
  if (isValidUrl(imageUrl)) {
    return imageUrl;
  }
  const { protocol, host } = new URL(url);
  const baseURL = `${protocol}//${host}`;
  return new URL(imageUrl, baseURL).toString();
};

type MetaTagsObject = {
  [key: string]: string | null;
};

export const getMetaTags = async (
  url: string
  //ev: NextFetchEvent
): Promise<MetaTagsResponse> => {
  const html = await getHtml(url);
  if (!html) {
    return {
      title: url,
      description: "No description",
      image: null,
    };
  }

  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html);

  const object: MetaTagsObject = {};

  for (const metaTag of metaTags) {
    if (metaTag) {
      const { property, content } = metaTag;
      if (property) {
        object[property] = content;
      }
    }
  }

  for (const linkTag of linkTags) {
    if (linkTag) {
      const { rel, href } = linkTag;
      if (rel && href) {
        object[rel] = href;
      }
    }
  }

  const title =
    object["og:title"] || object["twitter:title"] || titleTag || url;
  const description =
    object["description"] ||
    object["og:description"] ||
    object["twitter:description"] ||
    "No description";
  const image =
    object["og:image"] ||
    object["twitter:image"] ||
    object["image_src"] ||
    object["icon"] ||
    object["shortcut icon"];

  const imageUrl = getRelativeUrl(url, image || "");

  await recordMetatags(url, !!(title && description && imageUrl));

  //ev.waitUntil(recordMetatags(url, !!(title && description && imageUrl)));

  return {
    title,
    description,
    image: imageUrl,
  };
};

import { z } from "zod";
import {
  createTRPCRouter,
  //publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------
//-----------------------------------------------

const inputSchema = z.object({
  url: z.string().url(),
});

export const tagsRouter = createTRPCRouter({
  getMetatags: protectedProcedure
    .input(inputSchema)
    .mutation(async ({ input }) => {
      const metatags = await getMetaTags(input.url);
      return metatags;
    }),
});
