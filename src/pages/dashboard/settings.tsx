import { type GetServerSidePropsContext, type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
//import DashLinks from "~/pages/dashboard/links";

import { lazy, Suspense } from "react";

const Dashboard: NextPage = () => {
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
            <Suspense fallback={<div>Loading...</div>}>
              <h1>Settings</h1>
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
    return { redirect: { destination: "/signin" } };
  }

  return {
    props: {},
  };
}
