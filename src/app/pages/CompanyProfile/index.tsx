/**
 *
 * CompanyProfile
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { _appRelated } from 'app/_mock';
import CardExpire from 'app/components/CardExpire';
import CardList from 'app/components/CardList';
import Image from 'app/components/Image';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import SocialsButton from 'app/components/SocialsButton';
import useSettings from 'app/hooks/useSettings';

import { ContactForm } from '../ContactForm';

// import { messages } from './messages';

interface Props {}

const CompanyProfile = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const theme = useTheme();

  return (
    <Page title="Company Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <Box m={3}>
                  <Image
                    disabledEffect
                    src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
                    alt=""
                    sx={{ borderRadius: 1.5, width: '100%', height: 273 }}
                  />
                </Box>

                <Box px={8} py={4}>
                  <LabelStyle>Company Description</LabelStyle>
                  <Typography variant="body1" component="div">
                    Snapshot Labs is dedicated to creating a voting framework to
                    facilitate decision making for decentralized organizations.
                    Currently, thousands of DAOs are using Snapshot, including
                    leading Ethereum protocols.
                  </Typography>
                  <Typography variant="body1" component="div">
                    We are a small team looking for a rockstar UX/UI designer to
                    build an easy and intuitive graphical interface for digital
                    governance. As a senior designer, you will work on the
                    desktop version and the mobile application interfaces with
                    minimal supervision.
                  </Typography>

                  <Box>
                    <LabelStyle>Images</LabelStyle>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {[1, 2, 3, 4, 5].map(index => (
                        <Image
                          disabledEffect
                          src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
                          alt=""
                          sx={{ borderRadius: 1.5, width: 112, height: 112 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Card>

              <Box mt={3}>
                <CardList title="Related Jobs">
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
              <Card>
                <Box m={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Image
                      disabledEffect
                      src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
                      alt=""
                      sx={{ borderRadius: 1.5, width: 48, height: 48 }}
                    />
                    <Typography variant="h6" component="div">
                      Snapshot Labs
                    </Typography>
                  </Stack>

                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: theme.palette.text.disabled }}
                    >
                      Location
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
                      Company Type
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      Product
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: theme.palette.text.disabled }}
                    >
                      Size
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      150-300
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: theme.palette.text.disabled }}
                    >
                      Working Hours
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                      Monday - Friday
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: theme.palette.text.disabled }}
                    >
                      Social profiles
                    </Typography>
                    <Stack>
                      <SocialsButton initialColor sx={{ my: 1 }} />
                    </Stack>
                  </Box>
                </Box>
              </Card>
              <Box mt={3}>
                <ContactForm />
              </Box>
            </Grid>
          </Grid>
        </Div>
      </Container>
    </Page>
  );
});
export default CompanyProfile;

const Div = styled('div')({});
