import { ReactNode } from 'react';

export default interface Props {
  children: ReactNode;
}

export interface PostProps {
  post: {
    title?: string;
    slug?: string;
    read_time?: number;
    createdAt: Date;
    author?: {
      fullName?: string;
      username: string;
    };
    category?: {
      name?: string;
    };
  };
  number?: string;
}
