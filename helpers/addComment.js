import { MDBBtn } from "mdbreact";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { useFormik } from "formik";
import { addComment } from "../actions/commentActions";
import { loggedUser } from "../auth/useUser";
import cogoToast from "cogo-toast";
import { useTranslation } from "react-i18next";

export const AddComment = ({ post, mutate }) => {
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      content: "",
      userId: "",
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const data = { content: values.content, userId: user?.id };
      if (!user) {
        cogoToast.info(t("Helpers.addComment.postCommentNotAuth"), {
          position: "top-right",
        });
        setSubmitting(false);
        resetForm({ values: "" });
      }
      if (user) {
        await addComment(post, data, t("Actions.error"));
        await mutate();
        setSubmitting(false);
        resetForm({ values: "" });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-5">
      <div className="form-group">
        <label htmlFor="content" className="font-weight-bold">
          {t("Helpers.addComment.label")}
        </label>
        <textarea
          className="form-control"
          id="content"
          rows="4"
          name="content"
          onChange={formik.handleChange}
          value={formik.values.content}
          disabled={formik.isSubmitting}
        />
      </div>
      <MDBBtn
        color={isMounted && theme === "light" ? "black" : "white"}
        size="sm"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {t("Helpers.addComment.submitBtn")}
      </MDBBtn>
    </form>
  );
};
