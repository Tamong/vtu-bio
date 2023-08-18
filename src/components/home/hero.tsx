import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
//import { api } from "~/utils/api";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/router";

const Hero: NextPage = () => {
  const router = useRouter();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || ref.current === null) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        setRotation({ x: -y / 36, y: x / 48 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="my-32 flex min-w-full flex-col items-center justify-evenly bg-inherit md:flex-row">
        <div className="flex flex-col items-center justify-center px-4 text-4xl font-extrabold md:items-start md:text-[3rem]">
          <h1>Custom Bio and</h1>
          <h1>Short Links for</h1>
          <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            vTubers!
          </h1>
          <div className="mr-4 flex flex-row">
            <Button
              className="mt-4 font-bold"
              onClick={() => router.push("/dashboard")}
            >
              <ChevronRight size={16} />
              Get Started
            </Button>
          </div>
        </div>
        <div
          ref={ref}
          className="flex flex-col items-center justify-center"
          style={{
            transform: `perspective(500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          <Icons.logo className="h-48 w-48" />
        </div>
      </div>
    </>
  );
};

export default Hero;
