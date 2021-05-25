import cogoToast from 'cogo-toast';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormError } from '@/components/others/formError';
import { addComment } from '@/actions/commentActions';
import { useFetchUserProfile } from '@/actions/userActions';

interface AddCommentProps {
  post: number;
  mutate: () => void;
}

export default function AddComment({ post, mutate }: AddCommentProps) {
  const { t } = useTranslation();
  const { user } = useFetchUserProfile();
  const { register, formState, handleSubmit, errors, reset } = useForm();

  const onSubmit = async (values) => {
    if (!user) {
      cogoToast.info(t('Helpers.addComment.postCommentNotAuth'), {
        position: 'top-right',
      });
      reset();
      return;
    }

    const data = { content: values.content, userId: user?.id };
    await addComment(post, data, t('Actions.error'));
    await mutate();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-16">
      <div>
        <label htmlFor="content" className="font-medium block ">
          {t('Helpers.addComment.label')}
        </label>
        <textarea
          className="w-full py-2 pl-3 rounded-md my-2 block border border-gray-300 focus:border-blue-500 text-black focus:outline-none"
          id="content"
          rows={4}
          name="content"
          ref={register({
            required: t('Helpers.addComment.textAreaRequired').toString(),
          })}
          disabled={formState.isSubmitting}
        />
        {errors.content && (
          <FormError message={errors.content.message} className="pt-2" />
        )}
      </div>
      <Button
        color="dark"
        size="sm"
        type="submit"
        disabled={formState.isSubmitting}
      >
        {t('Helpers.addComment.submitBtn')}
      </Button>
    </form>
  );
}
