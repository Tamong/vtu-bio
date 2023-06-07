import MainNav from "./main-nav";
import { Separator } from "@/components/ui/separator";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center">
        <div className="flex w-full flex-col">
          <header className="sticky top-0 z-50 bg-background ">
            <div className="relative mx-auto px-3 sm:px-6">
              <MainNav />
              {/* <SubMenu />*/}
            </div>

            <Separator />
          </header>
          <main className="mt-8 flex flex-col items-center gap-16">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
