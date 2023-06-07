import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserNav } from "./user-nav";
import { Icons } from "@/components/icons";

const NavBar: NextPage = () => {
  const router = useRouter();
  const pathComponents = router.pathname.split("/").slice(2);

  return (
    <>
      <div className="flex justify-between pb-2 pt-3 md:px-4 md:pb-4 md:pt-6">
        {/* Left Side */}
        <div className="flex list-none items-center md:space-x-3">
          <li>
            <Link href="/" className="flex">
              <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-sm md:text-3xl">
                vtu<span className=" text-foreground">.</span>bio
              </h1>
            </Link>
          </li>

          {pathComponents.map((path, index) => (
            <>
              <li>
                <Icons.slash className="text-muted-foreground" />
              </li>
              <li key={index}>
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
            </>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center md:flex ">
          <UserNav />
        </div>
        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <UserNav />
        </div>
      </div>
    </>
  );
};

export default NavBar;
