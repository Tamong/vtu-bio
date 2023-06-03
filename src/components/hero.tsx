import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero: NextPage = () => {
  return (
    <>
      <div className="flex min-w-full flex-col items-center justify-evenly bg-inherit sm:flex-row">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-[3rem]">
            Biography and
            <br />
            Short Links for
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              vTubers!
            </span>
          </h1>
          <div className="flex flex-row">
            <Link className="mr-4" href="/dashboard">
              <Button className="mt-4 font-bold">
                <ChevronRight size={16} />
                Get Started
              </Button>
            </Link>
            <Link href="/create">
              <Button className="mt-4 bg-secondary font-bold">
                <ChevronRight size={16} />
                Try a Demo
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-extrabold text-transparent sm:text-[5rem]">
            Logo
          </h1>
        </div>
      </div>
    </>
  );
};

export default Hero;
