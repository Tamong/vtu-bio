"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import CreateForm from "./create/createForm";
import { Drawer } from "vaul";

const CreateLink = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {/*className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-light transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">*/}
          <Button>Create Link</Button>
        </DialogTrigger>

        <DialogContent className="min-h-[min(906px,_90dvh)] w-full min-w-[min(936px,_90dvw)] bg-light">
          <Suspense>
            <CreateForm />
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateLink;
