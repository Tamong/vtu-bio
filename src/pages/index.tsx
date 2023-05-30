import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { Button } from "@/components/ui/button";

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
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          vtu<span className="text-[hsl(200,100%,70%)]">.</span>bio
        </h1>
        <Auth />
      </main>
    </>
  );
};

export default Home;

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>

      {sessionData ? (
        <div className="">
          <Link href="/create">
            <Button type="submit">Create Short Link</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
