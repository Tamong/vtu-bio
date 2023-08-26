import { type NextPage } from "next";
import Layout from "~/components/dashboard/layout";
import Head from "next/head";

import { lazy, Suspense, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";

const CreateLink = lazy(
  () => import("~/components/dashboard/links/createLink")
);

import LinkCardSkeleton from "~/components/dashboard/links/LinkCardSkeleton";
const LinkCard = lazy(() => import("~/components/dashboard/links/LinkCard"));
const SortBy = lazy(() => import("~/components/dashboard/links/sortBy"));
const FilterBy = lazy(() => import("~/components/dashboard/links/filterBy"));
const FilterPanel = lazy(
  () => import("~/components/dashboard/links/filterPanel")
);

const Link: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const [filter, setFilter] = useState("");

  const { data } = api.dashboard.getLinks.useQuery({ filter: filter });

  const [sortBy, setSortBy] = useState("date");

  const handleSortBy = (sortBy: string) => {
    setSortBy(sortBy);
    if (!data) return;

    if (sortBy === "date") {
      data.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }
    if (sortBy === "clicks") {
      data.sort((a, b) => {
        return b.clicks - a.clicks;
      });
    }
  };

  if (status === "authenticated" || status === "loading") {
    return (
      <>
        <Head>
          <title>Links - vtu.bio</title>
        </Head>
        <Layout>
          {/* Header */}
          <div className="flex h-32 w-full items-center border-b bg-light">
            <div className="w-full items-center">
              <div className=" mx-auto flex max-w-screen-xl items-center justify-between px-2.5 lg:px-20">
                {/* Left Side */}
                <div className="flex items-center">
                  <h1 className="flex text-3xl font-semibold drop-shadow-sm">
                    My Links
                  </h1>
                </div>

                {/* Right Side */}
                <div className="flex items-center">
                  <Suspense>
                    <CreateLink />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
          {/* Body */}

          <div className="mx-auto h-fit w-full max-w-screen-xl justify-center  gap-5 pt-2.5  lg:px-20">
            {/* Top Menu */}
            <div className="flex items-center justify-between px-2 py-6 lg:justify-end lg:px-0">
              <div className="block lg:hidden">
                <Suspense fallback={<div>Loading...</div>}>
                  <FilterBy setFilter={setFilter} />
                </Suspense>
              </div>
              <div className="">
                <Suspense fallback={<div>Loading...</div>}>
                  <SortBy sortBy={sortBy} handleSortBy={handleSortBy} />
                </Suspense>
              </div>
            </div>

            {/* Content */}
            <div className="grid w-full max-w-screen-xl grid-cols-1 justify-center gap-5 lg:grid-cols-7 ">
              <div className="hidden lg:col-span-2 lg:block">
                <Suspense>
                  <FilterPanel setFilter={setFilter} />
                </Suspense>
              </div>
              <div className="grid h-20 gap-2.5 px-2 lg:col-span-5 lg:col-start-3 lg:px-0">
                {data ? (
                  data?.map((link) => (
                    <Suspense key={link.id}>
                      <LinkCard key={link.id} data={link} />
                    </Suspense>
                  ))
                ) : (
                  <>
                    <LinkCardSkeleton />
                    <LinkCardSkeleton />
                    <LinkCardSkeleton />
                    <LinkCardSkeleton />
                  </>
                )}
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else if (status === "unauthenticated") {
    void router.replace("/signin");
  }
  return null;
};

export default Link;
