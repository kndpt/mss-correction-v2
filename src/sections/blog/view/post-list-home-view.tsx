'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useFirestorePosts } from 'src/firestore/hooks/useFirestorePosts';

import { useSettingsContext } from 'src/components/settings';

import PostList from '../post-list';

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const settings = useSettingsContext();

  const { posts, loading: postLoading } = useFirestorePosts();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Blog
      </Typography>
      <PostList posts={posts} loading={postLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------
