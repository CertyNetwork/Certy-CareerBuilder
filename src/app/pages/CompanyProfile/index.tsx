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
  Grid,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import CompanyCard from 'app/components/CompanyCard';
// import { _appRelated } from 'app/_mock';
// import CardExpire from 'app/components/CardExpire';
// import CardList from 'app/components/CardList';
import Image from 'app/components/Image';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import SocialsButton from 'app/components/SocialsButton';
import useSettings from 'app/hooks/useSettings';

import { ContactForm } from '../ContactForm';

// import { messages } from './messages';

interface Props {
  infoCompany: any;
  avatar: any;
  background: any;
}

const CompanyProfile = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const { infoCompany, background, avatar } = props;

  return (
    <Page title="Company Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <CompanyCard
                company={infoCompany}
                avatar={avatar?.src}
                bgImg={background?.src}
              />

              <Box mt={3}>
                <Card>
                  <Box px={8} py={4}>
                    <LabelStyle>Company Description</LabelStyle>
                    <Typography
                      variant="body1"
                      component="div"
                      dangerouslySetInnerHTML={{
                        __html: infoCompany?.about,
                      }}
                    />

                    <Box mt={3}>
                      <LabelStyle>Images</LabelStyle>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {infoCompany?.images?.map((img, index) => (
                          <Image
                            key={index.toString()}
                            disabledEffect
                            src={img?.src}
                            alt=""
                            sx={{ borderRadius: 1.5, width: 112, height: 112 }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              </Box>

              {/* <Box mt={3}>
                <CardList title="Related Jobs">
                  {_appRelated.map(app => (
                    <>
                      <CardExpire key={app.id} app={app} />
                      <Divider sx={{ borderStyle: 'solid' }} />
                    </>
                  ))}
                </CardList>
              </Box> */}
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <Box m={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Image
                      disabledEffect
                      src={avatar?.src}
                      alt=""
                      sx={{ borderRadius: 1.5, width: 48, height: 48 }}
                    />
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {infoCompany?.info.companyName}
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
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {infoCompany?.info?.location}
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
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {infoCompany?.info?.organizationType}
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
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {infoCompany?.info?.organizationSize}
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
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {infoCompany?.info?.workingHours}
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
