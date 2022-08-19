// @mui
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { SHOW_COUNTRY } from 'app/constant/country';
import { SHOW_JOB_TYPE } from 'app/constant/jobType';
import { timeSince } from 'app/utils/formatTime';

import Image from '../Image';
import Label from '../Label';
import { CustomLink } from '../Link';

interface Props {
  app: any;
  applied?: boolean;
  avatar: any;
}

export default function CardJob({ app, applied, avatar }: Props) {
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
    job_type,
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
              backgroundColor: 'background.neutral',
            }}
          >
            <Image
              src={avatar?.src ? avatar?.src : shortcut}
              alt={name}
              sx={{ width: 48, height: 48 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 160 }}>
            <CustomLink to={`/jobs/${id}`}>
              <Typography
                component="span"
                sx={{
                  fontSize: '20px',
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>
            </CustomLink>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ mt: 0.5, color: 'text.secondary' }}
            >
              {/* <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
                {system}
              </Typography> */}
              {/* <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
                {work_location_city}
              </Typography> */}
              <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
                {SHOW_COUNTRY[work_location_country]}
              </Typography>
            </Stack>
          </Box>

          {/* <Box>
            <IconButton color="primary" aria-label="add to shopping cart">
              <FavoriteBorderIcon />
            </IconButton>
          </Box> */}
        </Stack>

        <Typography
          component="div"
          dangerouslySetInnerHTML={{
            __html: description?.substr(0, 186) + '...' || '',
          }}
        />

        <Box display="flex" justifyContent="space-between">
          <Box display="flex" columnGap={2}>
            {SHOW_JOB_TYPE[job_type] && (
              <Label>
                <Typography variant="subtitle2" sx={{ margin: '8px 16px' }}>
                  {SHOW_JOB_TYPE[job_type]}
                </Typography>
              </Label>
            )}

            {/* <Label>
              <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
                Remote Friendly
              </Typography>
            </Label> */}
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
