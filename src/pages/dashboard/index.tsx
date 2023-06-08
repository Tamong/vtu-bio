import { type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";

import { lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
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
              <p>Welcome to the dashboard!</p>
            </div>
          </div>
        </Layout>
      </>
    );
  } else if (status === "unauthenticated") {
    router.replace("/signin");
  }
  return null;
};

export default Dashboard;
