import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import StarIcon from '@/components/icons/others/star';
import { getDistanceDateFormat } from '@/utils/formats';

export interface PostDetailsProps {
  author: string;
  category: string;
  date: Date;
  readTime: number;
}

const PostDetails = ({
  author,
  category,
  date,
  readTime,
}: PostDetailsProps) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return (
    <div className="text-gray-600 dark:text-grayer text-small">
      <div>
        <span className="mr-1 text-gray-900 dark:text-white">{author}</span>
        <span className="mr-1">{t('Components.default.category')}</span>
        <span className="mr-1 text-gray-900 dark:text-white">{category}</span>
      </div>
      <div className="flex">
        <span className="mr-1">{getDistanceDateFormat(date, locale)}</span>
        <span>&#9632;</span>
        <div className="flex ml-2">
          {readTime} {t('Components.default.estimatedRead')}{' '}
          <StarIcon size={20} className="h-3.5" space={3} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
