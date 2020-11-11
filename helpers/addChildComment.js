import { MDBBtn, MDBInput } from "mdbreact";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { useFormik } from "formik";
import { loggedUser } from "../auth/useUser";
import cogoToast from "cogo-toast";
import { addChildComment } from "../actions/childCommentActions";
import { useTranslation } from "react-i18next";

export const AddChildComment = ({ comment, mutate }) => {
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      commentId: "",
      content: "",
      userId: "",
    },
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const data = {
        content: values.content,
        userId: user && user.id,
        commentId: comment,
      };
      if (!user) {
        cogoToast.info(t("Helpers.addChildComment.replyNotAuth"), {
          position: "top-right",
        });
        setSubmitting(false);
        resetForm({ values: "" });
      }
      if (user) {
        await addChildComment(data);
        await mutate();
        setSubmitting(false);
        resetForm({ values: "" });
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <MDBInput
          label={t("Helpers.addChildComment.label")}
          name="content"
          onChange={formik.handleChange}
          value={formik.values.content}
          className="pb-1"
          disabled={formik.isSubmitting}
        />
      </div>
      <MDBBtn
        style={{ marginTop: "-25px" }}
        color={isMounted && theme === "light" ? "black" : "white"}
        size="sm"
        type="submit"
        className="text-capitalize"
        disabled={formik.isSubmitting}
      >
        {t("Helpers.addChildComment.submitBtn")}
      </MDBBtn>
    </form>
  );
};
