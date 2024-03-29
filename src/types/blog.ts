// ----------------------------------------------------------------------

import { Timestamp } from 'firebase/firestore';

export type IPostFilterValue = string;

export type IPostFilters = {
  publish: string;
};

// ----------------------------------------------------------------------

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: Timestamp;
  author?: {
    name: string;
    avatarUrl: string;
  };
};

export type IPostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date;
  users: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  replyComment: {
    id: string;
    userId: string;
    message: string;
    postedAt: Date;
    tagUser?: string;
  }[];
};

export type IPostItem = {
  id?: string;
  title: string;
  slug: string;
  tags: string[];
  publish: string;
  content: string;
  coverUrl: string;
  metaTitle: string;
  // totalViews: number;
  // totalShares: number;
  description: string;
  // totalComments: number;
  // totalFavorites: number;
  metaKeywords: string[];
  metaDescription: string;
  // comments: IPostComment[];
  /** Timestamp or string */
  createdAt: any;
  // favoritePerson: {
  //   name: string;
  //   avatarUrl: string;
  // }[];
  author: {
    name: string;
    avatarUrl: string;
  };
};
