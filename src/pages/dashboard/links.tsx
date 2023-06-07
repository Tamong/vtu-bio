import { type GetServerSidePropsContext } from "next";
import { api } from "~/utils/api";
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
import { LinkTable } from "~/components/dash";

import { lazy, Suspense } from "react";
const CreateForm = lazy(() => import("@/components/createForm"));

const DashLinks: React.FC = () => {
  const { data } = api.dashboard.getLinks.useQuery();

  const formattedLinks = data
    ? data.map((link) => ({
        id: link.id,
        date: link.createdAt.toLocaleString(),
        title: link.title,
        description: link.description || null,
        url: link.url,
        slug: link.slug,
      }))
    : [];

  return (
    <>
      <div className="max-w-6xl">
        <div className="mx-auto hidden max-w-6xl px-4 md:block">
          <div className="flex justify-between pb-4">
            <div className="flex space-x-4">
              <h1 className="flex text-3xl font-bold text-primary drop-shadow-sm">
                My Links
              </h1>
            </div>
            <div className="flex items-center">
              <Dialog>
                <DialogTrigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  Add Link
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Link</DialogTitle>
                    <DialogDescription>
                      <Suspense fallback={<div>Loading...</div>}>
                        <CreateForm />
                      </Suspense>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <LinkTable data={formattedLinks} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashLinks;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/signin" } };
  }

  return {
    props: {},
  };
}
