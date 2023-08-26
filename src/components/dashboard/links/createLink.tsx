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
      <div className="block sm:hidden">
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <h1 className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-light transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Create Link
            </h1>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-light/40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 flex max-h-[82vh] flex-col rounded-t-[10px] bg-light px-2">
              <div className="mx-auto mt-4 h-1.5 w-20 flex-shrink-0 rounded-full bg-zinc-300" />
              <div className="pb-16 pt-4">
                <h1>
                  <span className="text-xl font-medium">Create Link</span>
                </h1>
                <Suspense>
                  <CreateForm />
                </Suspense>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>

      <div className="hidden sm:block">
        <Dialog>
          <DialogTrigger className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-light transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Create Link
          </DialogTrigger>

          <DialogContent className="min-h-[min(906px,_90dvh)] w-full min-w-[min(906px,_90dvw)] bg-light">
            <Suspense>
              <CreateForm />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateLink;
