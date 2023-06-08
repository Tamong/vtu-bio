import { type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";

//import { lazy, Suspense } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Vtuber: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <Head>
          <title>Dashboard - vtu.bio</title>
        </Head>
        <Layout>
          <div className="max-w-6xl">
            <div className="mx-auto hidden max-w-6xl px-4 md:block">
              <h1>VTuber</h1>
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

export default Vtuber;
