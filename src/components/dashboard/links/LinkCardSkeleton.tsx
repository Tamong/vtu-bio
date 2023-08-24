"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Icons } from "~/components/icons";

const LinkCardSkeleton = () => {
  // Move the hook call inside the component

  return (
    <>
      <Card className="flex h-20 items-center justify-between border-none bg-light px-2 drop-shadow-lg">
        <CardContent>
          <div className="mx-auto flex items-center">
            <div>
              <div className="mb-2 flex w-56 flex-row items-center justify-between gap-2 font-medium">
                <Skeleton className="h-4 w-44" />
              </div>
              <div>
                <div className="flex flex-row items-center ">
                  <Skeleton className="h-4 w-[4.5rem]" />
                  <Icons.dot className="h-4 w-4" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Icons.more className="mr-2 h-4 w-4" />
        </CardContent>
      </Card>
    </>
  );
};

export default LinkCardSkeleton;
