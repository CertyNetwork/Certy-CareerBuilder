// @mui
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Image from '../Image';

interface Props {
  app: any;
}

export default function CardCertification({ app }: Props) {
  const { shortcut, name } = app;
  const theme: any = useTheme();

  return (
    <Box
      py={2}
      px={3}
      sx={{
        backgroundColor: theme.palette.background.certificate,
        borderRadius: '12px',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 64,
            height: 64,
            flexShrink: 0,
            display: 'flex',
            borderRadius: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.neutral',
          }}
        >
          <Image src={shortcut} alt={name} sx={{ width: 24, height: 24 }} />
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 160 }}>
          <Typography variant="subtitle1">{name}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: 0.5, color: 'text.secondary' }}
          >
            <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
              Full-time
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: 0.5, color: 'text.secondary' }}
          >
            <Typography
              sx={{ ml: 0.5, mr: 1, fontSize: '12px', fontWeight: 400 }}
            >
              Full-time
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
