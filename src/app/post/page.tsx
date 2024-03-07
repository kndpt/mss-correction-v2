import Box from '@mui/material/Box';

import { PostListHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Blog - Mss Correction',
  description: `Découvrez mes astuces pour améliorer votre écriture, rédiger un CV, une lettre de motivation, ou encore un roman.`,
};
export default function PostListHomePage() {
  return (
    <Box sx={{ pt: { xs: 12, md: 16 } }}>
      <PostListHomeView />
    </Box>
  );
}
