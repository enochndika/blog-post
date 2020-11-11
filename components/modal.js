import { MDBModal, MDBModalBody, MDBRow } from "mdbreact";
import { Spinner } from "./spinner";
import { useState } from "react";
import style from "../styles/components/modal.module.css";

export const Modal = ({ isOpen, content }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <MDBModal
      contentClassName={style.contentDark}
      isOpen={isOpen}
      centered
      toggle={() => isOpen}
      inline={false}
      noClickableBodyWithoutBackdrop={true}
      overflowScroll={true}
      backdrop={true}
      disableBackdrop={false}
    >
      <MDBModalBody>
        <MDBRow center>
          <Spinner />
        </MDBRow>
        <MDBRow center>{content}</MDBRow>
      </MDBModalBody>
    </MDBModal>
  );
};
