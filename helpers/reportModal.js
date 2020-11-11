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
import { reportChildComment } from "../actions/childCommentActions";
import { reportComment } from "../actions/commentActions";
import { reportPost } from "../actions/postActions";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
              await reportChildComment(
                id,
                userId,
                values,
                t("Actions.comment.reportSuccess"),
                t("Actions.error")
              );
              toggle();
            }
            if (post) {
              await reportPost(
                id,
                userId,
                values,
                t("Actions.comment.reportSuccess"),
                t("Actions.error")
              );
              toggle();
            }
            if (comment) {
              await reportComment(
                id,
                userId,
                values,
                t("Actions.comment.reportSuccess"),
                t("Actions.error")
              );
              toggle();
            }
          }}
        >
          {({ values }) => (
            <Form>
              <MDBModalBody className="grey-text">
                <div id="my-radio-group" className="mb-3 h4-responsive">
                  {t("Helpers.reportModal.title")}
                </div>
                <div role="group" aria-labelledby="my-radio-group">
                  <div>
                    <label>
                      <Field
                        type="radio"
                        name="subject"
                        value={
                          reportType(t("Helpers.reportModal.type.spam")).spam
                        }
                      />
                      <span className="ml-2">
                        {reportType(t("Helpers.reportModal.type.spam")).spam}
                      </span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field
                        type="radio"
                        name="subject"
                        value={
                          reportType(
                            null,
                            null,
                            t("Helpers.reportModal.type.social")
                          ).social
                        }
                      />
                      <span className="ml-2">
                        {
                          reportType(
                            null,
                            null,
                            t("Helpers.reportModal.type.social")
                          ).social
                        }
                      </span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field
                        type="radio"
                        name="subject"
                        value={
                          reportType(
                            null,
                            t("Helpers.reportModal.type.violence"),
                            null
                          ).violence
                        }
                      />
                      <span className="ml-2">
                        {
                          reportType(
                            null,
                            t("Helpers.reportModal.type.violence"),
                            null
                          ).violence
                        }
                      </span>
                    </label>
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="red" size="sm" onClick={toggle}>
                  {t("Helpers.reportModal.cancelBtn")}
                </MDBBtn>
                <MDBBtn color="primary" size="sm" type="submit">
                  {t("Helpers.reportModal.confirmBtn")}
                </MDBBtn>
              </MDBModalFooter>
            </Form>
          )}
        </Formik>
      </MDBModal>
    </MDBContainer>
  );
};
