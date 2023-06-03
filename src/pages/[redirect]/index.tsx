import Head from "next/head";
import type { NextPage, GetStaticProps } from "next";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const Redirect: NextPage<{ redirect: string }> = ({ redirect }) => {
  const { data } = api.redirect.getUrl.useQuery({ slug: redirect });

  if (!data) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          404 Page Not Found
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta
          name="description"
          content={
            data.description
              ? data.description
              : "Short Link provided by vtu.bio"
          }
        />
        <meta httpEquiv="Refresh" content={`0; url=${data.url}`} />
      </Head>
    </>
  );
};

export default Redirect;

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
