/**
 *
 * ContactForm
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { Box, Card, TextField, Typography, styled } from '@mui/material';
import { LabelStyle } from 'app/components/LabelStyle';

// import { messages } from './messages';

interface Props {}

export const ContactForm = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

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
          <LabelStyle>From</LabelStyle>
          <TextField
            fullWidth
            placeholder="Email"
            sx={{
              '& .MuiOutlinedInput-input': {
                padding: '8px 14px !important',
              },
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: theme =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
        </Box>
        <Box mt={2}>
          <LabelStyle>Message</LabelStyle>
          <TextField
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              '& fieldset': {
                borderWidth: `1px !important`,
                borderColor: theme =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
        </Box>

        <Box mt={3}>
          <LoadingButton type="submit" variant="contained">
            Send Message
          </LoadingButton>
        </Box>
      </Div>
    </Card>
  );
});

const Div = styled('div')({});
