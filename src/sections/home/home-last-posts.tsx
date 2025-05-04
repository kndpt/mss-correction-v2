import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';

import { IPostItem } from 'src/types/blog';

import PostList from '../blog/post-list';

// ----------------------------------------------------------------------

interface Props {
  posts: IPostItem[];
}

export default function HomeLastPosts(props: Props) {
  const { posts } = props;

  return (
    <Container sx={{ pb: 5 }}>
      <Typography variant="h4" sx={{ my: 5 }}>
        Mes derniers articles
      </Typography>

      <PostList posts={posts.slice(0, 4)} loading={false} disabledIndex />
    </Container>
  );
}
