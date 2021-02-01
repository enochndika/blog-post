import { ReactNode } from "react";

export default interface Props {
  children: ReactNode;
}

export interface PostProps {
  post: {
    title?: string;
    slug?: string;
    read_time?: number;
    createdAt: Date;
    user?: {
      fullName?: string;
      usernameN: string;
    };
    posts_category?: {
      name?: string;
    };
  };
  number?: string
}
