import { memo, useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material';
import CardJob from 'app/components/CardJob';
import CardSkeleton from 'app/components/CardSkeleton';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import { NearContext } from 'app/contexts/NearContext';
import { useAppliedJob } from 'app/hooks/AppliedJob/useAppliedJob';
import useSettings from 'app/hooks/useSettings';
import { getAvatarById } from 'app/services/profile';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';

// import { messages } from './messages';

interface Props {}

const FIND_JOB_APPLY = gql`
  query JobApply($arrayId: [ID], $time: BigInt) {
    jobApply: jobs(where: { id_in: $arrayId, updated_at_gt: $time }) {
      id
      owner_id {
        id
      }
      extra
      reference
      reference_hash
      reference_result
      title
      description
      issued_at
      updated_at
      work_location_country
      work_location_city
      job_type
      application_deadline
      salary_from
      salary_to
      experience_level
      job_specialities {
        id
        value
      }
    }
  }
`;
// job_specialities

const AppliedJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const [avatarJob, setAvatarJob] = useState<any>([]);
  const { wallet, account } = useContext(NearContext);
  const token = localStorage.getItem('Near_token_bearer');
  const [whereJob, setWhereJob] = useState<any>(0);
  const { dataAppliedJob, loadingDataAppliedJob } = useAppliedJob();

  const { data, loading, refetch } = useQuery(FIND_JOB_APPLY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      arrayId: dataAppliedJob,
      time: whereJob,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const handleChangeTime = e => {
    const { value } = e.target;
    const day = moment(new Date())
      .subtract(Number(value), 'days')
      .format('MM-DD-YYYY');

    const timeStamp = new Date(day).getTime();
    setWhereJob(new BigNumber(timeStamp));

    if (Number(value) === 0) {
      setWhereJob(0);
    }

    refetch({
      arrayId: dataAppliedJob,
      time: whereJob,
    });
  };

  useEffect(() => {
    if (data && data.jobApply && data.jobApply.length > 0) {
      const newArrRequest = data?.jobApply?.map(d =>
        getAvatarById(d.owner_id.id).then(res => res.data.data),
      );
      Promise.all(newArrRequest).then(res => setAvatarJob(res));
    }
  }, [data]);

  if (!token && !account) {
    return wallet?.requestSignIn(
      'cecareer.certynetwork.testnet', // contract requesting access
      'Certify',
    );
  }

  return (
    <Page title="Applied Job - CeCareer">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Box sx={{ p: 3 }}>
            <Typography
              component="div"
              sx={{
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              Applied Job
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {!(loadingDataAppliedJob || loading) &&
                data &&
                data.jobApply &&
                data.jobApply.length > 0 &&
                data.jobApply.map((data, index) => (
                  <Box mb={3} key={data.id}>
                    <CardJob
                      app={data}
                      applied={true}
                      avatar={avatarJob[index]}
                    />
                  </Box>
                ))}{' '}
              {!(loadingDataAppliedJob || loading) &&
                (!data || data.jobApply.length === 0) && (
                  <Box
                    mb={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <h3>No Data</h3>
                  </Box>
                )}
              {(loadingDataAppliedJob || loading) &&
                [1, 2, 3, 4, 5].map(i => <CardSkeleton key={i} />)}
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Box margin="20px 0">
                  <LabelStyle>Date Posted</LabelStyle>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="0"
                      name="radio-buttons-group"
                      onChange={handleChangeTime}
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="Any Time"
                      />
                      <FormControlLabel
                        value="30"
                        control={<Radio />}
                        label="Past Month"
                      />
                      <FormControlLabel
                        value="7"
                        control={<Radio />}
                        label="Past Week"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Past 24 hours"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Div>
      </Container>
    </Page>
  );
});

export default AppliedJob;

const Div = styled('div')({});
