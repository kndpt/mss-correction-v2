import Typography from '@mui/material/Typography';
import { Box, Chip, Theme, SxProps, Tooltip } from '@mui/material';

import { typeOptions } from 'src/utils/local-data';

import Iconify from 'src/components/iconify';

import { IOptionType, TDurationType } from 'src/types/order';

// ----------------------------------------------------------------------

type Props = {
  value: IOptionType;
  handleOptionTypeChange: (option: keyof IOptionType) => void;
  sx?: SxProps<Theme>;
  getBeautificationDays: () => number;
};
export default function SimulatorTypeCorrection({
  value,
  handleOptionTypeChange,
  sx,
  getBeautificationDays,
}: Props) {
  const handleDelete = () => {};

  const isSelected = (option: TDurationType) => value[option.id];

  const handleClick = (option: TDurationType) => handleOptionTypeChange(option.id);

  const getTooltipContent = (): React.JSX.Element => (
    <div className="w-80">
      <Typography color="white" className="font-medium">
        En quoi consiste cette option ?
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Révision de la ponctuation
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Suppression des répétitions
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Changement de certains mots en mots plus jolis à l&apos;écrit
      </Typography>
      <Typography variant="body2" color="white" className="font-normal opacity-80">
        • Reformulation des phrases pas claires
      </Typography>
    </div>
  );

  return (
    <Box sx={{ ...sx, width: { xs: '100%' } }}>
      <Tooltip
        title="Choisissez le type de correction que vous souhaitez. Plus le type de correction
        est complexe, plus le prix est élevé."
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Quel type de correction ?
        </Typography>
      </Tooltip>
      <Box
        display="grid"
        sx={{
          pt: 2,
          gridTemplateColumns: { md: 'repeat(2, 1fr)', xs: '1fr' },
        }}
        gap={2}
      >
        {typeOptions.map((option, i) => (
          <Tooltip title={i === 1 ? getTooltipContent() : ''} key={i}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} gap={0.5}>
              {isSelected(option) ? (
                <Chip
                  variant="filled"
                  key={option.id}
                  clickable
                  label={option.name}
                  icon={<Iconify width={16} icon={option.icon} />}
                  onClick={() => handleClick(option)}
                  onDelete={handleDelete}
                  deleteIcon={<Iconify width={18} icon="eva:checkmark-fill" />}
                  sx={{ width: '100%' }}
                />
              ) : (
                <Chip
                  variant="outlined"
                  key={option.id}
                  clickable
                  label={option.name}
                  onClick={() => handleClick(option)}
                  icon={<Iconify width={16} icon={option.icon} />}
                  sx={{ width: '100%' }}
                />
              )}
              {i === 1 ? (
                <Typography variant="caption">+ {getBeautificationDays()} jours</Typography>
              ) : (
                <Typography variant="caption">Par defaut </Typography>
              )}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}
