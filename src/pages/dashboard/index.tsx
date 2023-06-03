import { type NextPage } from "next";
//import Link from "next/link";
import { api } from "~/utils/api";
//import { Button } from "@/components/ui/button";
import Layout from "~/components/layout";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { type userLink, columns } from "@/components/dashboardTable/columns";
import { DataTable } from "@/components/dashboardTable/data-table";
import Link from "next/link";
import { Button } from "~/components/ui/button";

function getData(): userLink[] {
  const { data } = api.dashboard.getUser.useQuery();

  if (!data) {
    return [];
  }
  const formattedLinks = data.links.map((link) => ({
    id: link.id,
    date: link.createdAt.toLocaleString(),
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
        <div className="container flex flex-col items-center justify-center gap-2">
          {sessionData ? (
            <>
              <div>
                <div className="my-2 flex min-w-full justify-between text-xl ">
                  <div className="flex items-center justify-center ">
                    <h1 className="flex text-3xl font-bold text-primary drop-shadow-sm">
                      My Links
                    </h1>
                  </div>

                  <div>
                    <Link className="flex" href="/create">
                      <Button className="font-bold">Create</Button>
                    </Link>
                  </div>
                </div>

                <div>
                  <DataTable columns={columns} data={data} />
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-5xl font-bold text-foreground sm:text-[2rem]">
              {/* Redirect to login page if session doesn't exist... */}
              {/* To do this, we need to load session before displaying anything */}
              Please Sign In First!
            </h1>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
