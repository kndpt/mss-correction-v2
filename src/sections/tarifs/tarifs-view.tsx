'use client';

import Simulator from 'src/components/simulator/simulator';
import { ServiceProvider } from 'src/providers/service/service-provider';

// ----------------------------------------------------------------------

export default function TarifsView() {
  return (
    <ServiceProvider>
      <Simulator isCommand={false} />
    </ServiceProvider>
  );
}
