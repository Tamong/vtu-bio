import { type NextPage } from "next";
import { Skeleton } from "@/components/ui/skeleton";

const Trusts: NextPage = () => {
  return (
    <>
      <div className="flex min-w-full flex-col items-center justify-evenly bg-inherit md:flex-row">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="flex flex-row items-center justify-center text-4xl font-extrabold md:text-[2.25rem]">
            Trusted by the Best!
          </h1>

          <div className="-ml-6 flex flex-col gap-16 lg:ml-0 lg:flex-row">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-20 w-20 rounded-3xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-20 w-20 rounded-3xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-20 w-20 rounded-3xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trusts;
