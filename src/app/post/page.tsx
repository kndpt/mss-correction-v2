import Box from '@mui/material/Box';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Blog - Mss Correction',
  description: `Découvrez mes astuces pour améliorer votre écriture, rédiger un CV, une lettre de motivation, ou encore un roman.`,
};

const getData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
};

export default async function PostListHomePage() {
  const posts = await getData();
  return (
    <Box sx={{ pt: { xs: 12, md: 16 } }}>
      {/* <PostListHomeView /> */}
      <h1>Post List</h1>
      <ul>
        {posts.map((post: any) => (
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        ))}
      </ul>
    </Box>
  );
}
