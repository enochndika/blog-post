import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/ui/modal';
import reportType from '@/utils/reportText';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { reportPost } from '@/actions/postActions';
import { reportComment } from '@/actions/commentActions';
import { FormError } from '@/components/others/formError';
import { reportChildComment } from '@/actions/childCommentActions';

export interface ReportModalProps {
  isOpen: boolean;
  toggle: () => void;
  id: number;
  userId: number;
  child?: boolean;
  post?: boolean;
  comment?: boolean;
}
const ReportModal = ({
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
    //if it's report for child comment
    if (child) {
      await reportChildComment(
        id,
        userId,
        values,
        t('Actions.comment.reportSuccess'),
        t('Actions.error'),
      );
      toggle();
    }

    //if it's report for blog post
    if (post) {
      await reportPost(
        id,
        userId,
        values,
        t('Actions.comment.reportSuccess'),
        t('Actions.error'),
      );
      toggle();
    }

    //if it's report for comment
    if (comment) {
      await reportComment(
        id,
        userId,
        values,
        t('Actions.comment.reportSuccess'),
        t('Actions.error'),
      );
      toggle();
    }
  };

  return (
    <Container>
      <Modal isOpen={isOpen} toggle={toggle} backdrop={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>{t('Helpers.reportModal.title')}</Modal.Header>
          <Modal.Body className="text-gray-700 dark:text-white">
            {errors.subject && <FormError message={errors.subject.message} />}
            <div>
              <label>
                <input
                  type="radio"
                  ref={register({
                    required: t('Helpers.reportModal.requiredField').toString(),
                  })}
                  name="subject"
                  value={
                    reportType(t('Helpers.reportModal.type.spam'), null, null)
                      .spam
                  }
                />
                <span className="ml-2">
                  {
                    reportType(t('Helpers.reportModal.type.spam'), null, null)
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
                    required: t('Helpers.reportModal.requiredField').toString(),
                  })}
                  name="subject"
                  value={
                    reportType(null, null, t('Helpers.reportModal.type.social'))
                      .social
                  }
                />
                <span className="ml-2">
                  {
                    reportType(null, null, t('Helpers.reportModal.type.social'))
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
                    required: t('Helpers.reportModal.requiredField').toString(),
                  })}
                  name="subject"
                  value={
                    reportType(
                      null,
                      t('Helpers.reportModal.type.violence'),
                      null,
                    ).violence
                  }
                />
                <span className="ml-2">
                  {
                    reportType(
                      null,
                      t('Helpers.reportModal.type.violence'),
                      null,
                    ).violence
                  }
                </span>
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="mr-3">
              <Button color="danger" size="sm" type="button" onClick={toggle}>
                {t('Helpers.reportModal.cancelBtn')}
              </Button>
            </div>
            <Button color="primary" size="sm" type="submit">
              {t('Helpers.reportModal.confirmBtn')}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  );
};

export default ReportModal;
