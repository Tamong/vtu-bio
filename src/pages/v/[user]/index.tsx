import { type NextPage } from "next";
import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const Home: NextPage<{ user: string }> = ({ user }) => {
  const { data } = api.profile.getUser.useQuery({ slug: user });
  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const colorStyle = data.color
    ? { backgroundImage: `linear-gradient(to bottom, ${data.color}, #cccccc)` }
    : { backgroundImage: `linear-gradient(to bottom, #000000, #cccccc)` };

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta
          name="description"
          content={data.bio ? data.bio : "Link Collection for Vtubers!"}
        />
        <link rel="icon" href={data.image ? data.image : "/favicon.ico"} />
      </Head>
      <main
        className="flex min-h-screen flex-col items-center"
        style={colorStyle}
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <img
            className="h-128 w-128 rounded-full"
            src={data.image ? data.image : "/favicon.ico"}
            alt="Profile Picture"
          />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
            {data.name}
          </h1>
          <h2>
            {data.association &&
              data.association.map((association, index) => (
                <span key={index} className="gap-12 px-2">
                  {association.name}
                  {index !== data.association.length - 1}
                </span>
              ))}
          </h2>

          <div className="flex flex-col items-center gap-2">
            {data.socialLinks.map((link, index) => (
              <span key={index}>
                <Link
                  href={link.url}
                  target="_blank"
                  className="flex flex-row items-center gap-12 px-4"
                >
                  {link.provider}
                </Link>
                {index !== data.socialLinks.length - 1}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            {data.customLinks.map((link, index) => (
              <span key={index}>
                <Link
                  href={link.url}
                  target="_blank"
                  className="flex flex-row items-center gap-12 px-4"
                >
                  {link.title}
                </Link>
                {index !== data.socialLinks.length - 1}
              </span>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  await ssg.profile.getUser.prefetch({ slug: context.params?.user as string });

  const user = context.params?.user;

  if (typeof user !== "string") {
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
      user,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
