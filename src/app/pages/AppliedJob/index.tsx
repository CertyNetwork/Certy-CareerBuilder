import { memo, useContext } from 'react';

import { useTranslation } from 'react-i18next';

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
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import { NearContext } from 'app/contexts/NearContext';
import { useAppliedJob } from 'app/hooks/AppliedJob/useAppliedJob';
import useSettings from 'app/hooks/useSettings';
import { storage } from 'utils/util';

// import { messages } from './messages';

interface Props {}

const AppliedJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

  const { wallet, account } = useContext(NearContext);
  const token = storage.get('Near_token_bearer');

  const { dataAppliedJob, errorDataAppliedJob, loadingDataAppliedJob } =
    useAppliedJob();

  if (!token && !account) {
    return wallet?.requestSignIn(
      'cecareer.certynetwork.testnet', // contract requesting access
      'Certify',
    );
  }

  console.log(dataAppliedJob);
  if (loadingDataAppliedJob) {
    return <h3>Loading ...</h3>;
  }

  return (
    <Page title="Applied Job">
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
              {dataAppliedJob && dataAppliedJob?.length > 0 ? (
                dataAppliedJob.map(data => (
                  <Box mb={3} key={data.id}>
                    <CardJob app={data} applied={true} />
                  </Box>
                ))
              ) : (
                <Box
                  mb={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <h3>No Data</h3>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Box margin="20px 0">
                  <LabelStyle>Date Posted</LabelStyle>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="any"
                        control={<Radio />}
                        label="Any Time"
                      />
                      <FormControlLabel
                        value="month"
                        control={<Radio />}
                        label="Past Month"
                      />
                      <FormControlLabel
                        value="week"
                        control={<Radio />}
                        label="Past Week"
                      />
                      <FormControlLabel
                        value="day"
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
