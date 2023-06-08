import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserNav } from "./user-nav";
import { Icons } from "@/components/icons";
import { Skeleton } from "./ui/skeleton";
import { Fragment } from "react";

type props = {
  sessionData: any; // Replace 'any' with the actual type of sessionData
};

const MainNav: React.FC<props> = ({ sessionData }) => {
  const router = useRouter();
  const pathComponents = router.pathname.split("/").slice(2);

  return (
    <>
      <div className="flex justify-between pb-2 pt-3 md:px-4 md:pb-4 md:pt-6">
        {/* Left Side */}
        <div className="flex list-none items-center md:space-x-3">
          <li>
            <Link href="/dashboard" className="flex items-center">
              <Icons.mask className="h-8 w-8 text-foreground" />
            </Link>
          </li>

          {pathComponents.map((path, index) => (
            <Fragment key={index}>
              <li>
                <Icons.slash className="h-6 w-6 text-border" />
              </li>
              <li>
                <Link
                  href={`/dashboard/${pathComponents
                    .slice(0, index + 1)
                    .join("/")}`}
                  className="mr-4 flex font-semibold capitalize"
                >
                  {path}
                </Link>
              </li>
              {index < pathComponents.length - 1 && <Icons.slash />}
            </Fragment>
          ))}
        </div>

        {/* Right Side */}
        {sessionData ? (
          <div className="block items-center md:flex ">
            <UserNav sessionData={sessionData} />
          </div>
        ) : (
          <Skeleton className="h-8 w-8 rounded-full" />
        )}
      </div>
    </>
  );
};

export default MainNav;
