import Box from '@mui/material/Box';

import { PostListHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Blog - Mss Correction',
  // TODO: Add description
  description: '',
};

export default function PostListHomePage() {
  return (
    <Box sx={{ pt: { xs: 12, md: 16 } }}>
      <PostListHomeView />
    </Box>
  );
}
