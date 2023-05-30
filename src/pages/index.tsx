import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(200,100%,70%)] to-[#333333]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            vtu<span className="text-[hsl(200,100%,70%)]">.</span>bio
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
