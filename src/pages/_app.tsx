import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";

const MyApp = ({
  Component,
  pageProps,
  router,
}: AppProps & { session: Session | null }) => {
  const { session, ...restPageProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <Component {...restPageProps} />
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
