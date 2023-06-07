import Head from "next/head";
import type { NextPage, GetStaticProps } from "next";
import { unescape } from "html-escaper";
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
        <title>{unescape(data.title)}</title>
        <meta property="og:title" content={unescape(data.title)} />
        <meta property="og:site_name" content={unescape(data.url)} />
        <meta
          property="og:description"
          content={unescape(
            data.description
              ? data.description
              : "Short Link Generated by vtu.bio"
          )}
        />
        {/* <meta property="og:image" content={unescape(image)} />  */}
        <meta
          property="og:image:alt"
          content={`OG image for ${unescape(data.title)} (vtu.bio/${
            data.slug
          })`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={unescape(data.url)} />
        <meta name="twitter:title" content={unescape(data.title)} />
        <meta
          name="twitter:description"
          content={unescape(
            data.description
              ? data.description
              : "Short Link Generated by vtu.bio"
          )}
        />
        {/* <meta name="twitter:image" content={unescape(image)} /> */}
        <meta
          property="twitter:image:alt"
          content={`OG image for ${unescape(data.title)} (vtu.bio/${
            data.slug
          })`}
        />
        <meta charSet="utf-8" />

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
