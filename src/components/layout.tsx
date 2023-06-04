import Navbar from "@/components/navbar";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <div className="w-full flex-col">
          <Navbar />
          <main className="mt-8 flex flex-col items-center gap-16">
            <div className="flex max-w-6xl flex-col gap-y-16">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
