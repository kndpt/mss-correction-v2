import React from 'react';
import Image from 'next/image';

import Link  from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { MotionViewport } from '../../components/animate';

// ----------------------------------------------------------------------

export default function HomeAnnuaires() {
  return (
    <Container component={MotionViewport} sx={{ pb: 8 }}>
      <Stack justifyContent="center">
        <Link href="https://www.gralon.net/annuaire/commerce-et-societe/services/secretariat.htm" target="_blank">
          <Image src="https://logo.gralon.net/plogo2-gralon-204956.gif" alt="Services" width={75} height={30} />
        </Link>
      </Stack>
    </Container>
  );
}
