/**
 *
 * IndividualProfile
 *
 */
import { memo, useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { Box, Container, Divider, Grid, styled } from '@mui/material';
import { _appRelated } from 'app/_mock';
import CardEducation from 'app/components/CardEducation';
import CardExpire from 'app/components/CardExpire';
import CardList from 'app/components/CardList';
import Page from 'app/components/Page';
import UserCard from 'app/components/UserCard';
import { NearContext } from 'app/contexts/NearContext';
import {
  useProfile,
  useProfileAvatar,
  useProfileBackground,
} from 'app/hooks/Profile/useProfile';
import useSettings from 'app/hooks/useSettings';
import { storage } from 'utils/util';

import { ContactForm } from '../ContactForm';

// import { messages } from './messages';

interface Props {}

const IndividualProfile = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

  const { wallet, account } = useContext(NearContext);
  const token = localStorage.getItem('Near_token_bearer');

  const { dataProfileAvatar, loadingDataProfileAvatar } = useProfileAvatar();
  const { dataProfileBackground, loadingDataProfileBackground } =
    useProfileBackground();
  const { dataProfile, loadingDataProfile } = useProfile();

  if (!token && !account) {
    return wallet?.requestSignIn(
      'cecareer.certynetwork.testnet', // contract requesting access
      'Certify',
    );
  }

  if (loadingDataProfileAvatar || loadingDataProfile) {
    return <h3>Loading ...</h3>;
  }

  return (
    <Page title="Individual Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {t('')}
        {/*  {t(...messages.someThing())}  */}
        <Div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <UserCard
                user={dataProfile}
                avatar={dataProfileAvatar?.src}
                bgImg={dataProfileBackground?.src}
              />
              <Box mt={3}>
                <CardList title="Experience">
                  {_appRelated.map(app => (
                    <Box key={app.id}>
                      <CardExpire app={app} />
                      <Divider sx={{ borderStyle: 'solid', mt: 3 }} />
                    </Box>
                  ))}
                </CardList>
              </Box>

              <Box mt={3}>
                <CardList title="Education">
                  {_appRelated.map(app => (
                    <Box key={app.id}>
                      <CardEducation app={app} />
                      <Divider sx={{ borderStyle: 'solid', mt: 3 }} />
                    </Box>
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

const Div = styled('div')({});
