import { Auth } from "../helpers/auth";
import DefaultLayout from "../components/layout/default";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Pages.register.title")}</title>
        <meta
          name="description"
          content="Créer un compte pour accéder au blog de Enoch Ndika"
        />
      </Head>
      <Auth register={true} />
    </>
  );
}

Register.Layout = DefaultLayout;
