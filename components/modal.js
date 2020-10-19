import { MDBContainer, MDBModal, MDBModalBody, MDBRow } from "mdbreact";
import { Spinner } from "./spinner";
import { useState } from "react";

export const Modal = ({ isOpen, content }) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <MDBContainer>
      <MDBModal
        isOpen={isOpen}
        centered
        toggle={() => setOpen(open)}
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
    </MDBContainer>
  );
};
