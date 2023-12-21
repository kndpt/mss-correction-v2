'use client';

import { ServiceProvider } from 'src/providers/service/service-provider';

import Simulator from 'src/components/simulator/simulator';

// ----------------------------------------------------------------------

export default function TarifsView() {
  return (
    <ServiceProvider>
      <Simulator isCommand={false} />
    </ServiceProvider>
  );
}
