// @mui
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Image from '../Image';
import Label from '../Label';

interface Props {
  app: any;
}

export default function CardJob({ app }: Props) {
  const theme = useTheme();

  const { shortcut, system, price, rating, review, name } = app;

  return (
    <Card sx={{ mt: 3 }}>
      <Stack spacing={3} sx={{ p: 3 }}>
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
            <Typography variant="subtitle2">{name}</Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ mt: 0.5, color: 'text.secondary' }}
            >
              <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                {system}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <IconButton color="primary" aria-label="add to shopping cart">
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Stack>

        <Typography component="div" variant="body1">
          Archipelago is focused on changing how commercial real estate is
          risked and insured by using AI to improve people’s data. Since our
          public launch last August,
        </Typography>

        <Box display="flex" columnGap={2}>
          <Label>Full-time</Label>
          <Label>Remote Friendly</Label>
          <Typography component="div" variant="body1" sx={{ color: '#2DA771' }}>
            Application viewed
          </Typography>
          <Typography component="div" variant="body1">
            Posted about 16 hours ago
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
