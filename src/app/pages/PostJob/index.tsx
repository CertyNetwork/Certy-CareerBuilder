/**
 *
 * PostJob
 *
 */
import { memo, useContext, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Scrollbar from 'react-perfect-scrollbar';

import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from 'app/components/hook-form';
import { COUNTRIES } from 'app/constant/country';
import { JOB_TYPE } from 'app/constant/jobType';
import { NearContext } from 'app/contexts/NearContext';
import { PostJobSchema } from 'app/schema/postJobSchema';
import { upload } from 'app/services/uploadFileService';
import { handleErrorResponse } from 'app/utils/until';
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

function valuetext(value: number) {
  return `${value}°C`;
}

export const PostJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const { close, jobData, isEdit } = props;

  const { wallet, account } = useContext(NearContext);

  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const defaultValues = useMemo(
    () => {
      if (jobData) {
        setValue([jobData?.salary_from, jobData?.salary_to]);
        return {
          title: jobData.title || '',
          location: jobData.work_location_country || '',
          description: jobData.description || '',
          jobType: jobData.job_type || '',
          deadline: new Date(jobData.application_deadline) || new Date(),
        };
      }
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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async data => {
    const contract: any = new Contract(
      wallet.account(),
      'cecareer.certynetwork.testnet',
      {
        viewMethods: ['getJob'],
        changeMethods: ['job_create', 'job_update'],
      },
    );

    const obj = {
      title: data.title,
      salary_from: value[0],
      salary_to: value[1],
      work_location_country: data.location,
      description: data.description,
      job_type: data.jobType,
      application_deadline: new Date(data.deadline).getTime(),
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
      reset();
    } catch (error) {
      handleErrorResponse(error);
    }
  };

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
              <RHFTextField
                name="description"
                placeholder="Description"
                multiline
                rows={4}
              />
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
                Salary (Optional)
              </Typography>
              <Box>
                <Slider
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={0}
                  max={200}
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Department
              </Typography>
              <RHFTextField name="department" />
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
            onClick={close}
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
    </Div>
  );
});

const Div = styled('div')({
  overflow: 'hidden',
});
