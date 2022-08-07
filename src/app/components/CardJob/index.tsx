// @mui
import { Link } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { timeSince } from 'app/utils/formatTime';

import Image from '../Image';
import Label from '../Label';

interface Props {
  app: any;
  applied?: boolean;
}

export default function CardJob({ app, applied }: Props) {
  const {
    shortcut,
    system,
    name,
    title,
    work_location_city,
    work_location_country,
    description,
    updated_at,
    id,
  } = app;

  const nowDate = new Date().getTime();

  return (
    <Card>
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
            <Link to={`/jobs/${id}`}>
              <Typography
                component="div"
                sx={{
                  fontSize: '20px',
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>
            </Link>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ mt: 0.5, color: 'text.secondary' }}
            >
              <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
                {system}
              </Typography>
              <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
                {work_location_city}
              </Typography>
              <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
                {work_location_country}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <IconButton color="primary" aria-label="add to shopping cart">
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
        </Stack>

        <Typography
          component="div"
          dangerouslySetInnerHTML={{
            __html: description?.substr(0, 186) + '...' || '',
          }}
        />

        <Box display="flex" justifyContent="space-between">
          <Box display="flex" columnGap={2}>
            <Label>
              <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
                Full-time
              </Typography>
            </Label>
            <Label>
              <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
                Remote Friendly
              </Typography>
            </Label>
            {applied && (
              <Typography
                component="div"
                variant="caption"
                sx={{ color: '#2DA771' }}
              >
                Application viewed
              </Typography>
            )}
          </Box>

          {nowDate > updated_at && (
            <Typography
              component="div"
              sx={{
                fontSize: '12px',
                fontWeight: 400,
              }}
            >
              Posted about {timeSince(updated_at)}
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  );
}
