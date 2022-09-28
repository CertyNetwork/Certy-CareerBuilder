/* eslint-disable react-hooks/exhaustive-deps */

/**
 *
 * PostedJob
 *
 */
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { NetworkStatus, gql, useQuery } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Confirm from 'app/components/Confirm';
import Iconify from 'app/components/Iconify';
import Page from 'app/components/Page';
import { DialogAnimate } from 'app/components/animate';
import { SHOW_JOB_TYPE } from 'app/constant/jobType';
import { NearContext } from 'app/contexts/NearContext';
import useSettings from 'app/hooks/useSettings';
import { getCandidatesById } from 'app/services/jobs';
import { handleErrorResponse } from 'app/utils/until';
import _ from 'lodash';
import moment from 'moment';
import { Contract } from 'near-api-js';

import { PostJob } from '../PostJob';

interface Props {}

const POSTED_JOB = gql`
  query PostedJob($account: String!, $search: String!) {
    postedJob: jobs(
      orderBy: updated_at
      orderDirection: desc
      where: { owner_id: $account, title_contains_nocase: $search }
    ) {
      id
      job_type
      owner_id {
        id
      }
      reference
      updated_at
      title
      issued_at
      extra
      application_deadline
      work_location_country
      work_location_city
      salary_to
      salary_from
      reference_result
      reference_hash
      description
      experience_level
      job_specialities {
        id
        value
      }
    }
  }
`;
// job_specialities
const PostedJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();
  const { wallet, account } = useContext(NearContext);
  const [openDialogPostJob, setOpenDialogPostJob] = useState(false);
  const [jobSelected, setJobSelected] = useState<any>();
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const [documentJob, setDocumentJob] = useState<any>([]);

  const { data, loading, refetch, networkStatus } = useQuery(POSTED_JOB, {
    variables: {
      account: account,
      search: '',
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  const handleEditJob = data => {
    setJobSelected(data);
    setOpenDialogPostJob(true);
  };

  const handleOpenDialog = id => {
    setId(id);
    setOpenDelete(true);
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const handleSearchJob = e => {
    const { value } = e.target;
    setValueSearch(value);
    handleSearch(value);
  };

  const handleSearch = useCallback(
    _.debounce(value => {
      refetch({
        account: account,
        search: value,
      });
    }, 800),
    [],
  );

  const handleDelete = async data => {
    const contract: any = new Contract(
      wallet.account(),
      'cecareer.certynetwork.testnet',
      {
        viewMethods: ['getJob'],
        changeMethods: ['job_create', 'job_update', 'job_delete'],
      },
    );

    try {
      await contract.job_delete(
        {
          job_id: id,
        },
        '300000000000000',
        '000000000000000000000001',
      );

      setOpenDelete(false);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  useEffect(() => {
    if (data && data?.postedJob?.length > 0) {
      const newArrRequest = data?.postedJob?.map(item =>
        getCandidatesById(item.id).then(res => res.data.data),
      );
      Promise.all(newArrRequest).then(res => setDocumentJob(res));
    }
  }, [data]);

  return (
    <Page title="Posted Job - CeCareer">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  columnGap={2}
                  sx={{ px: 4, py: 3 }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap={2}
                  >
                    <Box
                      sx={{
                        width: '12px',
                        height: '24px',
                        background: '#2A85FF',
                        borderRadius: '4px',
                      }}
                    ></Box>
                    <Typography component="p">Posted Job</Typography>
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      onChange={event => handleSearchJob(event)}
                      size="small"
                      placeholder="Search for Job"
                      value={valueSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify
                              icon={'eva:search-fill'}
                              sx={{
                                color: 'text.disabled',
                                width: 20,
                                height: 20,
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
                <Divider />

                <Box sx={{ px: 4, py: 3 }}>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell align="right">Position</TableCell>
                          <TableCell align="right">Posted</TableCell>
                          <TableCell align="right">Applicant</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading || networkStatus === NetworkStatus.refetch ? (
                          [1, 2, 3, 4, 5].map(item => (
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
                        ) : data &&
                          data?.postedJob &&
                          data?.postedJob.length > 0 ? (
                          data?.postedJob?.map((row, index) => (
                            <TableRow key={row?.id}>
                              <TableCell component="th" scope="row">
                                {row?.job_type
                                  ? SHOW_JOB_TYPE[row?.job_type]
                                  : '__'}
                              </TableCell>
                              <TableCell align="right">
                                <Link
                                  to={{
                                    pathname: '/applicant-management',
                                    search: `?position=${row?.id}`,
                                  }}
                                  className="custom-uri"
                                >
                                  <Typography component="h6">
                                    {row.title ? row.title : '__'}
                                  </Typography>
                                </Link>
                              </TableCell>
                              <TableCell align="right">
                                {moment(new Date(+row?.updated_at)).format(
                                  'DD/MM/YYYY',
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {documentJob[index]?.length > 1
                                  ? `${documentJob[index]?.length} Applicants`
                                  : `${documentJob[index]?.length} Applicant`}
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  aria-label="delete"
                                  size="small"
                                  sx={{
                                    color: '#2A85FF',
                                  }}
                                  onClick={() => handleEditJob(row)}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  size="small"
                                  sx={{
                                    color: '#FF3A44',
                                  }}
                                  onClick={() => handleOpenDialog(row?.id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
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
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Div>

        <DialogAnimate open={openDialogPostJob} onClose={() => {}}>
          <PostJob
            close={() => setOpenDialogPostJob(false)}
            jobData={jobSelected}
            isEdit={true}
          />
        </DialogAnimate>

        {openDelete && (
          <Confirm
            confirmNo={handleCancelDelete}
            confirmYes={handleDelete}
            title="Pending work! Are you sure you want to delete?"
          />
        )}
      </Container>
    </Page>
  );
});
export default PostedJob;

const Div = styled('div')(({ theme }: any) => ({
  '.custom-uri': {
    textDecoration: 'none',
    color: theme.palette.text.title,
    fontWeight: 600,
    '&:hover': {
      color: '#2A85FF',
    },
  },
}));
