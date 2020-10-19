import DefaultLayout from "../components/layout/default";
import { Auth } from "../helpers/auth";
import { loggedUser } from "../auth/useUser";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Signin() {
  const { user } = loggedUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Auth register={false} />
    </>
  );
}

Signin.Layout = DefaultLayout;
