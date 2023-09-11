import { type NextPage } from "next";
import Head from "next/head";
import HomeNav from "~/components/home/home-nav";
import Hero from "~/components/home/hero";
import Trusts from "~/components/home/trusted";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { status } = useSession();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setAuthenticated(true);
    }
  }, [authenticated, status]);

  return (
    <>
      <Head>
        <title>vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeNav auth={authenticated} />
        <Hero />
        <Trusts />
      </main>
    </>
  );
};

export default Home;
