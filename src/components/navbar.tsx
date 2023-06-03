import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const Navbar: NextPage = () => {
  return (
    <div className="mx-8 mb-4 mt-8 flex">
      <nav className="flex min-w-full justify-between text-xl">
        <div className="flex items-center justify-center ">
          <Link href="/" className="mr-4 flex">
            <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-sm">
              vtu<span className=" text-foreground">.</span>bio
            </h1>
          </Link>
        </div>

        <div className="hidden font-medium sm:flex">
          <Auth />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="left-0 top-0 flex items-center space-x-4">
      {sessionData ? (
        <Link
          href="/dashboard"
          className={cn("transition-colors hover:text-foreground/80")}
        >
          Dashboard
        </Link>
      ) : null}

      <Button
        className="py-2"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};
