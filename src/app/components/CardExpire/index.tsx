// @mui
import { Box, Stack, Typography } from '@mui/material';

import Image from '../Image';

interface Props {
  app: any;
}

export default function CardExpire({ app }: Props) {
  const { shortcut, system, name } = app;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
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
        <Typography variant="h6">{name}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ mt: 0.5, color: 'text.secondary' }}
        >
          <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
            {system}
          </Typography>
          <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
            Full-time
          </Typography>
          <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
            2021 · Less than a year
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
