import { MDBBtn, MDBInput } from "mdbreact";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { useFormik } from "formik";
import { loggedUser } from "../auth/useUser";
import cogoToast from "cogo-toast";
import { addChildComment } from "../utils/actions/childCommentActions";

export const AddChildComment = ({ comment, mutate }) => {
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();

  const formik = useFormik({
    initialValues: {
      commentId: "",
      content: "",
      userId: "",
    },
    onSubmit: async (values, actions) => {
      const data = {
        content: values.content,
        userId: user && user.id,
        commentId: comment,
      };
      if (!user) {
        cogoToast.info("You must log in before replying to a comment", {
          position: "top-right",
        });
        actions.setSubmitting(false);
        actions.resetForm({ values: "" });
      }
      if (user) {
        await addChildComment(data);
        await mutate();
        actions.setSubmitting(false);
        actions.resetForm({ values: "" });
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <MDBInput
          label="Reply to this comment"
          name="content"
          onChange={formik.handleChange}
          value={formik.values.content}
          className="pb-1"
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
        Reply
      </MDBBtn>
    </form>
  );
};
