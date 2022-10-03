/**
 *
 * PostJob
 *
 */
import { memo, useCallback, useContext, useMemo, useState } from 'react';
import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Scrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router';

import { gql, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  MenuItem,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Confirm from 'app/components/Confirm';
import {
  FormProvider,
  RHFAutocomplete,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from 'app/components/hook-form';
import { CONTACT_NAME_SETUP } from 'app/config';
import { COUNTRIES } from 'app/constant/country';
import { EXPERIENCES } from 'app/constant/experience';
import { JOB_TYPE } from 'app/constant/jobType';
import { NearContext } from 'app/contexts/NearContext';
import { PostJobSchema } from 'app/schema/postJobSchema';
import { upload } from 'app/services/uploadFileService';
import { handleErrorResponse } from 'app/utils/until';
import moment from 'moment';
import { Contract } from 'near-api-js';
import { v4 as uuidv4 } from 'uuid';

// import { messages } from './messages';

interface Props {
  close: () => void;
  isEdit?: boolean;
  jobData: any;
}

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  maxHeight: '500px',
}));

const SPECIALTIES = gql`
  query JobSpecialties {
    jobSpecialities {
      id
      value
    }
  }
`;

export const PostJob = memo(
  React.forwardRef((props: Props, ref: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const minDate = moment().add(1, 'days');
    const defaultMonth = moment().add(1, 'months');
    const [openConfirm, setOpenConfirm] = useState(false);
    const { close, jobData, isEdit } = props;

    const { wallet, account } = useContext(NearContext);

    const { data } = useQuery(SPECIALTIES);

    const defaultValues = useMemo(
      () => {
        return {
          title: jobData?.title || '',
          location: jobData?.work_location_country || '',
          description: jobData?.description || '',
          jobType: jobData?.job_type || '',
          deadline: jobData?.application_deadline
            ? new Date(
                moment.unix(jobData?.application_deadline / 1000).format('L'),
              )
            : moment(defaultMonth).format('L'),
          salaryFrom: jobData?.salary_from?.toString() || '',
          salaryTo: jobData?.salary_to?.toString() || '',
          specialties: jobData?.job_specialities || [],
          locationCity: jobData?.work_location_city || '',
          experiences: jobData?.experience_level || '',
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [jobData],
    );

    const methods = useForm({
      resolver: yupResolver(PostJobSchema),
      defaultValues,
    });

    const {
      reset,
      control,
      handleSubmit,
      formState: { isSubmitting, isDirty },
    } = methods;

    const onSubmit = async data => {
      console.log(new Date(data?.deadline).getTime(), 11);
      const contract: any = new Contract(wallet.account(), CONTACT_NAME_SETUP, {
        viewMethods: ['getJob'],
        changeMethods: ['job_create', 'job_update'],
      });

      const obj = {
        title: data?.title,
        salary_from: Number(data?.salaryFrom),
        salary_to: Number(data?.salaryTo),
        work_location_country: data?.location,
        description: data?.description,
        job_type: data?.jobType,
        application_deadline: new Date(data?.deadline).getTime(),
        job_specialities: data?.specialties || [],
        work_location_city: data?.locationCity,
        experience_level: data?.experiences,
      };

      if (isEdit) {
        try {
          const fileName = `${account}-${jobData.id}.json`;
          const jsn = JSON.stringify(obj);
          const blob = new Blob([jsn], { type: 'application/json' });
          const file = new File([blob], fileName);
          const { rootCid } = await upload(file).then(res => res.data.data);

          await contract.job_update(
            {
              metadata: {
                reference: `https://${rootCid}.ipfs.dweb.link/${fileName}`,
              },
              job_id: jobData.id,
            },
            '300000000000000',
            '1000000000000000000000000',
          );
          reset();
        } catch (error) {
          handleErrorResponse(error);
        }

        return false;
      }

      try {
        const fileName = `${account}-${uuidv4().json}`;
        const jsn = JSON.stringify(obj);
        const blob = new Blob([jsn], { type: 'application/json' });
        const file = new File([blob], fileName);
        const { rootCid } = await upload(file).then(res => res.data.data);

        await contract.job_create(
          {
            job_id: uuidv4(),
            metadata: {
              reference: `https://${rootCid}.ipfs.dweb.link/${fileName}`,
            },
          },
          '300000000000000',
          '1000000000000000000000000',
        );
        navigate('/jobs');
        reset();
      } catch (error) {
        handleErrorResponse(error);
      }
    };

    const handleConfirmYes = () => {
      setOpenConfirm(false);
      close();
    };

    const handleCancelDialog = useCallback(() => {
      if (isDirty) {
        setOpenConfirm(true);
        return false;
      }

      close();
    }, [close, isDirty]);

    return (
      <Div>
        {t('')}
        {/*  {t(...messages.someThing())}  */}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 2.5, px: 3, backgroundColor: '' }}
          >
            <Box display="flex" columnGap={2}>
              <Box
                sx={{
                  width: '12px',
                  height: '24px',
                  background: '#2A85FF',
                  borderRadius: '4px',
                }}
              ></Box>
              <Typography variant="h6" component="div">
                {isEdit ? 'Edit a Job' : 'Post a Job'}
              </Typography>
            </Box>
          </Stack>
          <StyledScrollBar>
            <Box py={1} px={3}>
              <Box>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Job Title
                </Typography>
                <RHFTextField name="title" />
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Job Descripton
                </Typography>
                <RHFEditor simple name="description" />
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Skills
                </Typography>
              </Box>
              <RHFAutocomplete
                name="specialties"
                data={data}
                defaultValue={jobData?.job_specialities || []}
              />
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Experiences
                </Typography>

                <RHFSelect
                  name="experiences"
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
                  {EXPERIENCES.map(c => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.title}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Work Location
                </Typography>

                <RHFSelect
                  name="location"
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
                  {COUNTRIES.map(c => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Job type
                </Typography>

                <RHFSelect
                  name="jobType"
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
                  {JOB_TYPE.map(type => (
                    <MenuItem key={type.code} value={type.code}>
                      {type.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Salary From (Optional)
                </Typography>
                <RHFTextField name="salaryFrom" />
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Salary To (Optional)
                </Typography>
                <RHFTextField name="salaryTo" />
              </Box>
              <Box mt={2}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ mb: '10px' }}
                >
                  Application Deadline
                </Typography>
                {/* <RHFTextField name="deadline" /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name="deadline"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        value={field.value}
                        minDate={new Date(moment(minDate).format('L'))}
                        onChange={newValue => {
                          field.onChange(newValue);
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </StyledScrollBar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            columnGap={2}
            sx={{ py: 2.5, px: 3 }}
          >
            <Typography variant="body2" component="div">
              By submitting a Resume, you agree with our Privacy Statements.
            </Typography>

            <LoadingButton
              size="small"
              variant="outlined"
              sx={{ alignSelf: 'flex-end', minWidth: 'fit-content' }}
              onClick={handleCancelDialog}
              disabled={isSubmitting}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              size="small"
              variant="contained"
              sx={{ alignSelf: 'flex-end', minWidth: 'fit-content' }}
              loading={isSubmitting}
            >
              {isEdit ? 'Update Job' : 'Post Job'}
            </LoadingButton>
          </Box>
        </FormProvider>

        {openConfirm && (
          <Confirm
            confirmNo={() => setOpenConfirm(false)}
            confirmYes={() => handleConfirmYes()}
            title="Pending work! Are you sure you want to leave?"
          />
        )}
      </Div>
    );
  }),
);

const Div = styled('div')({
  overflow: 'hidden',
});
