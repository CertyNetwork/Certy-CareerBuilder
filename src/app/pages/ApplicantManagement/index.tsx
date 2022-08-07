/**
 *
 * ApplicantManagement
 *
 */
import React, { memo, useContext, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { LabelStyle } from 'app/components/LabelStyle';
import Page from 'app/components/Page';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from 'app/components/hook-form';
import { NearContext } from 'app/contexts/NearContext';
import { useApplicant } from 'app/hooks/Applicant';
import useSettings from 'app/hooks/useSettings';

// import { messages } from './messages';

interface Props {}

const POSTED_JOB = gql`
  query MyQuery($account: String!) {
    jobs(where: { owner_id: $account }) {
      id
      title
    }
  }
`;

const ApplicantManagement = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const { dataApplicant, loadingDataApplicant } = useApplicant();

  const [newData, setNewData] = useState([]);

  const { account } = useContext(NearContext);

  const defaultValues = useMemo(
    () => {
      return {
        position: searchParams.get('position')
          ? searchParams.get('position')
          : '',
        search: '',
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { data } = useQuery(POSTED_JOB, {
    variables: {
      account: account,
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    const resultData = dataApplicant.filter(
      d =>
        d.applicant_id.indexOf(data.search) > -1 &&
        (data.position ? d.job_id === data.position : true),
    );
    setNewData(resultData);
    setLoading(false);
  };

  const dataRender = useMemo(() => {
    if (newData.length > 0) {
      return newData.map((data: any) => (
        <TableRow key={data.applicant_id}>
          <TableCell component="th" scope="row">
            <Box>
              <Box>
                <Link to={`/profile/${data?.applicant_id}`}>
                  <Typography component="h4">{data?.applicant_id}</Typography>
                </Link>
              </Box>
            </Box>
          </TableCell>
          <TableCell align="right">
            {data?.contact_email ? data?.contact_email : '--'}
          </TableCell>
          <TableCell align="right">
            {data.contact_number ? data.contact_number : '--'}
          </TableCell>

          <TableCell align="center">
            <Link to={`/profile/${data?.applicant_id}`}>
              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  color: '#2A85FF',
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Link>
            {/* <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  color: '#FF3A44',
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton> */}
          </TableCell>
        </TableRow>
      ));
    }

    return dataApplicant && dataApplicant.length > 0 ? (
      dataApplicant.map(data => (
        <TableRow key={data.applicant_id}>
          <TableCell component="th" scope="row">
            <Box>
              <Box>
                <Link to={`/profile/${data?.applicant_id}`}>
                  <Typography component="h4">{data?.applicant_id}</Typography>
                </Link>
              </Box>
            </Box>
          </TableCell>
          <TableCell align="right">
            {data?.contact_email ? data?.contact_email : '--'}
          </TableCell>
          <TableCell align="right">
            {data.contact_number ? data.contact_number : '--'}
          </TableCell>

          <TableCell align="center">
            <Link to={`/profile/${data?.applicant_id}`}>
              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  color: '#2A85FF',
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Link>
            {/* <IconButton
              aria-label="delete"
              size="small"
              sx={{
                color: '#FF3A44',
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton> */}
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell align="center" colSpan={5}>
          {' '}
          No Data
        </TableCell>
      </TableRow>
    );
  }, [dataApplicant, newData]);

  return (
    <Page title="Applicant Management">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <Box display="flex" columnGap={2} sx={{ px: 4, py: 3 }}>
                  <Box
                    sx={{
                      width: '12px',
                      height: '24px',
                      background: '#2A85FF',
                      borderRadius: '4px',
                    }}
                  ></Box>
                  <Typography component="p">Applicant Management</Typography>
                </Box>
                <Divider />

                <Box sx={{ px: 4, py: 3 }}>
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Box display="flex" columnGap={3}>
                      <Box>
                        <LabelStyle>Search</LabelStyle>
                        <RHFTextField name="search" placeholder="Candidate" />
                      </Box>

                      <Box>
                        <LabelStyle>Filter by Position</LabelStyle>
                        <RHFSelect
                          name="position"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                          SelectProps={{
                            native: false,
                            sx: { textTransform: 'capitalize' },
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {data &&
                            data.jobs.length > 0 &&
                            data.jobs.map(item => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.title}
                              </MenuItem>
                            ))}
                        </RHFSelect>
                      </Box>

                      <Box display="flex" alignItems="end">
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          sx={{
                            alignSelf: 'flex-end',
                            minWidth: 'fit-content',
                          }}
                          loading={isSubmitting}
                        >
                          Search
                        </LoadingButton>
                      </Box>
                    </Box>
                  </FormProvider>

                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Candidate</TableCell>
                          <TableCell align="right">Email</TableCell>
                          <TableCell align="right">Contact number</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loadingDataApplicant || loading
                          ? [1, 2, 3, 4, 5].map(item => (
                              <TableRow key={item}>
                                <TableCell component="th" scope="row">
                                  <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                  <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                  <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                  <Skeleton />
                                </TableCell>
                                <TableCell align="right">
                                  <Skeleton />
                                </TableCell>
                              </TableRow>
                            ))
                          : dataRender}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Div>
      </Container>
    </Page>
  );
});
export default ApplicantManagement;

const Div = styled('div')({});
