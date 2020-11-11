import { loggedUser } from "../../../auth/useUser";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import { Form, Formik } from "formik";
import DefaultLayout from "../../../components/layout/default";
import { updateUser } from "../../../actions/userActions";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user, mutate } = loggedUser();
  const router = useRouter();
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>@{user?.username}</title>
      </Head>
      <MDBContainer>
        <div className="h3-responsive grey-text font-weight-bold mt-5 mb-4 text-center">
          {t("Pages.username.profile.index.title")}
        </div>
        <Formik
          initialValues={{
            fullName: user?.fullName,
          }}
          onSubmit={async (values) => {
            await updateUser(
              values,
              user?.id,
              t("Actions.userActions.userUpdate.success"),
              t("Actions.userActions.userUpdate.error")
            );
            await mutate();
            await router.push("/");
          }}
        >
          {({ values, handleChange, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <MDBRow center>
                <MDBCol md="7" lg="7">
                  <MDBInput
                    value={user.username}
                    icon="user-circle"
                    label={t("Helpers.auth.form.username")}
                    iconClass="grey-text"
                    disabled
                  />
                </MDBCol>
                <MDBCol md="7" lg="7">
                  <MDBInput
                    value={values.fullName}
                    name="fullName"
                    icon="user-md"
                    iconClass="grey-text"
                    label={t("Helpers.auth.form.fullName")}
                    onChange={handleChange}
                  />
                </MDBCol>
                <MDBCol md="7" lg="7">
                  <MDBBtn
                    className="text-capitalize btn-block mt-4"
                    gradient="blue"
                    type="submit"
                    disabled={isSubmitting}
                    size="md"
                  >
                    {t("Pages.username.profile.index.submitBtn")}
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </Form>
          )}
        </Formik>
      </MDBContainer>
    </>
  );
}

Profile.Layout = DefaultLayout;
