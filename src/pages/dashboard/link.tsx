import { type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";

import { lazy, Suspense, useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
const LinkPage = lazy(() => import("@/components/dash/page"));

const Dashboard: NextPage = () => {
  const { data } = api.dashboard.getLinks.useQuery();

  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    // Redirect to the dashboard page
    useEffect(() => {
      router.replace("/signin");
    }, []);

    return null; // Return null while the redirect happens
  }

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
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
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
};

export default Dashboard;
