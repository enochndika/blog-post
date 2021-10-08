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
        post.map((item) => (
          <div className={mainColClass} key={item.id}>
            <Row>
              <div className={firstColClass} key={item.id}>
                <Link href={`/posts/${item.slug || item.post?.slug}`}>
                  <a>
                    <Image
                      height={800}
                      width={1500}
                      src={
                        item?.post?.image[0]?.toString() ??
                        item?.image[0]?.toString()
                      }
                      className="block w-full cursor-pointer"
                      alt={item.title || item.post.title}
                    />
                  </a>
                </Link>
              </div>
              <div className={secondColClass}>
                <div className="mb-2.5 text-gray-700 dark:text-white text-2xl font-medium">
                  {item.title || item.post.title}
                </div>
                <p className="mb-4 2xl:w-7/12 text-gray-600 dark:text-grayer text-small">
                  {item.description?.slice(0, 130) ||
                    item.post?.description?.slice(0, 130)}
                </p>
                <PostDetails
                  author={item.author?.fullName || item.post?.author?.fullName}
                  category={item.category?.name || item.post?.category?.name}
                  date={item.createdAt || item.post?.createdAt}
                  readTime={item.read_time || item.post?.read_time}
                />
              </div>
            </Row>
          </div>
        ))}
      {children}
    </Row>
  );
}
