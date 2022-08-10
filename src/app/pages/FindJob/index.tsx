/* eslint-disable react-hooks/exhaustive-deps */

/**
 *
 * FindJob
 *
 */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

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
import { getAvatarById } from 'app/services/profile';
import _ from 'lodash';

// import { messages } from './messages';

interface Props {}

const FIND_JOB = gql`
  query Job($first: Int!, $skip: Int!, $where: Job_filter) {
    jobs: jobs(
      first: $first
      skip: $skip
      where: $where
      orderBy: updated_at
      orderDirection: desc
    ) {
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
      experience_level
      job_specialities {
        id
        value
      }
    }
  }
`;
// job_specialities

const FindJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [avatarJob, setAvatarJob] = useState<any>([]);
  const [whereJob, setWhereJob] = useState({});
  const { data, networkStatus, fetchMore, variables, refetch } = useQuery(
    FIND_JOB,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        skip: 0,
        first: 5,
        where: whereJob,
      },
    },
  );

  const handleInput = e => {
    const { value } = e.target;
    const where: any = { ...whereJob };
    where.title_contains_nocase = value;
    setWhereJob(where);

    if (!value) {
      delete where.job_type;
      setWhereJob(where);
      setFullyLoaded(false);
    }

    handleSearch(where);
  };

  const handleSearch = useCallback(
    _.debounce(value => {
      refetch({
        skip: 0,
        first: 5,
        where: value,
      });
    }, 800),
    [],
  );

  const handleChangeJobType = e => {
    const { value } = e.target;
    const where: any = { ...whereJob };
    where.job_type = value;
    setWhereJob(where);

    if (!value) {
      delete where.job_type;
      setWhereJob(where);
      setFullyLoaded(false);
    }

    refetch({
      skip: 0,
      first: 5,
      where,
    });
  };

  const handleChangeCountry = e => {
    const { value } = e.target;
    const where: any = { ...whereJob };
    where.work_location_country = value;
    setWhereJob(where);

    if (!value) {
      delete where.work_location_country;
      setWhereJob(where);
      setFullyLoaded(false);
    }

    refetch({
      skip: 0,
      first: 5,
      where,
    });
  };

  useEffect(() => {
    if (data && data.jobs && data.jobs.length > 0) {
      const newArrRequest = data?.jobs?.map(d =>
        getAvatarById(d.owner_id).then(res => res.data.data),
      );
      Promise.all(newArrRequest).then(res => setAvatarJob(res));
    }
  }, [data]);

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
                  onChange={handleInput}
                  placeholder="Search for Job"
                  size="small"
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
                      onChange={handleChangeJobType}
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
                      onChange={handleChangeCountry}
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
                data?.jobs.map((d, index) => (
                  <Box mb={3} key={d.id}>
                    <CardJob app={d} avatar={avatarJob[index]} />
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
                            where: whereJob,
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
