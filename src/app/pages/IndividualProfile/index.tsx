/**
 *
 * IndividualProfile
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import { _appRelated } from 'app/_mock';
import CardExpire from 'app/components/CardExpire';
import CardList from 'app/components/CardList';
import Page from 'app/components/Page';
import UserCard from 'app/components/UserCard';
import useSettings from 'app/hooks/useSettings';
import styled from 'styled-components/macro';

import { ContactForm } from '../ContactForm';
import { messages } from './messages';

interface Props {}

const IndividualProfile = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

  return (
    <Page title="Individual Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {t('')}
        {/*  {t(...messages.someThing())}  */}
        <Div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <UserCard />
              <Box mt={3}>
                <CardList title="Experience">
                  {_appRelated.map(app => (
                    <>
                      <CardExpire key={app.id} app={app} />
                      <Divider sx={{ borderStyle: 'solid' }} />
                    </>
                  ))}
                </CardList>
              </Box>

              <Box mt={3}>
                <CardList title="Education">
                  {_appRelated.map(app => (
                    <>
                      <CardExpire key={app.id} app={app} />
                      <Divider sx={{ borderStyle: 'solid' }} />
                    </>
                  ))}
                </CardList>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <ContactForm />
            </Grid>
          </Grid>
        </Div>
      </Container>
    </Page>
  );
});

export default IndividualProfile;

const Div = styled.div``;
