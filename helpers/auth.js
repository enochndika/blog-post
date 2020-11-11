import { useFormik } from "formik";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdbreact";
import style from "../styles/helpers/auth.module.css";
import { signin, signup } from "../actions/userActions";
import { userLoginSchema, userRegisterSchema } from "../validators/user";
import { FormError } from "../components/formError";
import { loggedUser } from "../auth/useUser";
import { useTranslation } from "react-i18next";

export const Auth = ({ register }) => {
  const { t } = useTranslation();
  const { mutate } = loggedUser();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullName: "",
    },
    validationSchema: register
      ? userRegisterSchema(
          t("Validators.user.userRegister.username"),
          t("Validators.user.userRegister.password"),
          t("Validators.user.userRegister.fullName")
        )
      : userLoginSchema(
          t("Validators.user.userLogin.username"),
          t("Validators.user.userLogin.password")
        ),
    onSubmit: async (values, { setSubmitting }) => {
      if (register) {
        await signup(
          values,
          t("Actions.userActions.signup.success"),
          t("Actions.userActions.signup.error")
        );
        await setSubmitting(false);
      } else {
        await signin(
          values.username,
          values.password,
          t("Actions.userActions.signin.success"),
          t("Actions.userActions.signin.error")
        );
        await setSubmitting(false);
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
              {register
                ? t("Helpers.auth.title.register")
                : t("Helpers.auth.title.login")}
            </div>
            <MDBInput
              disabled={formik.isSubmitting}
              label={t("Helpers.auth.form.username")}
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
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              label={t("Helpers.auth.form.password")}
              name="password"
            />
            {formik.errors.password && formik.touched.password && (
              <FormError message={formik.errors.password} />
            )}
            {register && (
              <>
                <MDBInput
                  icon="male"
                  label={t("Helpers.auth.form.fullName")}
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  disabled={formik.isSubmitting}
                  type="text"
                  name="fullName"
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <FormError message={formik.errors.fullName} />
                )}
              </>
            )}
            <div className="text-center mt-4">
              <MDBBtn
                color="indigo"
                type="submit"
                className="text-capitalize"
                size="sm"
                disabled={formik.isSubmitting}
              >
                {register
                  ? t("Helpers.auth.form.submit.register")
                  : t("Helpers.auth.form.submit.login")}
                {formik.isSubmitting && (
                  <span className="ml-1">
                    ...
                    <MDBIcon icon="circle-notch" spin />
                  </span>
                )}
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
