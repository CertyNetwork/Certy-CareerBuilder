/**
 *
 * IndividualProfile
 *
 */
import { memo, useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { gql, useQuery } from '@apollo/client';
import { Box, Container, Divider, Grid, styled } from '@mui/material';
import CardEducation from 'app/components/CardEducation';
import CardExpire from 'app/components/CardExpire';
import CardList from 'app/components/CardList';
import Page from 'app/components/Page';
import UserCard from 'app/components/UserCard';
import { NearContext } from 'app/contexts/NearContext';
import {
  useProfileAvatar,
  useProfileBackground,
  useProfileUser,
} from 'app/hooks/Profile/useProfile';
import useSettings from 'app/hooks/useSettings';

import { ContactForm } from '../ContactForm';

// import { messages } from './messages';

interface Props {}

const CERTIFICATES = gql`
  query certificate($arrayId: [ID]) {
    certs(where: { id_in: $arrayId }) {
      id
      title
      owner_id
      media
      media_hash
      issued_at
      description
      extra
      reference_result
      reference_hash
      reference
    }
  }
`;

const IndividualProfileUser = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const { wallet, account } = useContext(NearContext);
  const token = localStorage.getItem('Near_token_bearer');

  const { dataProfileAvatar, loadingDataProfileAvatar } = useProfileAvatar();
  const { dataProfileBackground, loadingDataProfileBackground } =
    useProfileBackground();
  // const { dataProfile, loadingDataProfile } = useProfile();
  const { dataProfileUser, loadingDataUser } = useProfileUser(id || '');

  const { data } = useQuery(CERTIFICATES, {
    variables: {
      arrayId: dataProfileUser?.certificates?.map(c => c.id),
    },
  });

  if (!token && !account) {
    return wallet?.requestSignIn(
      'cecareer.certynetwork.testnet', // contract requesting access
      'Certify',
    );
  }

  if (
    loadingDataProfileAvatar ||
    loadingDataUser ||
    loadingDataProfileBackground
  ) {
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
                user={dataProfileUser}
                avatar={dataProfileAvatar?.src}
                bgImg={dataProfileBackground?.src}
              />

              {dataProfileUser &&
                dataProfileUser?.experiences &&
                dataProfileUser?.experiences?.length > 0 && (
                  <Box mt={3}>
                    <CardList title="Experience">
                      {dataProfileUser?.experiences.map(exp => (
                        <Box key={exp.id}>
                          <CardExpire experience={exp} />
                          <Divider sx={{ borderStyle: 'solid', mt: 3 }} />
                        </Box>
                      ))}
                    </CardList>
                  </Box>
                )}

              {dataProfileUser &&
                dataProfileUser?.educations &&
                dataProfileUser?.educations?.length > 0 && (
                  <Box mt={3}>
                    <CardList title="Education">
                      {dataProfileUser?.educations.map(edu => (
                        <Box key={edu.id}>
                          <CardEducation education={edu} certificates={data} />
                          <Divider sx={{ borderStyle: 'solid', mt: 3 }} />
                        </Box>
                      ))}
                    </CardList>
                  </Box>
                )}
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

export default IndividualProfileUser;

const Div = styled('div')({});
