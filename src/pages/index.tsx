import { type NextPage } from "next";
import Head from "next/head";
import HomeNav from "@/components/home-nav";
import Hero from "@/components/hero";
import Trusts from "@/components/trusted";

const Home: NextPage = () => {
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
