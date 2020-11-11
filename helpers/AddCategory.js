import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import { useState } from "react";
import { Field, Form, Formik, useFormik } from "formik";
import { reportType } from "../utils/reportText";
import { reportChildComment } from "../actions/childCommentActions";
import { reportComment } from "../actions/commentActions";
import {
  addPostCategory,
  reportPost,
  updatePostCategory,
} from "../actions/postActions";
export const AddCategory = ({ isOpen, toggle, mutate }) => {
  const [open, setOpen] = useState(isOpen);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values, actions) => {
      await addPostCategory(values);
      actions.resetForm({ values: "" });
      mutate();
      toggle();
    },
  });
  return (
    <MDBContainer>
      <MDBModal
        isOpen={isOpen}
        toggle={toggle}
        inline={false}
        noClickableBodyWithoutBackdrop={false}
        overflowScroll={true}
        backdrop={true}
        disableBackdrop={false}
      >
        <form onSubmit={formik.handleSubmit}>
          <MDBModalBody className="grey-text">
            <MDBInput
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              label="Nom"
              icon="list-alt"
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="red" size="sm" onClick={toggle}>
              Annuler
            </MDBBtn>
            <MDBBtn
              size="md"
              className="text-capitalize"
              gradient="blue"
              type="submit"
            >
              Ajouter
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    </MDBContainer>
  );
};
