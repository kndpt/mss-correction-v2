import { m } from 'framer-motion';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

export const _homePlans = [...Array(2)].map((_, index) => ({
  license: ['Correction standard', 'Correction & Embellissement'][index],
  commons: ['Correction orthographique', 'Correction grammaticale', 'Correction de syntaxe'],
  options: [
    '2 retouches',
    '4 retouches',
    'Révision de la ponctuation',
    'Suppression des répétitions',
    "Mots plus jolis à l'écrit",
    'Reformulation des phrases pas claires',
  ], // ponctuation, 4, => embellissement
  icons: [
    '/assets/icons/platforms/ic_js.svg',
    '/assets/icons/platforms/ic_ts.svg',
    '/assets/icons/platforms/ic_figma.svg',
  ],
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  const mdUp = useResponsive('up', 'md');

  const [currentTab, setCurrentTab] = useState('Correction standard');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderDescription = (
    <Stack spacing={3} sx={{ mb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          Options
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">
          Le meilleur service <br /> pour vos besoins
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Choisissez l&apos;option qui correspond le mieux à vos besoins
        </Typography>
      </m.div>
    </Stack>
  );

  const renderContent = (
    <>
      {mdUp ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          sx={{
            borderRadius: 2,
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {_homePlans.map((plan) => (
            <m.div key={plan.license} variants={varFade().in}>
              <PlanCard key={plan.license} plan={plan} />
            </m.div>
          ))}
        </Box>
      ) : (
        <>
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {_homePlans.map((tab) => (
                <Tab key={tab.license} value={tab.license} label={tab.license} />
              ))}
            </Tabs>
          </Stack>

          <Box
            sx={{
              borderRadius: 2,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {_homePlans.map(
              (tab) =>
                tab.license === currentTab && (
                  <PlanCard
                    key={tab.license}
                    plan={tab}
                    sx={{
                      borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                  />
                )
            )}
          </Box>
        </>
      )}

      <m.div variants={varFade().in}>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 5,
              md: 10,
            },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h4">Vous avez des questions ?</Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
              Veuillez décrire votre cas afin de recevoir les conseils les plus précis.
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Button
              color="inherit"
              size="large"
              variant="contained"
              href="mailto:mss.correction@gmail.com?subject=[Feedback] from Customer"
            >
              Contactez-moi
            </Button>
          </m.div>
        </Box>
      </m.div>
    </>
  );

  return (
    <Box
      sx={{
        py: { xs: 10, md: 10 },
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      <Container component={MotionViewport}>
        {renderDescription}

        {renderContent}
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface PlanCardProps extends StackProps {
  plan: {
    license: string;
    commons: string[];
    options: string[];
    icons: string[];
  };
}

function PlanCard({ plan, sx, ...other }: PlanCardProps) {
  const { license, commons, options } = plan;

  const standardLicense = license === 'Correction standard';

  const plusLicense = license === 'Correction & Embellissement';

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        ...(plusLicense && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
          {plusLicense ? 'Premium' : 'Standard'}
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Typography variant="h4">{license}</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              bgcolor: 'error.main',
              position: 'absolute',
              ...(standardLicense && { bgcolor: 'primary.main' }),
              ...(plusLicense && { bgcolor: 'warning.main' }),
            }}
          />
        </Box>
      </Stack>

      {/* {standardLicense ? (
        <Box component="img" alt={icons[1]} src={icons[1]} sx={{ width: 20, height: 20 }} />
      ) : (
        <Stack direction="row" spacing={2}>
          {icons.map((icon) => (
            <Box component="img" key={icon} alt={icon} src={icon} sx={{ width: 20, height: 20 }} />
          ))}
        </Stack>
      )} */}

      <Stack spacing={2.5}>
        {commons.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2">{option}</Typography>
          </Stack>
        ))}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {options.map((option, optionIndex) => {
          const disabled =
            (standardLicense && optionIndex === 1) ||
            (standardLicense && optionIndex === 2) ||
            (standardLicense && optionIndex === 3) ||
            (standardLicense && optionIndex === 4) ||
            (standardLicense && optionIndex === 5);

          const removed =
            (standardLicense && optionIndex === 1) || (plusLicense && optionIndex === 0);

          if (removed) return null;

          return (
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(disabled && { color: 'text.disabled' }),
              }}
              key={option}
            >
              <Iconify icon={disabled ? 'mingcute:close-line' : 'eva:checkmark-fill'} width={16} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          );
        })}
      </Stack>

      <Stack alignItems="flex-end">
        <Button
          color="inherit"
          size="small"
          target="_blank"
          rel="noopener"
          href={paths.tarifs}
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          Voir plus
        </Button>
      </Stack>
    </Stack>
  );
}
