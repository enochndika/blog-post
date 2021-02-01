import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ArtStationIcon,
  BlogIcon,
  CommentDotsIcon,
  CommentsIcon,
  FlagIcon,
  HeartIcon,
  ListAltIcon,
  UsersIcon,
} from "../../ui/icons";
import Props from "../../../utils/defaultProps";

interface ItemProps extends Props {
  href?: string;
}
const Item = ({ children, href }: ItemProps) => {
  const { asPath } = useRouter();
  const active = asPath === href ? "text-blue-500" : "";

  return (
    <div className="flex ml-8 mb-4">
      <Link href={href}>
        <a className={`${active} pl-6 pb-3 flex text-sm cursor-pointer`}>
          {children}
        </a>
      </Link>
    </div>
  );
};

export const SideNavigation = ({ className }: { className?: string }) => (
  <div
    className={`bg-darker text-white h-screen overflow-x-scroll ${className}`}
  >
    <div className="text-center pt-12">
      <Image
        src="/avatar.png"
        className="rounded-full"
        alt="user avatar"
        width={50}
        height={50}
      />
      <div className="block">@Beloved</div>
      <span className="text-xs">Product Owner</span>
    </div>
    <div className="mt-12 pb-6">
      <Item href="/admin/users">
        <UsersIcon className="h-5 pr-2" /> Utilisateurs
      </Item>
      <Item href="/admin/posts">
        <BlogIcon className="h-5 pr-3" /> Posts
      </Item>
      <Item href="/admin/likes">
        <HeartIcon className="h-5 pr-3" /> Likes
      </Item>
      <Item href="/admin/comments">
        <CommentsIcon className="h-5 pr-3" /> Comments
      </Item>
      <Item href="/admin/categories">
        <ListAltIcon className="h-5 pr-3" /> Post Categories
      </Item>
      <Item href="/admin/subcomments">
        <CommentDotsIcon className="h-5 pr-3" /> Commentaires enfants
      </Item>
      <Item href="/admin/report/posts">
        <FlagIcon className="h-5 pr-3" /> Report Posts
      </Item>
      <Item href="/admin/report/comments">
        <FlagIcon className="h-5 pr-3" /> Report Comments
      </Item>
      <Item href="/admin/report/subcomments">
        <FlagIcon className="h-5 pr-3" /> Report Subcomments
      </Item>
      <Item href="/admin/static-pages">
        <ArtStationIcon className="h-5 pr-3" /> Pagination
      </Item>
    </div>
  </div>
);
