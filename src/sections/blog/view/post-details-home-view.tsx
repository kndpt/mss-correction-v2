'use client';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import 'src/utils/highlight';

import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { IPostItem } from 'src/types/blog';

import PostList from '../post-list';
import PostDetailsHero from '../post-details-hero';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  post: IPostItem;
  posts: IPostItem[];
};

export default function PostDetailsHomeView({ title, post, posts }: Props) {
  const renderPost = post && (
    <>
      <PostDetailsHero
        title={post.title}
        author={post.author}
        coverUrl={post.coverUrl}
        createdAt={post.createdAt}
      />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Accueil',
              href: '/',
            },
            {
              name: 'Blog',
              href: paths.post.root,
            },
            {
              name: post?.title,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1" sx={{ mb: 5 }}>
            {post.description}
          </Typography>

          <Markdown children={post.content} />

          <Stack
            spacing={3}
            sx={{
              py: 3,
              borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
              borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Stack direction="row" flexWrap="wrap" spacing={1}>
              {post.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="soft" />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  const renderLatestPosts = (
    <>
      <Typography variant="h4" sx={{ my: 5 }}>
        Mes derniers articles
      </Typography>

      <PostList posts={posts.slice(Math.max(posts.length - 4, 0))} loading={false} disabledIndex />
    </>
  );

  return (
    <>
      {/* {loading && renderSkeleton}

      {error && renderError} */}

      {post && renderPost}

      <Container sx={{ pb: 15 }}>{!!posts.length && renderLatestPosts}</Container>
    </>
  );
}
