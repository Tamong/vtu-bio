import { type NextPage } from "next";
import { GetStaticProps } from "next";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const Redirect: NextPage<{ redirect: string }> = ({ redirect }) => {
  const { data } = api.redirect.getUrl.useQuery({ slug: redirect });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <meta http-equiv="Refresh" content={`0; url=${data.url}`} />
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
