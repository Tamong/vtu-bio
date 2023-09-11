import { useState } from "react";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useRouter } from "next/router";
import { ModeToggle } from "@/components/mode-toggle";

type Props = {
  auth: boolean;
};

const HomeNav: React.FC<Props> = ({ auth }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleMenu = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleClick = () => {
    if (auth) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  return (
    <nav className="sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 pt-2">
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center justify-center space-x-4">
            <Link href="/" className="mr-4 flex">
              <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-sm">
                vtu<span className=" text-foreground">.</span>bio
              </h1>
            </Link>
          </div>

          <div className="hidden items-center md:flex">
            <Button onClick={handleClick}>
              {auth ? "Dashboard" : "Sign In"}
            </Button>
            <ModeToggle />
          </div>

          <div className="flex items-center md:hidden">
            <button name="menu" onClick={handleMenu}>
              <Icons.menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={!open ? "hidden md:hidden" : "pb-4 md:hidden"}>
        <div className="xl:w-96">
          <div className="flex justify-end pr-2.5">
            <Button onClick={handleClick}>
              {auth ? "Dashboard" : "Sign In"}
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
