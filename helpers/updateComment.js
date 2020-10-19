import { useFormik } from "formik";
import { updateComment } from "../utils/actions/commentActions";
import { MDBBtn, MDBInput } from "mdbreact";
import { useTheme } from "next-themes";
import { useMounted } from "../utils/mounted";
import { loggedUser } from "../auth/useUser";
import { updateChildComment } from "../utils/actions/childCommentActions";

export const UpdateComment = ({ content, id, onAbort, onSuccess, child }) => {
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
        await updateComment(user?.id, values);
        onSuccess();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <MDBInput
        value={formik.values.content}
        name="content"
        onChange={formik.handleChange}
      />
      <div className="float-right" style={{ marginTop: "-25px" }}>
        <span onClick={onAbort} className="text-capitalize dark-grey-text">
          Cancel
        </span>
        <MDBBtn
          type="submit"
          size="sm"
          className="text-capitalize"
          color={isMounted && theme === "light" ? "dark" : "white"}
        >
          Confirm
        </MDBBtn>
      </div>
    </form>
  );
};
