import { type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";

import { lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Vtuber: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Dashboard - vtu.bio</title>
        </Head>
        <Layout>
          <div className="max-w-6xl">
            <div className="mx-auto hidden max-w-6xl px-4 md:block">
              <Suspense fallback={<div>Loading...</div>}>
                <h1>VTuber</h1>
              </Suspense>
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

export default Vtuber;
