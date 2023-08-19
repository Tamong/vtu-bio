import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer } from "vaul";

const SortBy = () => {
  return (
    <>
      <div className="block lg:hidden">
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <div className="hover:font-current hover:font-current mx-auto flex w-44 items-center justify-between rounded-md border bg-background p-1 text-sm font-medium ring-offset-background transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
            <Drawer.Overlay className="fixed inset-0 bg-background/40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 flex max-h-[82vh] flex-col rounded-t-[10px] bg-background px-2">
              <div className="mx-auto mt-4 h-1.5 w-20 flex-shrink-0 rounded-full bg-zinc-300" />
              <div className="pb-16 pt-4">
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-2.5"
                >
                  <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
                  <p className="mr-[-1rem]">Date Added</p>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-2.5"
                >
                  <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
                  <p className="mr-[-1rem]">Number of Clicks</p>
                </Button>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger>
            <div className="hover:font-current hover:font-current mx-auto flex w-44 items-center justify-between rounded-md border bg-background p-1 text-sm font-medium ring-offset-background transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <span className=" flex items-center">
                <Icons.alignleft className="h-8 w-8 p-2" />
                Sort By
              </span>
              <span>
                <Icons.down className="h-8 w-8 p-2" />
              </span>
            </div>
          </PopoverTrigger>

          <PopoverContent className="flex w-44 flex-col ">
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2.5"
            >
              <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
              <p className="mr-[-1rem]">Date Added</p>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2.5"
            >
              <Icons.arrowdown className="ml-[-1rem] h-4 w-4" />
              <p className="mr-[-1rem]">Number of Clicks</p>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default SortBy;
