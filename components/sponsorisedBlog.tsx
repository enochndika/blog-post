import style from "./sponsorisedBlog.module.css";
import { Image } from "./image";
import Row from "./ui/row";
import { PostDetails } from "./postDetails";
import Link from "next/link";

export const SponsoredBlog = ({ posts }: { posts: any }) => (
  <Row>
    <div className={`${style.col} col-12 md:col-6 dark:bg-darker`}>
      <Link href={`/posts/${posts.slug}`}>
        <a>
          <Image
            src={posts.image}
            className="w-full cursor-pointer h-full"
            alt={posts.title}
          />
        </a>
      </Link>
    </div>
    <div className={`${style.col} col-12 md:col-6 dark:bg-darker`}>
      <div className="mt-4 md:mt-0">
        <h3 className="text-2xl md:text-3xl mb-8">
          <strong>{posts.title}</strong>
        </h3>
        <p className="dark:text-grayer mb-6">{posts?.description}</p>
      </div>
      <PostDetails
        author={posts.user?.fullName}
        date={posts.createdAt}
        readTime={posts.read_time}
        category={posts.posts_category?.name}
      />
    </div>
  </Row>
);
