/**
 *
 * AppliedJob
 *
 */
import React, { memo } from 'react';

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
import { _appRelated } from 'app/_mock';
import CardJob from 'app/components/CardJob';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import useSettings from 'app/hooks/useSettings';

// import { messages } from './messages';

interface Props {}

const AppliedJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

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
              {_appRelated.map(app => (
                <Box mb={3}>
                  <CardJob key={app.id} app={app} applied={true} />
                </Box>
              ))}
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
