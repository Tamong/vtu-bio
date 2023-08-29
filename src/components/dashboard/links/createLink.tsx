"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import CreateForm from "./create/createForm";
import { Drawer } from "vaul";

const CreateLink = () => {
  return (
    <>
      <div className="hidden sm:block">
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
      </div>
      <div className="block sm:hidden">
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button>Create Link</Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-light/40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex min-h-[60dvh] flex-col rounded-t-[10px] border bg-light px-2">
              <div className="mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4">
                <div className="mx-auto mt-4 h-1.5 w-20 flex-shrink-0 rounded-full bg-zinc-300" />

                <Suspense>
                  <CreateForm />
                </Suspense>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  );
};

export default CreateLink;
