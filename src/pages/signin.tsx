import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { SignInCard } from "~/components/signInCard";
import { SignUpCard } from "~/components/signUpCard";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import HomeNav from "@/components/home-nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignIn: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    // Redirect to the dashboard page
    router.replace("/dashboard");

    return null; // Return null while the redirect happens
  }

  return (
    <>
      <Head>
        <title>SignIn - vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeNav />
      <div className="container flex flex-col items-center justify-center gap-2">
        <div>
          <div className="my-2 flex min-w-full justify-between text-xl ">
            <div className="flex items-center justify-center ">
              <Tabs defaultValue="signin" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <SignInCard />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpCard />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
