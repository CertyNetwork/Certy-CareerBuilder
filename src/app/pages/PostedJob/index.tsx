/**
 *
 * PostedJob
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Pagination,
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
import Iconify from 'app/components/Iconify';
import Page from 'app/components/Page';
import useSettings from 'app/hooks/useSettings';

// import { messages } from './messages';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface Props {}

const PostedJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

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
                          <TableCell>Dessert (100g serving)</TableCell>
                          <TableCell align="right">Calories</TableCell>
                          <TableCell align="right">Fat&nbsp;(g)</TableCell>
                          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                          <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map(row => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Pagination count={10} color="primary" />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Div>
      </Container>
    </Page>
  );
});
export default PostedJob;

const Div = styled('div')({});
