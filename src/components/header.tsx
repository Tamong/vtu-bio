import { type NextPage } from "next";
import { Separator } from "@/components/ui/separator";
import NavBar from "~/components/main-nav";

const Header: NextPage = () => {
  return (
    <header className="sticky top-0 z-50 bg-background ">
      <div className="relative mx-auto px-3 sm:px-6">
        <NavBar />
        {/* <SubMenu />*/}
      </div>

      <Separator />
    </header>
  );
};

export default Header;
