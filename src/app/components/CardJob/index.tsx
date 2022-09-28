// @mui
import { Box, Card, Stack, Typography } from '@mui/material';
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
    name,
    title,
    work_location_country,
    updated_at,
    id,
    job_type,
    job_specialities,
    salary_to,
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
              sx={{ color: 'text.secondary' }}
            >
              <Typography variant="caption" sx={{ mr: 1 }}>
                {SHOW_COUNTRY[work_location_country]}
              </Typography>
              <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                {SHOW_JOB_TYPE[job_type]}
              </Typography>
              {salary_to ? (
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Up to {salary_to}$
                </Typography>
              ) : (
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Negotiation
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>

        <Box>
          <Box display="flex" columnGap={2} alignItems="center">
            {job_specialities &&
              job_specialities.length > 0 &&
              job_specialities.map((specialistic, index) => {
                return index < 5 ? (
                  <Label key={index.toString()}>
                    <Typography
                      variant="subtitle2"
                      sx={{ margin: '8px 16px', textTransform: 'capitalize' }}
                    >
                      {specialistic?.value}
                    </Typography>
                  </Label>
                ) : (
                  ''
                );
              })}
          </Box>

          {nowDate > updated_at && (
            <Typography
              component="div"
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                textAlign: 'right',
                marginTop: '10px',
              }}
            >
              {timeSince(updated_at)}
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  );
}
