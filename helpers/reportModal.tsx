import { reportType } from "../utils/reportText";
import { useReportChildComment } from "../actions/childCommentActions";
import { reportComment } from "../actions/commentActions";
import { reportPost } from "../actions/postActions";
import { useTranslation } from "react-i18next";
import Container from "../components/ui/container";
import Modal from "../components/ui/modal";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { FormError } from "../components/formError";

export interface ReportModalProps {
  isOpen: boolean;
  toggle: () => void;
  id: number;
  userId: number;
  child?: boolean;
  post?: boolean;
  comment?: boolean;
}
export const ReportModal = ({
  isOpen,
  toggle,
  id,
  userId,
  child,
  post,
  comment,
}: ReportModalProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (values) => {
    if (child) {
      await useReportChildComment(
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
  };

  return (
    <Container>
      <Modal isOpen={isOpen} toggle={toggle} backdrop={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="text-gray-700 dark:text-white">
            <div className="mb-5 text-2xl font-medium">
              {t("Helpers.reportModal.title")}
            </div>
            {errors.subject && <FormError message={errors.subject.message} />}
            <div>
              <label>
                <input
                  type="radio"
                  ref={register({
                    required: t("Helpers.reportModal.requiredField").toString(),
                  })}
                  name="subject"
                  value={
                    reportType(t("Helpers.reportModal.type.spam"), null, null)
                      .spam
                  }
                />
                <span className="ml-2">
                  {
                    reportType(t("Helpers.reportModal.type.spam"), null, null)
                      .spam
                  }
                </span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  ref={register({
                    required: t("Helpers.reportModal.requiredField").toString(),
                  })}
                  name="subject"
                  value={
                    reportType(null, null, t("Helpers.reportModal.type.social"))
                      .social
                  }
                />
                <span className="ml-2">
                  {
                    reportType(null, null, t("Helpers.reportModal.type.social"))
                      .social
                  }
                </span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  ref={register({
                    required: t("Helpers.reportModal.requiredField").toString(),
                  })}
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
          </Modal.Body>
          <Modal.Footer>
            <div className="mr-3">
              <Button color="danger" size="sm" type="button" onClick={toggle}>
                {t("Helpers.reportModal.cancelBtn")}
              </Button>
            </div>
            <Button color="primary" size="sm" type="submit">
              {t("Helpers.reportModal.confirmBtn")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
};
