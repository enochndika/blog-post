import Link from 'next/link';

import Row from '../ui/row';
import Image from './image';
import PostDetails from './postDetails';
import { ReactNode } from 'react';

export interface PostsProps {
  post: Array<any>;
  mainColClass?: string;
  firstColClass?: string;
  secondColClass?: string;
  children?: ReactNode;
}

export default function Post({
  post,
  mainColClass,
  firstColClass,
  secondColClass,
  children,
}: PostsProps) {
  return (
    <Row className="mt-2">
      {post &&
        post.map((item) => {
          console.log(item.post.image);
          return (
            <div className={mainColClass} key={item.id}>
              <Row>
                <div className={firstColClass} key={item.id}>
                  <Link href={`/posts/${item.slug || item.post?.slug}`}>
                    <a>
                      {item.image && item?.image?.length > 0 ? (
                        <Image
                          height={900}
                          width={1500}
                          src={item?.image[0]}
                          className="block w-full cursor-pointer"
                          alt={item.title || item.post?.title}
                        />
                      ) : (
                        <Image
                          height={900}
                          width={1500}
                          src={item.post?.image[0]}
                          className="block w-full cursor-pointer"
                          alt={item.title || item.post?.title}
                        />
                      )}
                    </a>
                  </Link>
                </div>
                <div className={secondColClass}>
                  <div className="mb-2.5 text-2xl text-gray-700 font-medium dark:text-white">
                    {item.title || item.post.title}
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-grayer text-small">
                    {item.description?.slice(0, 130) ||
                      item.post?.description?.slice(0, 130)}
                  </p>
                  <PostDetails
                    author={item.user?.fullName || item.post?.user?.fullName}
                    category={
                      item.posts_category?.name ||
                      item.post?.posts_category?.name
                    }
                    date={item.createdAt || item.post?.createdAt}
                    readTime={item.read_time || item.post?.read_time}
                  />
                </div>
              </Row>
            </div>
          );
        })}
      {children}
    </Row>
  );
}
