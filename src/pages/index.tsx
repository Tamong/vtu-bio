import { type NextPage } from "next";
import Head from "next/head";
//import Link from "next/link";
//import { api } from "~/utils/api";
import Hero from "@/components/hero";
import Trusts from "@/components/trusted";
import Layout from "@/components/layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <Trusts />
      </Layout>
    </>
  );
};

export default Home;
