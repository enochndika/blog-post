import { MDBBtn } from "mdbreact";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { useFormik } from "formik";
import { addComment } from "../utils/actions/commentActions";
import { loggedUser } from "../auth/useUser";
import cogoToast from "cogo-toast";

export const AddComment = ({ post, mutate }) => {
  const { theme } = useTheme();
  const isMounted = useMounted();
  const { user } = loggedUser();

  const formik = useFormik({
    initialValues: {
      content: "",
      userId: "",
    },
    onSubmit: async (values, actions) => {
      const data = { content: values.content, userId: user?.id };
      if (!user) {
        cogoToast.info("You must log in before adding comment", {
          position: "top-right",
        });
        actions.setSubmitting(false);
        actions.resetForm({ values: "" });
      }
      if (user) {
        await addComment(post, data);
        await mutate();
        actions.setSubmitting(false);
        actions.resetForm({ values: "" });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-5">
      <div className="form-group">
        <label htmlFor="content" className="font-weight-bold">
          Leave a comment
        </label>
        <textarea
          className="form-control"
          id="content"
          rows="4"
          name="content"
          onChange={formik.handleChange}
          value={formik.values.content}
        />
      </div>
      <MDBBtn
        color={isMounted && theme === "light" ? "black" : "white"}
        size="sm"
        type="submit"
        disabled={formik.isSubmitting}
      >
        Comment
      </MDBBtn>
    </form>
  );
};
