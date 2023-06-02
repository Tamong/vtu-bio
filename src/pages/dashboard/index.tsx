import { type NextPage } from "next";
//import Link from "next/link";
import { api } from "~/utils/api";
//import { Button } from "@/components/ui/button";
import Layout from "~/components/layout";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { type userLink, columns } from "@/components/dashboardTable/columns";
import { DataTable } from "@/components/dashboardTable/data-table";

function getData(): userLink[] {
  const { data } = api.dashboard.getUser.useQuery();

  if (!data) {
    return [];
  }
  const formattedLinks = data.links.map((link) => ({
    date: "ee",
    title: link.title,
    description: link.description || null,
    url: link.url,
    slug: link.slug,
  }));

  return formattedLinks;
}

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  const data = getData();

  return (
    <>
      <Head>
        <title>Dashboard - vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container flex flex-col items-center justify-center gap-8">
          {sessionData ? (
            <>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                My Links
              </h1>
              <div>
                <DataTable columns={columns} data={data} />
              </div>
            </>
          ) : (
            <h1 className="text-5xl font-bold text-foreground sm:text-[2rem]">
              Please Sign In First!
            </h1>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
