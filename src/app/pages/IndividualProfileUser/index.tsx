/**
 *
 * IndividualProfile
 *
 */
import { memo, useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import CardEducation from 'app/components/CardEducation';
import CardExpire from 'app/components/CardExpire';
import CardList from 'app/components/CardList';
import Label from 'app/components/Label';
import OtherProfileUser from 'app/components/OtherProfileUser';
import Page from 'app/components/Page';
import { NearContext } from 'app/contexts/NearContext';
import {
  useAvatarAccount,
  useBackgroundAccount,
  useProfileUser,
} from 'app/hooks/Profile/useProfile';
import useSettings from 'app/hooks/useSettings';

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

  const { dataProfileAvatar, loadingDataAvatar } = useAvatarAccount(id || '');
  const { dataBackground, loadingDataBackground } = useBackgroundAccount(
    id || '',
  );
  // const { dataProfile, loadingDataProfile } = useProfile();
  const { dataProfileUser, loadingDataUser } = useProfileUser(id || '');

  const { data } = useQuery(CERTIFICATES, {
    variables: {
      arrayId: dataProfileUser?.profile?.certificates?.map(c => c.id),
    },
  });

  if (!token && !account) {
    return wallet?.requestSignIn(
      'cecareer.certynetwork.testnet', // contract requesting access
      'Certify',
    );
  }

  if (loadingDataBackground || loadingDataUser || loadingDataAvatar) {
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
              <OtherProfileUser
                user={dataProfileUser}
                avatar={dataProfileAvatar?.src}
                bgImg={dataBackground?.src}
              />

              {dataProfileUser &&
                dataProfileUser?.profile?.experiences &&
                dataProfileUser?.profile?.experiences?.length > 0 && (
                  <Box mt={3}>
                    <CardList title="Experience">
                      {dataProfileUser?.profile?.experiences.map(exp => (
                        <Box key={exp.id}>
                          <CardExpire experience={exp} />
                          <Divider sx={{ borderStyle: 'solid', mt: 3 }} />
                        </Box>
                      ))}
                    </CardList>
                  </Box>
                )}

              {dataProfileUser &&
                dataProfileUser?.profile?.educations &&
                dataProfileUser?.profile?.educations?.length > 0 && (
                  <Box mt={3}>
                    <CardList title="Education">
                      {dataProfileUser?.profile?.educations.map(edu => (
                        <Box key={edu.id}>
                          <CardEducation education={edu} certificates={data} />
                          <Divider sx={{ borderStyle: 'solid', mt: 3 }} />
                        </Box>
                      ))}
                    </CardList>
                  </Box>
                )}

              {dataProfileUser &&
                dataProfileUser?.profile?.skills &&
                dataProfileUser?.profile?.skills?.length > 0 && (
                  <Box mt={3}>
                    <CardList title="Skills">
                      <Box display="flex" flexWrap="wrap" columnGap={2}>
                        {dataProfileUser?.profile?.skills.map(skill => (
                          <Box key={skill}>
                            <Label>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  ml: 0.5,
                                  mr: 1,
                                  textTransform: 'capitalize',
                                }}
                              >
                                {skill}
                              </Typography>
                            </Label>
                          </Box>
                        ))}
                      </Box>
                    </CardList>
                  </Box>
                )}
            </Grid>

            {/* <Grid item xs={12} md={4}>
              <ContactForm />
            </Grid> */}
          </Grid>
        </Div>
      </Container>
    </Page>
  );
});

export default IndividualProfileUser;

const Div = styled('div')({});
