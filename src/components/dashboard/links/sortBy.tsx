"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer } from "vaul";
import { useState } from "react";

type Props = {
  sortBy: string;
  handleSortBy: (filter: string) => void;
};

const SortBy: React.FC<Props> = ({ sortBy, handleSortBy }) => {
  return (
    <>
      <div className="block lg:hidden">
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <div className="hover:font-current hover:font-current mx-auto flex w-44 items-center justify-between rounded-md border bg-light p-1 text-sm font-medium ring-offset-light transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <span className=" flex items-center">
                <Icons.alignleft className="h-8 w-8 p-2" />
                Sort By
              </span>
              <span>
                <Icons.down className="h-8 w-8 p-2" />
              </span>
            </div>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-light/40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 flex min-h-[60dvh] flex-col rounded-t-[10px] bg-light px-2">
              <div className="mx-auto mt-4 h-1.5 w-20 flex-shrink-0 rounded-full bg-zinc-300" />
              <div className="pb-16 pt-4">
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2.5"
                  onClick={() => {
                    handleSortBy("date");
                  }}
                >
                  <div className="mx-auto flex w-screen items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
                      <p className="mr-[-1rem]">Date Added</p>
                    </div>
                    <div>
                      {sortBy === "date" && <Icons.check className="h-4 w-4" />}
                    </div>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-2.5"
                  onClick={() => {
                    handleSortBy("clicks");
                  }}
                >
                  <div className="mx-auto flex w-screen items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
                      <p className="mr-[-1rem]">Number of Clicks</p>
                    </div>
                    <div>
                      {sortBy === "clicks" && (
                        <Icons.check className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </Button>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger>
            <div className="hover:font-current hover:font-current mx-auto flex w-52 items-center justify-between rounded-md border bg-light p-1 text-sm font-medium ring-offset-light transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <span className=" flex items-center">
                <Icons.alignleft className="h-8 w-8 p-2" />
                Sort By
              </span>
              <span>
                <Icons.down className="h-8 w-8 p-2" />
              </span>
            </div>
          </PopoverTrigger>

          <PopoverContent className="flex w-52 flex-col ">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2.5"
              onClick={() => {
                handleSortBy("date");
              }}
            >
              <div className="mx-auto flex w-screen items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
                  <p className="mr-[-1rem]">Date Added</p>
                </div>
                <div>
                  {sortBy === "date" && <Icons.check className="h-4 w-4" />}
                </div>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2.5"
              onClick={() => {
                handleSortBy("clicks");
              }}
            >
              <div className="mx-auto flex w-screen items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
                  <p className="mr-[-1rem]">Number of Clicks</p>
                </div>
                <div>
                  {sortBy === "clicks" && <Icons.check className="h-4 w-4" />}
                </div>
              </div>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default SortBy;
