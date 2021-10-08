import cogoToast from 'cogo-toast';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { addComment } from '@/actions/commentActions';
import { FormError } from '@/components/others/formError';
import { useFetchUserProfile } from '@/actions/userActions';

interface AddCommentProps {
  post: number;
  mutate: () => void;
}

const AddComment = ({ post, mutate }: AddCommentProps) => {
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
        <label htmlFor="content" className="block font-medium">
          {t('Helpers.addComment.label')}
        </label>
        <textarea
          className="block my-2 pl-3 py-2 w-full text-black border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none"
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
};

export default AddComment;
