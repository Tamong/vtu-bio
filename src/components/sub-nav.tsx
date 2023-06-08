import Link from "next/link";
import { useRouter } from "next/router";

type props = {
  sessionData: any; // Replace 'any' with the actual type of sessionData
};

const SubNav: React.FC<props> = ({ sessionData }) => {
  const router = useRouter();
  const pathComponents = router.pathname.split("/").slice(1);

  const isCurrentRoute = (route: string) => {
    const currentRoute = `/${pathComponents.join("/")}`;
    return currentRoute === route;
  };

  return (
    <>
      <div className="flex justify-between pb-2 md:px-4">
        <div className="flex list-none items-center space-x-3">
          <li>
            <Link
              href="/dashboard"
              className={`flex items-center font-semibold ${
                isCurrentRoute("/dashboard")
                  ? "font-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/link"
              className={`flex items-center font-semibold ${
                isCurrentRoute("/dashboard/link")
                  ? "font-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Links
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/vtuber"
              className={`flex items-center font-semibold ${
                isCurrentRoute("/dashboard/vtuber")
                  ? "font-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Vtubers
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className={`flex items-center font-semibold ${
                isCurrentRoute("/dashboard/settings")
                  ? "font-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Settings
            </Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default SubNav;
