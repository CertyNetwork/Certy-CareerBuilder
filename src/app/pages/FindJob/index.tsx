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
import CardSkeleton from 'app/components/CardSkeleton';
import EmptyContent from 'app/components/EmptyContent';
import Iconify from 'app/components/Iconify';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import { COUNTRIES } from 'app/constant/country';
import { JOB_TYPE } from 'app/constant/jobType';
import useSettings from 'app/hooks/useSettings';
import { getAvatarById } from 'app/services/profile';
import { BigNumber } from 'bignumber.js';
import _ from 'lodash';
import moment from 'moment';

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

const FindJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [avatarJob, setAvatarJob] = useState<any>([]);
  const [whereJob, setWhereJob] = useState({
    updated_at_gt: 0,
    application_deadline_gt: new BigNumber(new Date().getTime()),
  });
  const [arrLevel, setArrLevel] = useState<any>([]);
  const { data, networkStatus, fetchMore, variables, refetch, loading } =
    useQuery(FIND_JOB, {
      notifyOnNetworkStatusChange: true,
      variables: {
        skip: 0,
        first: 5,
        where: whereJob,
      },
    });

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

  const handleChangeTime = e => {
    const { value } = e.target;
    const day = moment(new Date())
      .subtract(Number(value), 'days')
      .format('MM-DD-YYYY');

    const timeStamp = new Date(day).getTime();
    const where: any = { ...whereJob };
    where.updated_at_gt = new BigNumber(timeStamp);
    setWhereJob(where);

    if (Number(value) === 0) {
      where.updated_at_gt = 0;
      setWhereJob(where);
      setFullyLoaded(false);
    }

    refetch({
      skip: 0,
      first: 5,
      where,
    });
  };

  const hangdleChangeLevel = e => {
    const { checked, value } = e.target;
    const where: any = { ...whereJob };

    if (!checked && value) {
      const newArr = arrLevel.filter(level => level !== value);
      where.experience_level_in = newArr;
      setArrLevel(newArr);
      setWhereJob(where);

      if (newArr.length === 0) {
        delete where.experience_level_in;
        setWhereJob(where);
        setFullyLoaded(false);
      }

      refetch({
        skip: 0,
        first: 5,
        where,
      });

      return false;
    }

    const arrConcatLevel: any = [...arrLevel, value];
    where.experience_level_in = arrConcatLevel;
    setArrLevel(arrConcatLevel);
    setWhereJob(where);

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

  return (
    <Page title="Find Job - CeCareer">
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
              {data &&
                data?.jobs?.length > 0 &&
                data?.jobs.map((d, index) => (
                  <Box mb={3} key={d.id}>
                    <CardJob app={d} avatar={avatarJob[index]} />
                  </Box>
                ))}{' '}
              {!loading && (!data || data?.jobs?.length === 0) && (
                <Box>
                  <EmptyContent
                    title="No Data"
                    sx={{
                      '& span.MuiBox-root': { height: 160 },
                    }}
                  />
                </Box>
              )}
              {(networkStatus === NetworkStatus.refetch ||
                loading ||
                networkStatus === NetworkStatus.fetchMore) &&
                [1, 2, 3, 4, 5].map(i => <CardSkeleton key={i} />)}
              {networkStatus !== NetworkStatus.fetchMore &&
                variables &&
                data?.jobs?.length % variables.first === 0 &&
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

                <Divider />

                <Box margin="20px 0">
                  <LabelStyle>Experience Level</LabelStyle>
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position">
                      <FormControlLabel
                        value="entry"
                        control={<Checkbox onChange={hangdleChangeLevel} />}
                        label="Entry"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="junior"
                        control={<Checkbox onChange={hangdleChangeLevel} />}
                        label="Junior"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="middle"
                        control={<Checkbox onChange={hangdleChangeLevel} />}
                        label="Middle"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="senior"
                        control={<Checkbox onChange={hangdleChangeLevel} />}
                        label="Senior"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="director"
                        control={<Checkbox onChange={hangdleChangeLevel} />}
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
