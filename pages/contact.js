import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import DefaultLayout from "../components/layout/default";
import { useFormik } from "formik";
import { sendingMail } from "../utils/actions/userActions";
import * as Yup from "yup";
import { FormError } from "../components/formError";
import style from "../styles/main/contact.module.css";

export default function Contact() {
  const schema = Yup.object({
    email: Yup.string()
      .required("veuillez saisir votre adresse mail")
      .email("La valeur saisie ne respecte pas le format email"),
    name: Yup.string().required("Veuillez saisir votre prénom et nom"),
    message: Yup.string().required("Veuillez saisir un message"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      const data = {
        email: values.email,
        name: values.name,
        message: values.message,
      };
      await sendingMail(data);
      actions.resetForm({ values: "" });
      actions.setSubmitting(false);
    },
  });
  return (
    <MDBContainer fluid className={style.container}>
      <div className="h3-responsive font-weight-bolder text-center my-5">
        Contact Form
      </div>
      <MDBRow className={style.main}>
        <MDBCol size="12" className="md-0 mb-5">
          <form onSubmit={formik.handleSubmit}>
            <MDBRow className="grey-text">
              <MDBCol className="grey-text">
                <MDBInput
                  type="text"
                  id="contact-name"
                  label="Name"
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
                  label="Email"
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
                  label="Message"
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
                Send
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

Contact.Layout = DefaultLayout;
