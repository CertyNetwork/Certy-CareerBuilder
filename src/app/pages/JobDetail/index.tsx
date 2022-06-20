/**
 *
 * JobDetail
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ReactComponent as IconOutSvg } from 'app/assets//button/out_going.svg';
import Page from 'app/components/Page';
import useSettings from 'app/hooks/useSettings';
import styled from 'styled-components/macro';

import { messages } from './messages';

interface Props {}

const JobDetail = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

  return (
    <Page title="Job Detail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Box>
            <ArrowBackIosNewIcon />
            <Box sx={{ flexGrow: 1, minWidth: 160 }}>
              <Typography variant="h3">
                Head Of User Experience and Design
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ mt: 0.5, color: 'text.secondary' }}
              >
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Snapshot Labs
                </Typography>
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Hanoi
                </Typography>
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Negotiation
                </Typography>
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  19 applicants
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Button variant="contained">Contained</Button>
              <IconButton aria-label="delete">
                <IconOutSvg fill="currentcolor" />
              </IconButton>
              <IconButton aria-label="delete">
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Box>
        </Div>
      </Container>
    </Page>
  );
});

export default JobDetail;

const Div = styled.div``;
