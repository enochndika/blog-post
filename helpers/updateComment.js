import { useFormik } from "formik";
import { updateComment } from "../actions/commentActions";
import { MDBBtn, MDBInput } from "mdbreact";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { loggedUser } from "../auth/useUser";
import { updateChildComment } from "../actions/childCommentActions";
import { useTranslation } from "react-i18next";

export const UpdateComment = ({ content, id, onAbort, onSuccess, child }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();

  const formik = useFormik({
    initialValues: {
      id: id,
      content: content,
    },
    onSubmit: async (values) => {
      if (child) {
        await updateChildComment(user?.id, values);
        onSuccess();
      } else {
        await updateComment(user?.id, values, t("Actions.error"));
        onSuccess();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <MDBInput
        value={formik.values.content}
        name="content"
        disabled={formik.isSubmitting}
        onChange={formik.handleChange}
      />
      <div className="float-right" style={{ marginTop: "-25px" }}>
        <span onClick={onAbort} className="text-capitalize dark-grey-text">
          {t("Helpers.updateComment.cancelBtn")}
        </span>
        <MDBBtn
          type="submit"
          disabled={formik.isSubmitting}
          size="sm"
          className="text-capitalize"
          color={isMounted && theme === "light" ? "dark" : "white"}
        >
          {t("Helpers.updateComment.confirmBtn")}
        </MDBBtn>
      </div>
    </form>
  );
};
