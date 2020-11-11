import DefaultLayout from "../components/layout/default";
import { Auth } from "../helpers/auth";
import { loggedUser } from "../auth/useUser";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function Signin() {
  const { user } = loggedUser();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>{t("Pages.signin.title")}</title>
        <meta name="description" content="Connectez-vous avec votre compte" />
      </Head>
      <Auth register={false} />
    </>
  );
}

Signin.Layout = DefaultLayout;
