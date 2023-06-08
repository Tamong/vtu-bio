import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LinkTable } from "~/components/dash";

import { lazy, Suspense } from "react";
const CreateForm = lazy(() => import("@/components/createForm"));

type props = {
  data: any; // Replace 'any' with the actual type of sessionData
};

const linkPage: React.FC<props> = ({ data }) => {
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
                    <Suspense fallback={<div>Loading...</div>}>
                      <CreateForm />
                    </Suspense>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <LinkTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default linkPage;
