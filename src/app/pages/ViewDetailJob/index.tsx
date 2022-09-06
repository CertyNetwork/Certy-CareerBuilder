/**
 *
 * ContactForm
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Card, Typography, styled, useTheme } from '@mui/material';
import { SHOW_COUNTRY } from 'app/constant/country';
import moment from 'moment';

// import { messages } from './messages';

interface Props {
  infoJob: any;
}

export const ViewDetailJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { infoJob } = props;

  return (
    <Card sx={{ p: 3 }}>
      <Div>
        {t('')}
        {/*  {t(...messages.someThing())}  */}
        {/* <Box display="flex" columnGap={2}>
          <Box
            sx={{
              width: '12px',
              height: '24px',
              background: '#2A85FF',
              borderRadius: '4px',
            }}
          ></Box>
          <Typography component="p">Contact Form</Typography>
        </Box> */}

        <Box>
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
              ? `${infoJob?.salary_from} - ${infoJob?.salary_to}`
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
