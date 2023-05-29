import { useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import { number } from "zod";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const Home: NextPage<{ redirect: string }> = ({ redirect }) => {
  const { data } = api.redirect.getUrl.useQuery({ slug: redirect });

  if (!data) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (data && data.url) {
      window.location.href = data.url;
    }
  }, [data]);

  return null;
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  await ssg.redirect.getUrl.prefetch({
    slug: context.params?.redirect as string,
  });

  const redirect = context.params?.redirect;

  if (typeof redirect !== "string") {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      redirect,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
