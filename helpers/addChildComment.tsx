import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { addChildComment } from '@/actions/childCommentActions';
import { FormError } from '@/components/others/formError';
import { Button } from '@/components/ui/button';
import { useFetchUserProfile } from '@/actions/userActions';

interface AddChildCommentProps {
  comment: number;
  mutate: () => void;
}

export default function AddChildComment({
  comment,
  mutate,
}: AddChildCommentProps) {
  const { t } = useTranslation();
  const { user } = useFetchUserProfile();
  const { register, formState, handleSubmit, errors, reset } = useForm();

  const onSubmit = async (values) => {
    if (!user) {
      cogoToast.info(t('Helpers.addChildComment.replyNotAuth'), {
        position: 'top-right',
      });
      reset();
      return;
    }

    const data = {
      content: values.content,
      userId: user && user.id,
      commentId: comment,
    };

    await addChildComment(data, '');
    await mutate();
    await reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-5 ml-6">
      <div>
        <textarea
          rows={1}
          placeholder={t('Helpers.addChildComment.label')}
          name="content"
          ref={register({
            required: t('Helpers.addChildComment.textAreaRequired').toString(),
          })}
          className="w-full placeholder-gray-500 dark:bg-darker block border-b mb-3 border-gray-300 focus:border-blue-500 focus:outline-none"
          disabled={formState.isSubmitting}
        />
        {errors.content && (
          <FormError message={errors.content.message} className="pt-2" />
        )}
      </div>
      <Button
        className="-mt-12"
        color="dark"
        size="sm"
        type="submit"
        disabled={formState.isSubmitting}
      >
        {t('Helpers.addChildComment.submitBtn')}
      </Button>
    </form>
  );
}
