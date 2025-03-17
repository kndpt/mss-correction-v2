import React from 'react';

import { Box, Tab, Tabs, Badge, Divider, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type DocumentTabsProps = {
  tabValue: number;
  realCount: number | undefined;
  hallucinationCount: number | undefined;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  children: React.ReactNode;
};

export default function DocumentTabs({
  tabValue,
  realCount,
  hallucinationCount,
  handleTabChange,
  children,
}: DocumentTabsProps) {
  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ px: 2, pt: 2 }}
      >
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
              <Typography variant="button">Corrections</Typography>
              {realCount && realCount > 0 && (
                <Badge badgeContent={realCount} color="error" sx={{ ml: 1 }} />
              )}
            </Box>
          }
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="button">Faux positifs</Typography>
              {hallucinationCount && hallucinationCount > 0 && (
                <Badge badgeContent={hallucinationCount} color="default" sx={{ ml: 1 }} />
              )}
            </Box>
          }
        />
      </Tabs>

      <Divider />

      <Box sx={{ p: 2 }}>{children}</Box>
    </>
  );
}
