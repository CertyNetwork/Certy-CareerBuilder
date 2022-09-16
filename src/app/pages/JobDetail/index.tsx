/**
 *
 * JobDetail
 *
 */
import React, { memo, useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'react-share';

import { gql, useQuery } from '@apollo/client';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as IconOutSvg } from 'app/assets//button/out_going.svg';
import CardJob from 'app/components/CardJob';
import EmptyContent from 'app/components/EmptyContent';
import Image from 'app/components/Image';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import { DialogAnimate } from 'app/components/animate';
import { SHOW_COUNTRY } from 'app/constant/country';
import { SHOW_JOB_TYPE } from 'app/constant/jobType';
import { NearContext } from 'app/contexts/NearContext';
import { useGetJobByAccount } from 'app/hooks/AppliedJob/useGetJobByAccount';
import useSettings from 'app/hooks/useSettings';
import { getCandidatesById } from 'app/services/jobs';
import {
  getAvatarById,
  getBackgroundByAccount,
  getProfileByAccount,
} from 'app/services/profile';
import { handleErrorResponse } from 'app/utils/until';

import { ApplyDialog } from '../ApplyDialog';
import CompanyProfile from '../CompanyProfile';
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
      owner_id {
        id
      }
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
  const [candidates, setCandidates] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { account } = useContext(NearContext);

  const { loading, error, data } = useQuery(DETAIL_JOB, {
    variables: { id },
  });
  const { dataJob } = useGetJobByAccount({
    owner_id_contains: account,
  });

  const [value, setValue] = React.useState(0);
  const [openDialogAppJob, setOpenDialogAppJob] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenApplyJob = () => {
    setOpenDialogAppJob(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (id) {
      getCandidatesById(id).then(res => setCandidates(res.data.data));
    }
  }, [id]);

  useEffect(() => {
    if (data?.job?.owner_id?.id) {
      getProfileByAccount(data?.job?.owner_id?.id)
        .then(res => setDataCompany(res.data.data))
        .catch(err => handleErrorResponse(err));

      getBackgroundByAccount(data?.job?.owner_id?.id)
        .then(res => setBgCompany(res.data.data))
        .catch(err => handleErrorResponse(err));

      getAvatarById(data?.job?.owner_id?.id)
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
    <Page title="Job Detail - CeCareer">
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

            <Box
              sx={{ flexGrow: 1, minWidth: 160 }}
              display="flex"
              alignItems="center"
              columnGap={2}
            >
              <Box>
                <Image
                  disabledEffect
                  src={avatarCompany?.src}
                  alt=""
                  sx={{ borderRadius: 1.5, width: 50, height: 50 }}
                />
              </Box>
              <Box>
                <Typography variant="h3">{data?.job?.title}</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ color: 'text.secondary' }}
                >
                  <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                    {SHOW_COUNTRY[data?.job?.work_location_country]}
                  </Typography>
                  <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                    {SHOW_JOB_TYPE[data?.job?.job_type]}
                  </Typography>
                  <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                    Up to {data?.job?.salary_to}$
                  </Typography>
                  <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                    {candidates.length === 0 || candidates.length === 1
                      ? `${candidates.length} applicant`
                      : `${candidates.length} applicants`}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box display="flex" columnGap="12px" alignItems="center">
              {data?.job?.owner_id !== account && (
                <Button variant="contained" onClick={handleOpenApplyJob}>
                  Apply For This Position
                </Button>
              )}

              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <IconOutSvg fill="currentcolor" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 40 * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <FacebookShareButton
                    url={
                      'https://dev-cecareer.certy.network/jobs/65d1cc37-70c4-4d25-9139-922eae0b0167'
                    }
                    quote="test thu"
                  >
                    <FacebookIcon size={32} round /> Facebook
                  </FacebookShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <TwitterShareButton
                    title={'test'}
                    url={
                      'https://dev-cecareer.certy.network/jobs/65d1cc37-70c4-4d25-9139-922eae0b0167'
                    }
                    hashtags={['Certy', 'Certy-Career']}
                  >
                    <TwitterIcon size={32} round />
                    Twitter
                  </TwitterShareButton>
                </MenuItem>
              </Menu>
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
                <AntTab label="All Jobs From This Company" value={2} />
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
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <ViewDetailJob
                      infoJob={data?.job}
                      infoCompany={dataCompany?.companyProfile}
                      avatar={avatarCompany}
                      background={bgCompany}
                    />
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
            {value === 2 && (
              <Box mt={4}>
                {dataJob && dataJob.length > 0 ? (
                  dataJob.map((d, index) => (
                    <Box mb={3} key={d.id}>
                      <CardJob app={d} avatar={avatarCompany} />
                    </Box>
                  ))
                ) : (
                  <Box>
                    <EmptyContent
                      title="No Data"
                      sx={{
                        '& span.MuiBox-root': { height: 160 },
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Div>

        <DialogAnimate
          open={openDialogAppJob}
          onClose={() => setOpenDialogAppJob(false)}
        >
          <ApplyDialog
            recruiter={data?.job?.owner_id?.id}
            onClose={() => setOpenDialogAppJob(false)}
          />
        </DialogAnimate>
      </Container>
    </Page>
  );
});

export default JobDetail;

const Div = styled('div')({});
