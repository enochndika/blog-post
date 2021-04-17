import { formatDate } from '@/utils/formats';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Row from './ui/row';
import { StarIcon } from './ui/icons';
import { PostProps } from '@/utils/defaultProps';

export const PopularTrendPosts = ({ post, number }: PostProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Row className="mt-2">
      <div className="col-1 md:col-2 pb-3 mr-4 md:mr-0">
        <h2 className="text-3xl text-gray-700 font-bold dark:text-white">
          {number}
        </h2>
      </div>
      <div className="col-10  md:col-9 m-0 p-0 mb-4">
        <Link href={`/posts/${post.slug}`} passHref>
          <div className="mb-2.5 text-gray-700 font-medium dark:text-white cursor-pointer">
            {post.title.slice(0, 20)}
          </div>
        </Link>
        <div
          className="text-gray-600 dark:text-grayer"
          style={{ fontSize: 13 }}
        >
          <div>
            <span className="text-gray-900 dark:text-white mr-1">
              {post.user?.fullName}
            </span>
            <span className="text-gray-400 mr-1">
              {t('Components.default.category')}
            </span>
            <span className="text-gray-900 dark:text-white mr-1">
              {post.posts_category?.name}
            </span>
          </div>
          <div className="flex flex-wrap">
            <span className="text-gray-400 mr-1">
              {formatDate(post.createdAt, router?.locale)}
            </span>
            <span>&#9632;</span>
            <span className="flex flex-wrap ml-2">
              {post.read_time} {t('Components.default.estimatedRead')}
              <StarIcon className="h-3.5 md:h-2.5 lg:h-3 ml-1" space={3} />
            </span>
          </div>
        </div>
      </div>
    </Row>
  );
};
