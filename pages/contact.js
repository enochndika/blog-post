import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import DefaultLayout from "../components/layout/default";
import { useFormik } from "formik";
import { sendingMail } from "../actions/userActions";
import { FormError } from "../components/formError";
import style from "../styles/main/contact.module.css";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { sendingMailSchema } from "../validators/user";

export default function Contact() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: sendingMailSchema(
      t("Validators.user.sendingMail.email"),
      t("Validators.user.sendingMail.emailReq"),
      t("Validators.user.sendingMail.name"),
      t("Validators.user.sendingMail.message")
    ),
    onSubmit: async (values, actions) => {
      const data = {
        email: values.email,
        name: values.name,
        message: values.message,
      };
      await sendingMail(
        data,
        t("Actions.userActions.sendingMail.success"),
        t("Actions.userActions.sendingMail.error")
      );
      actions.resetForm({ values: "" });
      actions.setSubmitting(false);
    },
  });
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contacter Enoch Ndika" />
      </Head>
      <MDBContainer fluid className={style.container}>
        <div className="h3-responsive font-weight-bolder text-center my-5">
          Contact
        </div>
        <MDBRow className={style.main}>
          <MDBCol size="12" className="md-0 mb-5">
            <form onSubmit={formik.handleSubmit}>
              <MDBRow className="grey-text">
                <MDBCol className="grey-text">
                  <MDBInput
                    type="text"
                    id="contact-name"
                    label={t("Pages.contact.fullName")}
                    icon="male"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />

                  {formik.errors.name && formik.touched.name && (
                    <FormError message={formik.errors.name} />
                  )}
                  <MDBInput
                    type="email"
                    label={t("Pages.contact.email")}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    icon="at"
                    name="email"
                  />

                  {formik.errors.email && formik.touched.email && (
                    <FormError message={formik.errors.email} />
                  )}
                  <MDBInput
                    type="textarea"
                    label={t("Pages.contact.message")}
                    onChange={formik.handleChange}
                    icon="envelope"
                    value={formik.values.message}
                    name="message"
                  />

                  {formik.errors.message && formik.touched.message && (
                    <FormError message={formik.errors.message} />
                  )}
                </MDBCol>
              </MDBRow>
              <div className="text-center">
                <MDBBtn
                  gradient="blue"
                  size="md"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t("Pages.contact.submitBtn")}
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

Contact.Layout = DefaultLayout;
