import React, { Component, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import { useFormik } from "formik";

export const ModalSearch = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
    },
    onSubmit: (values) => {},
  });
  return (
    <MDBContainer>
      <MDBBtn color="info" onClick={toggle}>
        Right
      </MDBBtn>
      <MDBModal
        isOpen={modal}
        toggle={toggle}
        fullHeight
        position="top"
        contentClassName="issou"
      >
        <MDBModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};
