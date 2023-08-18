import { type NextPage } from "next";
import Head from "next/head";
import HomeNav from "~/components/home/home-nav";
import Hero from "~/components/home/hero";
import Trusts from "~/components/home/trusted";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    void router.replace("/dashboard");
  }

  return (
    <>
      <Head>
        <title>vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeNav />
        <Hero />
        <Trusts />
      </main>
    </>
  );
};

export default Home;
