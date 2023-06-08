import { type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";

import { lazy, Suspense } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
const LinkPage = lazy(() => import("@/components/dash/page"));

const Link: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    const { data } = api.dashboard.getLinks.useQuery();

    const formattedLinks = data
      ? data.map((link) => ({
          id: link.id,
          date: link.createdAt.toLocaleString(),
          title: link.title,
          description: link.description || null,
          url: link.url,
          slug: link.slug,
        }))
      : [];

    return (
      <>
        <Head>
          <title>Dashboard - vtu.bio</title>
        </Head>
        <Layout>
          <div className="max-w-6xl">
            <div className="mx-auto hidden max-w-6xl px-4 md:block">
              <Suspense>
                <LinkPage data={formattedLinks} />
              </Suspense>
            </div>
          </div>
        </Layout>
      </>
    );
  } else if (status === "unauthenticated") {
    void router.replace("/signin");
  }
  return null;
};

export default Link;
