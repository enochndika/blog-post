import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { updateComment } from '@/actions/commentActions';
import { useFetchUserProfile } from '@/actions/userActions';
import { updateChildComment } from '@/actions/childCommentActions';

interface UpdateCommentProps {
  content: string;
  id: number;
  onAbort: () => void;
  onSuccess: () => void;
  child: boolean;
}

const UpdateComment = ({
  content,
  id,
  onAbort,
  onSuccess,
  child,
}: UpdateCommentProps) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      id,
      content,
    },
  });
  const { t } = useTranslation();
  const { user } = useFetchUserProfile();

  const onSubmit = async (values) => {
    const data = { id: values.id, content: values.content };
    if (child) {
      await updateChildComment(user?.id, data);
      onSuccess();
    } else {
      await updateComment(user?.id, values, t('Actions.error'));
      onSuccess();
    }
  };
  return (
    <div className="mb-16 mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="id" ref={register({ required: true })} />
        <textarea
          rows={2}
          name="content"
          className="placeholder-gray-500 block mb-3 w-full dark:bg-darker border-b focus:border-blue-500 border-gray-300 focus:outline-none"
          disabled={formState.isSubmitting}
          ref={register()}
        />
        <div className="float-right">
          <span
            onClick={onAbort}
            className="pr-2 font-medium cursor-pointer"
            role="button"
          >
            {t('Helpers.updateComment.cancelBtn')}
          </span>
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            size="sm"
            className="text-capitalize"
            color="dark"
          >
            {t('Helpers.updateComment.confirmBtn')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateComment;
