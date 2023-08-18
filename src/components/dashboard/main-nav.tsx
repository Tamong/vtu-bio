import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserNav } from "./user-nav";
import { Icons } from "@/components/icons";
import { Skeleton } from "../ui/skeleton";
import { Fragment } from "react";

const MainNav = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const pathComponents = router.pathname.split("/").slice(2);

  return (
    <>
      <div className="flex h-16 items-center justify-between">
        {/* Left Side */}
        <div className="flex list-none items-center">
          <li>
            <Link href="/dashboard" className="flex items-center">
              <Icons.mask className="h-8 w-8 text-foreground" />
            </Link>
          </li>

          {pathComponents.map((path, index) => (
            <Fragment key={index}>
              <li>
                <Icons.slash className="h-8 w-8 text-border/20" />
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
          <Skeleton className="h-9 w-9 rounded-full" />
        )}
      </div>
    </>
  );
};

export default MainNav;
