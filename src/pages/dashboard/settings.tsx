import { type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";

import { lazy, Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Settings: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Settings - vtu.bio</title>
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
  } else if (status === "unauthenticated") {
    router.replace("/signin");
  }
  return null;
};

export default Settings;
