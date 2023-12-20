import { memo } from 'react';

import AppBar from '@mui/material/AppBar';

import { HEADER } from '../config-layout';
import HeaderShadow from '../common/header-shadow';

// ----------------------------------------------------------------------

function NavHorizontal() {
  return (
    <AppBar
      component="div"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <HeaderShadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);
