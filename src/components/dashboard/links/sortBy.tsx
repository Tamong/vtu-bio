import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SortBy = () => {
  return (
    <>
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
    </>
  );
};

export default SortBy;
