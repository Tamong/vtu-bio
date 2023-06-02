import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const Home: NextPage<{ user: string }> = ({ user }) => {
  const { data } = api.profile.getUser.useQuery({ slug: user });
  console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const bgcolor = data.color
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
      </Head>
      <main className="flex min-h-screen flex-col items-center" style={bgcolor}>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Image
            className="h-128 w-128 rounded-2xl shadow-2xl"
            src={data.image ? data.image : "/favicon.ico"}
            alt="Profile Picture"
          />
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl sm:text-[4rem]">
              {data.name}
            </h1>
            <h2 className="mt-2">
              {data.association &&
                data.association.map((association, index) => (
                  <span
                    key={index}
                    className="px-2 text-lg font-bold"
                    style={
                      association.color
                        ? {
                            color: association.color,
                          }
                        : { color: "#9ca3af" }
                    }
                  >
                    {association.name}
                    {index !== data.association.length - 1}
                  </span>
                ))}
            </h2>
            <h2 className="mt-4">
              {data.tag &&
                data.tag.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-4 inline-block rounded-full bg-slate-700 px-3 text-slate-300"
                  >
                    {tag.name}
                    {index !== data.tag.length - 1}
                  </span>
                ))}
            </h2>
          </div>

          <div className="flex flex-col items-center gap-2">
            {data.links.map((link, index) => (
              <span key={index}>
                <Link
                  href={`/${link.slug}`}
                  target="_blank"
                  className="flex flex-row items-center gap-12 px-4"
                >
                  {link.title}
                  {link.socialLink && ` - ` + link.socialLink.provider}
                  {link.description && ` - ` + link.description}
                </Link>
                {index !== data.links.length - 1}
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
