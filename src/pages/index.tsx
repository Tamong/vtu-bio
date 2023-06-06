import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
//import Link from "next/link";
//import { api } from "~/utils/api";
import HomeNav from "@/components/home-nav";
import Hero from "@/components/hero";
import Trusts from "@/components/trusted";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  return {
    props: {},
  };
}
