import { GetServerSidePropsContext, type NextPage } from "next";
import Layout from "~/components/layout";
import Head from "next/head";
import { SignInCard } from "~/components/signInCard";
import { SignUpCard } from "~/components/signUpCard";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>SignIn - vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
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
      </Layout>
    </>
  );
};

export default SignIn;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  return {
    props: {},
  };
}
