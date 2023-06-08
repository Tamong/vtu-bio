import { type GetServerSidePropsContext, type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

import { lazy, Suspense } from "react";
import { api } from "~/utils/api";
const LinkPage = lazy(() => import("@/components/dash/page"));

const Dashboard: NextPage = () => {
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
