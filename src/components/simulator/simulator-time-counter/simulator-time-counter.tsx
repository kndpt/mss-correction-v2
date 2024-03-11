import Stack from '@mui/system/Stack';
import Typography from '@mui/material/Typography';
import { Box, Chip, Theme, SxProps, Tooltip } from '@mui/material';

import { fPercent } from 'src/utils/format-number';
import { durationOptions } from 'src/utils/local-data';

import Iconify from 'src/components/iconify';

import { IOptionDuration, TDurationOption } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  value: IOptionDuration;
  handleOptionDurationChange: (option: keyof IOptionDuration) => void;
  sx?: SxProps<Theme>;
  getDisability: (id: keyof IOptionDuration) => boolean;
};
export default function SimulatorTimeCounter({
  value,
  handleOptionDurationChange,
  sx,
  getDisability,
}: Props) {
  const handleDelete = () => {};

  const isSelected = (option: TDurationOption) => value[option.id];

  const handleClick = (option: TDurationOption) => handleOptionDurationChange(option.id);

  const buildPercentReduction = (option: TDurationOption, index: number) => {
    const percent = 60;
    if (index === durationOptions.length - 1) {
      return (
        <Stack
          spacing={0.5}
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="eva:trending-down-fill" />

          <Box sx={{ opacity: 0.8 }}>jusqu&apos; à </Box>
          <Box sx={{ typography: 'subtitle2' }}>{fPercent(percent)}</Box>

          <Box sx={{ opacity: 0.8 }}>moins cher</Box>
        </Stack>
      );
    }
  };

  return (
    <Box sx={sx}>
      <Tooltip
        title="Choisissez la durée de correction de votre texte. Plus la durée est longue, plus
                                        le prix est bas."
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Combien de temps avez-vous pour faire corriger votre document ?
        </Typography>
      </Tooltip>
      <Box
        display="grid"
        sx={{
          pt: 2,
          gridTemplateColumns: { md: 'repeat(3, 1fr)', xs: '1fr' },
        }}
        gap={2}
      >
        {durationOptions.map((option, i) => {
          // if it's last option
          if (isSelected(option)) {
            return (
              <Tooltip title={buildPercentReduction(option, i)} key={option.id} arrow>
                <Chip
                  variant="filled"
                  key={option.id}
                  clickable
                  disabled={getDisability(option.id)}
                  label={option.name}
                  icon={<Iconify width={16} icon="solar:hourglass-line-outline" />}
                  onClick={() => handleClick(option)}
                  onDelete={handleDelete}
                  deleteIcon={<Iconify width={18} icon="eva:checkmark-fill" />}
                />
              </Tooltip>
            );
          }
          return (
            <Tooltip title={buildPercentReduction(option, i)} key={option.id} arrow>
              <Chip
                variant="outlined"
                key={option.id}
                clickable
                disabled={getDisability(option.id)}
                label={option.name}
                onClick={() => handleClick(option)}
                icon={<Iconify width={16} icon="solar:hourglass-line-outline" />}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
