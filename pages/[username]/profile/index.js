import { loggedUser } from "../../../auth/useUser";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import { Form, Formik } from "formik";
import DefaultLayout from "../../../components/layout/default";
import { updateUser } from "../../../utils/actions/userActions";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Profile() {
  const { user, mutate } = loggedUser();
  const router = useRouter();

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
          Your personal infos
        </div>
        <Formik
          initialValues={{
            fullName: user?.fullName,
          }}
          onSubmit={async (values) => {
            await updateUser(values, user?.id);
            await mutate();
            await router.push("/");
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <MDBRow center>
                <MDBCol md="7" lg="7">
                  <MDBInput
                    value={user.username}
                    icon="user-circle"
                    label="Username"
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
                    label="First and Lastname"
                    onChange={handleChange}
                  />
                </MDBCol>
                <MDBCol md="7" lg="7">
                  <MDBBtn
                    className="text-capitalize btn-block mt-4"
                    gradient="blue"
                    type="submit"
                    size="md"
                  >
                    Update
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
