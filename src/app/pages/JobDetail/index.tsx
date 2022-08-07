/**
 *
 * JobDetail
 *
 */
import React, { memo, useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as IconOutSvg } from 'app/assets//button/out_going.svg';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import { DialogAnimate } from 'app/components/animate';
import { NearContext } from 'app/contexts/NearContext';
import useSettings from 'app/hooks/useSettings';
import {
  getAvatarById,
  getBackgroundByAccount,
  getProfileByAccount,
} from 'app/services/profile';
import { handleErrorResponse } from 'app/utils/until';

import { ApplyDialog } from '../ApplyDialog';
import CompanyProfile from '../CompanyProfile';
import { ContactForm } from '../ContactForm';
import { ViewDetailJob } from '../ViewDetailJob';

// import { messages } from './messages';

interface Props {}

interface StyledTabProps {
  label: string;
  value: number;
}

const DETAIL_JOB = gql`
  query Job($id: String!) {
    job(id: $id) {
      id
      extra
      description
      application_deadline
      issued_at
      job_type
      reference
      owner_id
      reference_hash
      reference_result
      salary_from
      salary_to
      title
      updated_at
      work_location_city
      work_location_country
      experience_level
      job_specialities {
        id
        value
      }
    }
  }
`;
// job_specialities

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }: any) => ({
  textTransform: 'none',
  minWidth: 0,
  fontWeight: theme.typography.fontWeightMedium,
  '&.Mui-selected': {
    color: theme.palette.text.active,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const JobDetail = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const [dataCompany, setDataCompany] = useState<any>({});
  const [avatarCompany, setAvatarCompany] = useState<any>('');
  const [bgCompany, setBgCompany] = useState<any>('');

  const { loading, error, data } = useQuery(DETAIL_JOB, {
    variables: { id },
  });

  const { account } = useContext(NearContext);

  const [value, setValue] = React.useState(0);
  const [openDialogAppJob, setOpenDialogAppJob] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenApplyJob = () => {
    setOpenDialogAppJob(true);
  };

  useEffect(() => {
    if (data?.job?.owner_id) {
      getProfileByAccount(data?.job?.owner_id)
        .then(res => setDataCompany(res.data.data))
        .catch(err => handleErrorResponse(err));

      getBackgroundByAccount(data?.job?.owner_id)
        .then(res => setBgCompany(res.data.data))
        .catch(err => handleErrorResponse(err));

      getAvatarById(data?.job?.owner_id)
        .then(res => setAvatarCompany(res.data.data))
        .catch(err => handleErrorResponse(err));
    }
  }, [data]);

  useEffect(() => {
    handleErrorResponse(error);
  }, [error]);

  if (loading) {
    return <h3>Loading ...</h3>;
  }

  return (
    <Page title="Job Detail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Box display="flex" columnGap="24px" alignItems="center">
            <Link to="/jobs">
              <IconButton aria-label="back">
                <ArrowBackIosNewIcon />
              </IconButton>
            </Link>

            <Box sx={{ flexGrow: 1, minWidth: 160 }}>
              <Typography variant="h3">{data?.job?.title}</Typography>
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
            <Box display="flex" columnGap="12px" alignItems="center">
              {data?.job?.owner_id !== account && (
                <Button variant="contained" onClick={handleOpenApplyJob}>
                  Apply For This Position
                </Button>
              )}

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

          <Box mt={6} sx={{ width: '100%', typography: 'subtitle1' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <AntTab label="Job Detail" value={0} />
                <AntTab label="About Company" value={1} />
                {/* <AntTab label="All Jobs From This Company" value={2} /> */}
              </Tabs>
            </Box>
            {value === 0 && (
              <Box mt={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card>
                      <Box px={8} py={4}>
                        <LabelStyle>Job Description</LabelStyle>
                        <Typography
                          component="div"
                          dangerouslySetInnerHTML={{
                            __html: data?.job?.description || '',
                          }}
                        />
                        {/* <Typography variant="body1" component="div">
                          We are a small team looking for a rockstar UX/UI
                          designer to build an easy and intuitive graphical
                          interface for digital governance. As a senior
                          designer, you will work on the desktop version and the
                          mobile application interfaces with minimal
                          supervision.
                        </Typography>

                        {[1, 2].map(index => (
                          <Box key={index.toString()}>
                            <Typography variant="h4" component="div">
                              What we offer
                            </Typography>
                            <Box px={3}>
                              <ul>
                                <li>
                                  {' '}
                                  <Typography variant="body1" component="div">
                                    We offer flexible work hours and a
                                    competitive salary. As long as you are
                                    committed to Snapshot's success and you
                                    contribute in a meaningful way, everything
                                    can be accommodated.
                                  </Typography>{' '}
                                </li>
                                <li>
                                  {' '}
                                  <Typography variant="body1" component="div">
                                    You’ll work 100% remotely.
                                  </Typography>{' '}
                                </li>
                                <li>
                                  {' '}
                                  <Typography variant="body1" component="div">
                                    This is a long-term full-time contract role.
                                    We care about job security for our team and
                                    we’re looking for people who can grow with
                                    our products for years to come.
                                  </Typography>{' '}
                                </li>
                                <li>
                                  {' '}
                                  <Typography variant="body1" component="div">
                                    You'll be given the opportunity to work with
                                    the best projects in the Ethereum community,
                                    from the largest DAOs to the most innovative
                                    protocols.
                                  </Typography>{' '}
                                </li>
                                <li>
                                  {' '}
                                  <Typography variant="body1" component="div">
                                    Your personal growth in the crypto space
                                    will be a high priority for Snapshot, you
                                    can expect to learn a lot from your time
                                    here.
                                  </Typography>{' '}
                                </li>
                              </ul>
                            </Box>
                          </Box>
                        ))}

                        <Box display="flex" columnGap={2}>
                          <Label>
                            <Typography
                              variant="subtitle2"
                              sx={{ ml: 0.5, mr: 1 }}
                            >
                              English
                            </Typography>
                          </Label>
                          <Label>
                            <Typography
                              variant="subtitle2"
                              sx={{ ml: 0.5, mr: 1 }}
                            >
                              User Interface Design
                            </Typography>
                          </Label>
                          <Label>
                            <Typography
                              variant="subtitle2"
                              sx={{ ml: 0.5, mr: 1 }}
                            >
                              User Experience Design (UED)
                            </Typography>
                          </Label>
                        </Box> */}
                      </Box>
                    </Card>

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
                    <ViewDetailJob infoJob={data?.job} />
                    <Box mt={3}>
                      <ContactForm />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            {value === 1 && (
              <Box mt={4}>
                <CompanyProfile
                  infoCompany={dataCompany?.companyProfile}
                  avatar={avatarCompany}
                  background={bgCompany}
                />
              </Box>
            )}
            {/* {value === 2 && 'aaaa'} */}
          </Box>
        </Div>

        <DialogAnimate
          open={openDialogAppJob}
          onClose={() => setOpenDialogAppJob(false)}
        >
          <ApplyDialog
            recruiter={data?.job?.owner_id}
            onClose={() => setOpenDialogAppJob(false)}
          />
        </DialogAnimate>
      </Container>
    </Page>
  );
});

export default JobDetail;

const Div = styled('div')({});
