"use client";

import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import CreateForm from "./createForm";
import Layout from "@/components/layout";

const Create: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Create - vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
      </Head>
      <Layout>
        <div className="container flex flex-col items-center justify-center gap-8">
          {sessionData ? (
            <>
              <h1 className="text-5xl font-bold tracking-tight text-foreground ">
                Create Link
              </h1>
              <CreateForm />
            </>
          ) : (
            <h1 className="text-5xl font-bold  text-foreground sm:text-[2rem]">
              Please Sign In First!
            </h1>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Create;
