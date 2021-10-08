import Row from '../ui/row';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { PostProps } from '@/utils/defaultProps';
import StarIcon from '@/components/icons/others/star';
import { getDistanceDateFormat } from '@/utils/formats';

const PopularTrendPosts = ({ post, number }: PostProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Row className="mt-2">
      <div className="col-2 md:col-2 md:mr-4">
        <h2 className="text-gray-700 dark:text-white text-3xl font-bold">
          {number}
        </h2>
      </div>
      <div className="col-10 md:col-9 m-0 mb-4 p-0">
        <Link href={`/posts/${post.slug}`} passHref>
          <div className="mb-2.5 text-gray-700 dark:text-white text-2xl font-medium cursor-pointer md:text-base">
            {post.title.slice(0, 20)}
          </div>
        </Link>
        <div
          className="text-gray-600 dark:text-grayer"
          style={{ fontSize: 13 }}
        >
          <div>
            <span className="mr-1 text-gray-900 dark:text-white">
              {post.author?.fullName}
            </span>
            <span className="mr-1 dark:text-gray-300 text-gray-600">
              {t('Components.default.category')}
            </span>
            <span className="mr-1 text-gray-900 dark:text-white">
              {post.category?.name}
            </span>
          </div>
          <div className="flex flex-wrap">
            <span className="mr-1 dark:text-gray-300 text-gray-600">
              {getDistanceDateFormat(post.createdAt, router?.locale)}
            </span>
            <span>&#9632;</span>
            <span className="flex flex-wrap ml-2">
              {post.read_time} {t('Components.default.estimatedRead')}
              <StarIcon className="ml-1 h-3.5 md:h-2.5 lg:h-3" space={3} />
            </span>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default PopularTrendPosts;
