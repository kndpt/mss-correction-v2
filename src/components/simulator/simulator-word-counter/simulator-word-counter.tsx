import Typography from '@mui/material/Typography';
import { Box, Theme, Slider, SxProps, TextField } from '@mui/material';

import { maxWords, minWords } from 'src/utils/constants';

// ----------------------------------------------------------------------

type Props = {
  value: number;
  onChange: (value: number) => void;
  sx?: SxProps<Theme>;
};
export default function SimulatorWordCounter({ value, onChange, sx }: Props) {
  const handleChangeSlider = (event: Event, newValue: number | number[], activeThumb: number) => {
    onChange(newValue as number);
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <Typography variant="body1" sx={{ mb: { xs: 4, md: 0 } }}>
        Quel est le nombre de mots que vous souhaitez faire corriger ?
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} gap={2}>
        <Slider
          value={value}
          onChange={handleChangeSlider}
          aria-labelledby="continuous-slider"
          min={minWords}
          max={maxWords}
        />

        <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={value}
          onChange={handleChangeText}
          sx={{
            ml: {
              md: 3,
            },
          }}
        />
      </Box>
    </Box>
  );
}
