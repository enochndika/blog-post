import { ReactNode } from 'react';
import BlogIcon from '@/components/icons/others/blog';
import FlagIcon from '@/components/icons/others/flag';
import UsersIcon from '@/components/icons/human/users';
import HeartIcon from '@/components/icons/human/heart';
import ListAltIcon from '@/components/icons/others/listAlt';
import CommentsIcon from '@/components/icons/others/comments';
import CommentDotsIcon from '@/components/icons/others/commentDots';

interface Items {
  title: string;
  icon: ReactNode;
  link: string;
}

const data: Items[] = [
  {
    title: 'Users',
    icon: <UsersIcon className="w-5 h-5" />,
    link: '/admin/users',
  },
  {
    title: 'Posts',
    icon: <BlogIcon className="w-5 h-5" />,
    link: '/admin/posts',
  },
  {
    title: 'Likes',
    icon: <HeartIcon className="w-5 h-5" />,
    link: '/admin/likes',
  },
  {
    title: 'Categories',
    icon: <ListAltIcon className="w-5 h-5" />,
    link: '/admin/categories',
  },
  {
    title: 'Comments',
    icon: <CommentsIcon className="w-5 h-5" />,
    link: '/admin/comments',
  },
  {
    title: 'Child Comments',
    icon: <CommentDotsIcon className="w-5 h-5" />,
    link: '/admin/subcomments',
  },
  {
    title: 'Posts reported',
    icon: <FlagIcon className="w-5 h-5" />,
    link: '/admin/report/posts',
  },
  {
    title: 'Comments Reported',
    icon: <FlagIcon className="w-5 h-5" />,
    link: '/admin/report/comments',
  },
  {
    title: 'Child Comments Reported',
    icon: <FlagIcon className="w-5 h-5" />,
    link: '/admin/report/subcomments',
  },
];

export default data;
