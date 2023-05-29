import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { number } from "zod";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  interface User {
    name: string;
    description?: string;
    company: string[];
    pfp: string;
    links: Link[];
  }

  interface Link {
    provider: Provider;
    tag: string;
    icon: string;
  }

  interface Provider {
    name: string;
    url: string;
    icon: string;
  }

  const youtube: Provider = {
    name: "Youtube",
    url: "https://www.youtube.com/",
    icon: "../public/youtube.svg",
  };

  const twitter: Provider = {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: "../public/twitter.svg",
  };

  const twitch: Provider = {
    name: "Twitch",
    url: "https://www.twitch.tv/",
    icon: "../public/twitch.svg",
  };

  const myUser: User = {
    name: "Viichan",
    company: ["Isegye Idol", "Waktaverse"],
    pfp: "https://yt3.googleusercontent.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s176-c-k-c0x00ffffff-no-rj",
    links: [
      {
        provider: youtube,
        tag: "@viichan116",
        icon: "https://yt3.googleusercontent.com/OWP5IUNUf0ja8UZfD7qJJ8Qyw5Gr2zXwfavKM96L2x6XQVgDxwOdWp-JmAzeCDecL2yTpoyN=s176-c-k-c0x00ffffff-no-rj",
      },
      {
        provider: twitter,
        tag: "VIichan6",
        icon: "https://pbs.twimg.com/profile_images/1584824154708410368/NnDmVE1T_200x200.jpg",
      },
      {
        provider: twitch,
        tag: "viichan6",
        icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/959a3937-f979-43d9-bbaf-2eb2c31a3102-profile_image-70x70.png",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{myUser.name}</title>
        <meta
          name="description"
          content={
            myUser.description
              ? myUser.description
              : "Link Collection for Vtubers!"
          }
        />
        <link rel="icon" href={myUser.pfp} />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#a5de7f] to-[#cccccc]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <img
            className="h-128 w-128 rounded-full"
            src={myUser.pfp}
            alt="Profile Picture"
          />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
            {myUser.name}
          </h1>
          <h2>
            {myUser.company.map((company, index) => (
              <span key={index} className="gap-12 px-2">
                {company}
                {index !== myUser.company.length - 1}
              </span>
            ))}
          </h2>

          <div className="flex flex-col items-center gap-2">
            {myUser.links.map((link, index) => (
              <span key={index}>
                <a
                  href={link.provider.url + link.tag}
                  target="_blank"
                  className="flex flex-row items-center gap-12 px-4"
                >
                  {link.provider.name}
                  <img
                    className="h-12 w-12 rounded-full"
                    src={link.icon}
                    alt={link.provider.name}
                  />
                </a>
                {index !== myUser.links.length - 1}
              </span>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
