import Head from "next/head";
import LoginAdminPage from "./login";
import Members from "./admin/members";
import PrivateRoute from "@/privateRoute";

function Home() {
  return (
    <>
      <Head>
        <title> {"Top Page"}</title>
      </Head>
      <Members />
    </>
  );
}

export default PrivateRoute(Home, { type: "Admin" });
