import Typography from '@mui/material/Typography';
import { Box, Chip, Theme, SxProps, Tooltip } from '@mui/material';

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
        {durationOptions.map((option) => {
          if (isSelected(option)) {
            return (
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
            );
          }
          return (
            <Chip
              variant="outlined"
              key={option.id}
              clickable
              disabled={getDisability(option.id)}
              label={option.name}
              onClick={() => handleClick(option)}
              icon={<Iconify width={16} icon="solar:hourglass-line-outline" />}
            />
          );
        })}
      </Box>
    </Box>
  );
}
