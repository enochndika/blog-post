import Link from 'next/link';

import Row from '../ui/row';
import Image from './image';
import PostDetails from './postDetails';

const TrendPost = ({ post }: { post: any }) => (
  <Row className="mt-2">
    <div className="col-12 lg:col-4 mb-6">
      <Link href={`/posts/${post.slug}`}>
        <a>
          <Image
            src={post.image[0]}
            width={1500}
            height={1000}
            className="block w-full cursor-pointer"
            alt={post.title}
          />
        </a>
      </Link>
    </div>
    <div className="col-12 lg:col-8 mb-12 md:mb-5">
      <div className="mb-2.5 text-gray-700 dark:text-white text-2xl font-medium md:text-base">
        {post.title}
      </div>
      <PostDetails
        author={post.author?.fullName}
        category={post.category?.name}
        date={post.createdAt}
        readTime={post.read_time}
      />
    </div>
  </Row>
);

export default TrendPost;
