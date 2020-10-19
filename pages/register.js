import { Auth } from "../helpers/auth";
import DefaultLayout from "../components/layout/default";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>register</title>
      </Head>
      <Auth register={true} />
    </>
  );
}

Register.Layout = DefaultLayout;
