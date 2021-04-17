import { updateComment } from '../actions/commentActions';
import { loggedUser } from '../auth/useUser';
import { updateChildComment } from '../actions/childCommentActions';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';

interface UpdateCommentProps {
  content: string;
  id: number;
  onAbort: () => void;
  onSuccess: () => void;
  child: boolean;
}
export const UpdateComment = ({
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
  const { user } = loggedUser();

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
    <div className="mt-8 mb-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="id" ref={register({ required: true })} />
        <textarea
          rows={2}
          name="content"
          className="w-full placeholder-gray-500 dark:bg-darker block border-b mb-3 border-gray-300 focus:border-blue-500 focus:outline-none"
          disabled={formState.isSubmitting}
          ref={register()}
        />
        <div className="float-right">
          <span
            onClick={onAbort}
            className="font-medium pr-2 cursor-pointer"
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
