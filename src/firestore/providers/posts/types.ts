import { IPostItem } from 'src/types/blog';

export type PostsContextType = {
  posts: IPostItem[];
  loading: boolean;
  error: any;
  createPost: (post: IPostItem) => Promise<void>;
  updatePost: (newPost: IPostItem) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  getPost: (title: string) => IPostItem | undefined;
};
