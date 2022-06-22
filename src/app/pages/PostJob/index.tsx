/**
 *
 * PostJob
 *
 */
import React, { memo } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { countries } from 'app/_mock';
import Scrollbar from 'app/components/Scrollbar';
import {
  FormProvider, // RHFEditor,
  RHFSelect,
  RHFTextField,
} from 'app/components/hook-form';
import { PostJobSchema } from 'app/schema/postJobSchema';

// import { messages } from './messages';

interface Props {}

export const PostJob = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const methods = useForm({
    resolver: yupResolver(PostJobSchema),
  });

  const {
    reset,
    // watch,
    // control,
    // setValue,
    // getValues,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      // enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
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
              Post a Job
            </Typography>
          </Box>
        </Stack>
        <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8 }}>
          <Box py={1} px={3}>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Job Title
              </Typography>
              <RHFTextField name="title" />
            </Box>
            {/* <Box mt={2}>
            <Typography variant="subtitle2" component="div" sx={{ mb: '10px' }}>
              Job Title
            </Typography>
            <RHFEditor simple name="content" />
          </Box> */}
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Specialties
              </Typography>
              <RHFSelect name="specialties">
                {countries.map(option => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Qualification
              </Typography>
              <RHFSelect name="qualification">
                {countries.map(option => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Experiences
              </Typography>
              <RHFSelect name="experiences">
                {countries.map(option => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
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
              <RHFTextField name="location" />
            </Box>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Salary (Optional)
              </Typography>
              <RHFTextField name="salary" />
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
              <RHFTextField name="deadline" />
            </Box>
          </Box>
        </Scrollbar>
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

          <Button
            size="small"
            variant="outlined"
            sx={{ alignSelf: 'flex-end', minWidth: 'fit-content' }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{ alignSelf: 'flex-end', minWidth: 'fit-content' }}
          >
            Post Job
          </Button>
        </Box>
      </FormProvider>
    </Div>
  );
});

const Div = styled('div')({});
