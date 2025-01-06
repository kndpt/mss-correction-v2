import { FC } from 'react';
import Lottie from 'lottie-react';

import penAnimation from './pen.json'; // Remplacez par votre fichier JSON

const PenIconAnimated: FC = () => (
  <div
    style={{
      width: 200,
      height: 200,
    }}
  >
    <Lottie style={{ width: 200, height: 200 }} animationData={penAnimation} loop />
  </div>
);

export default PenIconAnimated;
