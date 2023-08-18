import MainNav from "./main-nav";
import SubNav from "./sub-nav";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-col">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className=" relative mx-auto h-28 max-w-screen-xl px-2.5 lg:px-20">
              <MainNav />
              <SubNav />
            </div>
          </header>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Layout;