/**
 *
 * ContactForm
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Typography } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { BootstrapInput } from 'app/components/BootstrapInput';
import { LabelStyle } from 'app/components/LabelStyle';
import styled from 'styled-components/macro';

import { messages } from './messages';

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
          <BootstrapInput placeholder="tus.ng09@gmail.com" />
        </Box>
        <Box mt={2}>
          <LabelStyle>Message</LabelStyle>
          <TextareaAutosize minRows={3} style={{ width: '100%' }} />
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

const Div = styled.div``;
