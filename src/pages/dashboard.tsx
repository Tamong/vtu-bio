import { GetServerSidePropsContext, type NextPage } from "next";
import { api } from "~/utils/api";
import Layout from "~/components/layout";
import Head from "next/head";
import { type userLink, columns } from "@/components/dashboardTable/columns";
import { DataTable } from "@/components/dashboardTable/data-table";
import CreateForm from "@/components/createForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

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
          <div>
            <div className="my-2 flex min-w-full justify-between text-xl ">
              <div className="flex items-center justify-center ">
                <h1 className="flex text-3xl font-bold text-primary drop-shadow-sm">
                  My Links
                </h1>
              </div>

              <div>
                <Dialog>
                  <DialogTrigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    Add Link
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Link</DialogTitle>
                      <DialogDescription>
                        <CreateForm />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div>
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {},
  };
}
