import { type NextPage } from "next";
import Layout from "~/components/dashboard/layout";
import Head from "next/head";

//import { lazy, Suspense } from "react";
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
          {/* Header */}
          <div className="flex h-32 w-full items-center border-b bg-background">
            <div className="w-full  items-center">
              <div className=" mx-auto flex max-w-screen-xl items-center justify-between px-2.5 lg:px-20">
                {/* Left Side */}
                <div className="flex items-center">
                  <h1 className="flex text-3xl font-semibold drop-shadow-sm">
                    Settings
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="mx-auto hidden max-w-6xl px-4 md:block">
            <p>Welcome to settings!</p>
          </div>
        </Layout>
      </>
    );
  } else if (status === "unauthenticated") {
    void router.replace("/signin");
  }
  return null;
};

export default Settings;
