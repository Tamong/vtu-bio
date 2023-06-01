import Navbar from "@/components/navbar";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <div className="w-full flex-col lg:max-w-6xl">
          <nav className="fixed w-full flex-col bg-background lg:max-w-6xl">
            <Navbar />
          </nav>
          <main className=" flex h-fit min-h-screen flex-col items-center justify-center">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
