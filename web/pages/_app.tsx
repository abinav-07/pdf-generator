import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, GlobalStyles, Roles, parseJwt } from "../utils";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { message } from "antd";

const queryClient = new QueryClient({ defaultOptions: {} });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(parseJwt());

  const initialLoad = useCallback(() => {
    try {
      const parsedUser = parseJwt();

      setUser(parsedUser);

      return;
    } catch (error) {
      setUser(null);
      message.error("Unauthorized User");
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialLoad();
  }, []);
  return (
    <>
      <Head>
        <title>{"PDF Generator"}</title>
      </Head>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          loading={loading}
          user={user}
          setUser={setUser}
          role={user?.role as Roles}
        >
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
