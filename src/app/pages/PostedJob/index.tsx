/**
 *
 * PostedJob
 *
 */
import React, { memo, useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';
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
import { DialogConfirm } from 'app/components/DialogConfirm';
import Iconify from 'app/components/Iconify';
import Page from 'app/components/Page';
import { DialogAnimate } from 'app/components/animate';
import { NearContext } from 'app/contexts/NearContext';
import useSettings from 'app/hooks/useSettings';
import { handleErrorResponse } from 'app/utils/until';
import moment from 'moment';
import { Contract } from 'near-api-js';

import { PostJob } from '../PostJob';

interface Props {}

const POSTED_JOB = gql`
  query PostedJob($account: String!) {
    postedJob: jobs(where: { owner_id: $account }) {
      id
      job_type
      owner_id
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

  const { data, loading } = useQuery(POSTED_JOB, {
    variables: {
      account: account,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
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
        '1000000000000000000000000',
      );

      setOpenDelete(false);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <Page title="Posted Job">
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
                      onChange={event => {}}
                      size="small"
                      placeholder="Search for Job"
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
                        {loading
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
                          : data?.postedJob?.map(row => (
                              <TableRow key={row?.id}>
                                <TableCell component="th" scope="row">
                                  {row?.job_type ? row?.job_type : '__'}
                                </TableCell>
                                <TableCell align="right">
                                  <Link
                                    to={{
                                      pathname: '/applicant-management',
                                      search: `?position=${row?.id}`,
                                    }}
                                  >
                                    <Typography component="h6">
                                      {row.title ? row.title : '__'}
                                    </Typography>
                                  </Link>
                                </TableCell>
                                <TableCell align="right">
                                  {moment(
                                    new Date(row?.application_deadline),
                                  ).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell align="right">
                                  0 Applicants
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
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Div>

        <DialogAnimate
          open={openDialogPostJob}
          onClose={() => setOpenDialogPostJob(false)}
        >
          <PostJob
            close={() => setOpenDialogPostJob(false)}
            jobData={jobSelected}
            isEdit={true}
          />
        </DialogAnimate>

        {openDelete && (
          <DialogConfirm
            handleNo={handleCancelDelete}
            handleYes={handleDelete}
          />
        )}
      </Container>
    </Page>
  );
});
export default PostedJob;

const Div = styled('div')({});
