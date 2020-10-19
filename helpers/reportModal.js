import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { reportType } from "../utils/reportText";
import { reportChildComment } from "../utils/actions/childCommentActions";
import { reportComment } from "../utils/actions/commentActions";
import { reportPost } from "../utils/actions/postActions";
export const ReportModal = ({
  isOpen,
  toggle,
  id,
  userId,
  child,
  post,
  comment,
}) => {
  const [open, setOpen] = useState(isOpen);

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
        <Formik
          initialValues={{
            subject: "",
          }}
          onSubmit={async (values) => {
            if (child) {
              await reportChildComment(id, userId, values);
              toggle();
            }
            if (post) {
              await reportPost(id, userId, values);
              toggle();
            }
            if (comment) {
              await reportComment(id, userId, values);
              toggle();
            }
          }}
        >
          {({ values }) => (
            <Form>
              <MDBModalBody className="grey-text">
                <div id="my-radio-group" className="mb-3 h4-responsive">
                  {comment || (child && "Report comment")}
                  {post && "Report this post"}
                </div>
                <div role="group" aria-labelledby="my-radio-group">
                  <div>
                    <label>
                      <Field
                        type="radio"
                        name="subject"
                        value={reportType.spam}
                      />
                      <span className="ml-2"> {reportType.spam}</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field
                        type="radio"
                        name="subject"
                        value={reportType.social}
                      />
                      <span className="ml-2"> {reportType.social}</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field
                        type="radio"
                        name="subject"
                        value={reportType.violence}
                      />
                      <span className="ml-2"> {reportType.violence}</span>
                    </label>
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="red" size="sm" onClick={toggle}>
                  Cancel
                </MDBBtn>
                <MDBBtn color="primary" size="sm" type="submit">
                  Report
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          )}
        </Formik>
      </MDBModal>
    </MDBContainer>
  );
};
