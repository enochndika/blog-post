import { useFormik } from "formik";
import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdbreact";
import style from "../styles/helpers/auth.module.css";
import { signin, signup } from "../utils/actions/userActions";
import { userLoginSchema, userRegisterSchema } from "../validators/user";
import { FormError } from "../components/formError";
import { loggedUser } from "../auth/useUser";

export const Auth = ({ register }) => {
  const { mutate } = loggedUser();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullName: "",
    },
    validationSchema: register ? userRegisterSchema : userLoginSchema,
    onSubmit: async (values) => {
      if (register) {
        await signup(values);
      } else {
        await signin(values.username, values.password);
        await mutate();
      }
    },
  });

  return (
    <MDBContainer fluid className={style.container}>
      <MDBRow center className="mt-5 mb-5">
        <MDBCol md="6">
          <form onSubmit={formik.handleSubmit} className="grey-text">
            <div className="h3-responsive font-weight-bold text-center mb-4">
              {register ? "Register" : "Login"}
            </div>
            <MDBInput
              label="Username"
              icon="user-md"
              onChange={formik.handleChange}
              value={formik.values.username}
              type="text"
              name="username"
            />
            {formik.errors.username && formik.touched.username && (
              <FormError message={formik.errors.username} />
            )}
            <MDBInput
              icon="lock"
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              label="Password"
              name="password"
            />
            {formik.errors.password && formik.touched.password && (
              <FormError message={formik.errors.password} />
            )}
            {register && (
              <>
                <MDBInput
                  icon="male"
                  label="First and Lastname"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  type="text"
                  name="fullName"
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <FormError message={formik.errors.fullName} />
                )}
              </>
            )}
            <div className="text-center mt-4">
              <MDBBtn color="indigo" type="submit" size="sm">
                {register ? "Register" : "login"}
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
