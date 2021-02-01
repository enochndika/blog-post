import { useEffect } from "react";
import { loggedUser } from "../../../auth/useUser";
import { updateUser } from "../../../actions/userActions";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import ProfileShow from "../../../components/skeleton/profile";
import Container from "../../../components/ui/container";
import { useForm } from "react-hook-form";
import Row from "../../../components/ui/row";
import { Input } from "../../../components/ui/form";
import { UserCircleIcon, UserMdIcon } from "../../../components/ui/icons";
import { Button } from "../../../components/ui/button";
import UserLayout from "../../../components/layout/user";

export default function Profile() {
  const { user, mutate } = loggedUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { register, formState, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName: user?.fullName,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName);
    }
  }, [user]);

  const onSubmit = async (values) => {
    await updateUser(
      values,
      user?.id,
      t("Actions.userActions.userUpdate.success"),
      t("Actions.userActions.userUpdate.error")
    );
    await mutate();
    await router.push("/");
  };
  if (!user) {
    return <ProfileShow />;
  }

  return (
    <>
      <Head>
        <title>@{user?.username}</title>
      </Head>
      <Container>
        <div className="mt-20 mb-4 text-center">
          {t("Pages.username.profile.index.title")}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-16 text-gray-700 dark:text-white"
        >
          <Row className="justify-center">
            <div className="col-12 md:col-7">
              <Input
                className="cursor-not-allowed"
                label={t("Helpers.auth.form.username")}
                disabled={true}
                value={user.username}
                name="username"
              >
                <UserCircleIcon className="h-5" />
              </Input>
            </div>
            <div className="col-12 md:col-7">
              <Input
                name="fullName"
                label={t("Helpers.auth.form.fullName")}
                ref={register()}
              >
                <UserMdIcon className="h-5 dark:text-grayer" />
              </Input>
              <Button
                color="dark"
                type="submit"
                className="w-full"
                disabled={formState.isSubmitting}
                size="md"
              >
                {t("Pages.username.profile.index.submitBtn")}
              </Button>
            </div>
          </Row>
        </form>
      </Container>
    </>
  );
}

Profile.Layout = UserLayout;
