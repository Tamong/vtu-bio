import Header from "~/components/header";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center">
        <div className="flex w-full flex-col">
          <Header />
          <main className="mt-8 flex flex-col items-center gap-16">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
