import React from 'react';
import Image from 'next/image';
import Link      from '@mui/material/Link';
import { Box }            from '@mui/system';
import Container from '@mui/material/Container';

// ----------------------------------------------------------------------

export default function HomeAnnuaires() {
  return (
    <Container sx={{ pb: 8, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: 75 }}>
        <Link href="https://www.gralon.net/annuaire/commerce-et-societe/services/secretariat.htm" target="_blank">
          <Image src="https://logo.gralon.net/plogo2-gralon-204956.gif" alt="Services" width={75} height={30} />
        </Link>
      </Box>
      <Box sx={{ width: 75, ml: 2 }}>
        <Link href="https://www.ladenise.com" target="_blank">
          <Image src="https://www.ladenise.com/wp-content/uploads/logo-327-ladenise-transparent.png" alt="Services"
                 width={75} height={50} />
        </Link>
      </Box>
    </Container>
  );
}
