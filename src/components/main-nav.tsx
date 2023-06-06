import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserNav } from "./user-nav";

const NavBar: NextPage = () => {

  const { data: sessionData } = useSession();

  return (
    <>
      <div className="flex justify-between pb-2 pt-3 md:px-4 md:pb-4 md:pt-6">
        {/* Left Side */}
        <div className="flex list-none items-center md:space-x-4">
          <li>
            <Link href="/" className="mr-4 flex">
              <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-sm md:text-3xl">
                vtu<span className=" text-foreground">.</span>bio
              </h1>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="mr-4 flex">
              {sessionData?.user.name}
            </Link>
          </li>
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
