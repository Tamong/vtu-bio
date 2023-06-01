import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";
import { Button } from "@/components/ui/button";

const Hero: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-inherit">
        <h1 className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
          vtu<span className=" text-foreground">.</span>bio
        </h1>
      </div>
    </>
  );
};

export default Hero;
