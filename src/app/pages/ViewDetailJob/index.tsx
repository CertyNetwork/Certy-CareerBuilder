/**
 *
 * ContactForm
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Card, Stack, Typography, styled, useTheme } from '@mui/material';
import Image from 'app/components/Image';
import { SHOW_COUNTRY } from 'app/constant/country';
import moment from 'moment';

// import { messages } from './messages';

interface Props {
  infoJob: any;
  infoCompany: any;
  avatar: any;
  background: any;
}

export const ViewDetailJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { infoJob, infoCompany, avatar, background } = props;

  return (
    <Card sx={{ p: 3 }}>
      <Div>
        {t('')}
        {/*  {t(...messages.someThing())}  */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Image
              disabledEffect
              src={avatar?.src}
              alt=""
              sx={{ borderRadius: 1.5, width: 48, height: 48 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ textTransform: 'capitalize' }}
            >
              {infoCompany?.info.companyName}
            </Typography>
          </Stack>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Work Location
          </Typography>
          <Typography variant="subtitle2" component="div">
            {SHOW_COUNTRY[infoJob?.work_location_country]}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Level
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {infoJob?.experience_level ? infoJob?.experience_level : '--'}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Experiences
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {infoJob?.experience_level ? infoJob?.experience_level : '--'}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Salary
          </Typography>
          <Typography variant="subtitle2" component="div">
            {infoJob?.salary_from || infoJob?.salary_to
              ? `${infoJob?.salary_from}$ - ${infoJob?.salary_to}$`
              : '--'}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Application Deadline
          </Typography>
          <Typography variant="subtitle2" component="div">
            {infoJob?.application_deadline
              ? moment(+infoJob?.application_deadline).format('DD/MM/YYYY')
              : '--'}
          </Typography>
        </Box>
      </Div>
    </Card>
  );
});

const Div = styled('div')({});
