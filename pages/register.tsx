import DefaultLayout from "../components/layout/default";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { ComponentType, useEffect } from "react";
import { getCookieFromBrowser } from "../auth/cookies";
import { useRouter } from "next/router";
import { AuthProps } from "../helpers/auth";

const Auth: ComponentType<AuthProps> = dynamic(
  () => import("../helpers/auth").then((mod) => mod.Auth),
  {
    ssr: true,
  }
);

export default function Register() {
  const token = getCookieFromBrowser("blog-jwt-token");
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <>
      <Head>
        <title>{t("Pages.register.title")}</title>
        <meta
          name="description"
          content="Créer un compte pour accéder au blog de Enoch Ndika"
        />
      </Head>
      <Auth login={false} />
    </>
  );
}

Register.Layout = DefaultLayout;
