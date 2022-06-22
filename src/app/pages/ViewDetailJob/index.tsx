/**
 *
 * ContactForm
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Card, Typography, styled, useTheme } from '@mui/material';

// import { messages } from './messages';

interface Props {}

export const ViewDetailJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <Card sx={{ p: 3 }}>
      <Div>
        {t('')}
        {/*  {t(...messages.someThing())}  */}
        <Box display="flex" columnGap={2}>
          <Box
            sx={{
              width: '12px',
              height: '24px',
              background: '#2A85FF',
              borderRadius: '4px',
            }}
          ></Box>
          <Typography component="p">Contact Form</Typography>
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
            Lotte Center, 54 Lieu Giai, Ba Dinh
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
          <Typography variant="subtitle2" component="div">
            Senior
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Qualification
          </Typography>
          <Typography variant="subtitle2" component="div">
            Bacelor Degree
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
          <Typography variant="subtitle2" component="div">
            3 Years+
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
            Negotiation
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Department
          </Typography>
          <Typography variant="subtitle2" component="div">
            Marketing
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: theme.palette.text.disabled }}
          >
            Appliaction Deadline
          </Typography>
          <Typography variant="subtitle2" component="div">
            16 July 2022
          </Typography>
        </Box>
      </Div>
    </Card>
  );
});

const Div = styled('div')({});
