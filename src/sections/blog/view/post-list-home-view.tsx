'use client';

import { Stack } from '@mui/material';
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
      <Stack
        spacing={2}
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 8,
          mx: {
            xs: 1,
            sm: 3,
            md: 5,
            lg: 10,
            xl: 20,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            my: { xs: 3, md: 5 },
            fontSize: '36px!important',
          }}
        >
          Blog
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: 'text.secondary', fontWeight: 'normal', fontSize: '14px!important' }}
        >
          Découvrez mes conseils pour améliorer votre écriture, rédiger un CV, une lettre de
          motivation, ou encore un roman.
        </Typography>
      </Stack>
      <PostList posts={posts} loading={postLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------
