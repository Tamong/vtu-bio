import { type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";

import { lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    // Redirect to the dashboard page
    router.replace("/signin");

    return null; // Return null while the redirect happens
  }

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
              <h1>Hello</h1>
            </Suspense>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
