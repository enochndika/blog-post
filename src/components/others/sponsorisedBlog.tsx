import Link from 'next/link';

import style from './sponsorisedBlog.module.css';
import Image from './image';
import Row from '../ui/row';
import PostDetails from './postDetails';

const SponsoredBlog = ({ posts }: { posts: any }) => (
  <Row>
    <div className={`${style.col} col-12 md:col-6 dark:bg-darker`}>
      <Link href={`/posts/${posts?.slug}`}>
        <a>
          <Image
            width={1500}
            height={900}
            src={posts?.image[0]}
            className="cursor-pointer"
            alt={posts?.title}
          />
        </a>
      </Link>
    </div>
    <div className={`${style.col} col-12 md:col-6 dark:bg-darker`}>
      <div className="mt-4 md:mt-0">
        <h3 className="mb-8 text-2xl md:text-3xl">
          <strong>{posts?.title}</strong>
        </h3>
        <p className="mb-6 dark:text-grayer">{posts?.description}</p>
      </div>
      <PostDetails
        author={posts?.author?.fullName}
        date={posts?.createdAt}
        readTime={posts?.read_time}
        category={posts?.category?.name}
      />
    </div>
  </Row>
);

export default SponsoredBlog;
