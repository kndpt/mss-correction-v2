import { FC } from 'react';
import Lottie from 'lottie-react';

import magnifyingGlassAnimation from './magnifying-glass.json';

const MagnifyingGlassIconAnimated: FC = () => (
  <div
    style={{
      width: 200,
      height: 200,
    }}
  >
    <Lottie style={{ width: 200, height: 200 }} animationData={magnifyingGlassAnimation} loop />
  </div>
);

export default MagnifyingGlassIconAnimated;
