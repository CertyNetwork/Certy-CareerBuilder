/**
 *
 * FindJob
 *
 */
import React, { memo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { InView } from 'react-intersection-observer';

import { NetworkStatus, gql, useQuery } from '@apollo/client';
import {
  Box,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import CardJob from 'app/components/CardJob';
import EmptyContent from 'app/components/EmptyContent';
import Iconify from 'app/components/Iconify';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import { COUNTRIES } from 'app/constant/country';
import { JOB_TYPE } from 'app/constant/jobType';
import useSettings from 'app/hooks/useSettings';

// import { messages } from './messages';

interface Props {}

const FIND_JOB = gql`
  query Job($first: Int!, $skip: Int!) {
    jobs: jobs(first: $first, skip: $skip) {
      id
      owner_id
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
      job_specialities
    }
  }
`;

const FindJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const { data, networkStatus, fetchMore, variables } = useQuery(FIND_JOB, {
    notifyOnNetworkStatusChange: true,
    variables: {
      skip: 0,
      first: 5,
    },
  });

  if (networkStatus === NetworkStatus.loading) {
    return <h3>Loading ...</h3>;
  }

  return (
    <Page title="Find Job">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <TextField
                  fullWidth
                  onChange={event => {}}
                  placeholder="Search for Job"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify
                          icon={'eva:search-fill'}
                          sx={{ color: 'text.disabled', width: 20, height: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box>
                  <FormControl sx={{ mt: 2, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Type</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      label="Time"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {JOB_TYPE.map(type => (
                        <MenuItem key={type.code} value={type.code}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{ mt: 2, ml: 2, minWidth: 120 }}
                    size="small"
                  >
                    <InputLabel id="demo-select-small">Country</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      label="Country"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {COUNTRIES.map(c => (
                        <MenuItem key={c.code} value={c.code}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <FormControl
                    sx={{ mt: 2, ml: 2, minWidth: 120 }}
                    size="small"
                  >
                    <InputLabel id="demo-select-small">All</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={10}
                      label="All"
                      onChange={() => {}}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl> */}
                </Box>
              </Card>
              <Box sx={{ p: 3 }}>
                <Typography
                  component="div"
                  sx={{
                    fontSize: '20px',
                    fontWeight: 600,
                  }}
                >
                  Recommended for you
                </Typography>
                <Typography component="div" variant="body2">
                  Based on your profile and search history
                </Typography>
              </Box>

              {data && data?.jobs?.length > 0 ? (
                data?.jobs.map(d => (
                  <Box mb={3} key={d.id}>
                    <CardJob app={d} />
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

              {networkStatus !== NetworkStatus.fetchMore &&
                variables &&
                data.jobs.length % variables.first === 0 &&
                !fullyLoaded && (
                  <InView
                    onChange={async inView => {
                      if (inView) {
                        const result = await fetchMore({
                          variables: {
                            skip: data.jobs.length,
                          },
                        });
                        setFullyLoaded(!result.data.jobs.length);
                      }
                    }}
                  />
                )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Box marginBottom="20px">
                  <LabelStyle>Specialties</LabelStyle>
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position">
                      <FormControlLabel
                        value="animation"
                        control={<Checkbox />}
                        label="Animation"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="net"
                        control={<Checkbox />}
                        label=".NET Developer"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="ba"
                        control={<Checkbox />}
                        label="Business Analyst"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="fe"
                        control={<Checkbox />}
                        label="Front End Developer"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="full"
                        control={<Checkbox />}
                        label="Full Stack Web Developer"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="mb"
                        control={<Checkbox />}
                        label="Mobile Apps Developer"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="pm"
                        control={<Checkbox />}
                        label="Product Manager"
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </FormControl>
                </Box>

                <Divider />
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

                <Divider />

                <Box margin="20px 0">
                  <LabelStyle>Experience Level</LabelStyle>
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position">
                      <FormControlLabel
                        value="entry"
                        control={<Checkbox />}
                        label="Entry"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="junior"
                        control={<Checkbox />}
                        label="Junior"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="middle"
                        control={<Checkbox />}
                        label="Middle"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="senior"
                        control={<Checkbox />}
                        label="Senior"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="director"
                        control={<Checkbox />}
                        label="Director"
                        labelPlacement="end"
                      />
                    </FormGroup>
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

export default FindJob;

const Div = styled('div')({});
