import { getPosts } from 'src/firestore/posts/posts';

import { PostListHomeView } from 'src/sections/blog/view';

export default async function PostListHomePage() {
  const posts = await getPosts();
  return <PostListHomeView posts={posts} />;
}
