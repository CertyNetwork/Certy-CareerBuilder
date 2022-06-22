/**
 *
 * ApplyDialog
 *
 */
import React, { memo, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField, styled } from '@mui/material';
import { Box, Button, Stack, Typography } from '@mui/material';
import ResumeFile from 'app/components/ReumeFile';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from 'app/components/hook-form';
import { ApplyJobSchema } from 'app/schema/applyJobSchema';

interface Props {
  onClose: () => void;
}

export const ApplyDialog = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { onClose } = props;

  const methods = useForm({
    resolver: yupResolver(ApplyJobSchema),
  });

  const {
    reset,
    // watch,
    // control,
    setValue,
    // getValues,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
      }
    },
    [setValue],
  );

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
              Apply to Snapshot Labs
            </Typography>
          </Box>
          <IconButton color="primary" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {/* <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8 }}> */}
        <Box py={1} px={3}>
          <Typography variant="subtitle1" component="div">
            Contact info
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle2" component="div" sx={{ mb: '10px' }}>
              Email address
            </Typography>
            <RHFTextField name="email" />
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle2" component="div" sx={{ mb: '10px' }}>
              Mobile phone number
            </Typography>
            <RHFTextField name="mobile" />
          </Box>
          <Box mt={2} mb={1}>
            <Typography variant="subtitle2" component="div">
              Resume
            </Typography>
            <ResumeFile
              name="resume"
              options={[{ value: 'test 1' }, { value: 'tesst2' }]}
            />
          </Box>
          <RHFUploadSingleFile
            name="cover"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <Box mt={2}>
            <Typography variant="subtitle2" component="div" sx={{ mb: '10px' }}>
              Cover Letter
            </Typography>
            <TextField
              multiline
              fullWidth
              rows={4}
              placeholder="Share what you are thinking here..."
              sx={{
                '& fieldset': {
                  borderWidth: `1px !important`,
                  borderColor: theme =>
                    `${theme.palette.grey[500_32]} !important`,
                },
              }}
            />
          </Box>
        </Box>
        {/* </Scrollbar> */}
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
            type="submit"
            size="small"
            variant="contained"
            sx={{ alignSelf: 'flex-end', maxWidth: 'max-content' }}
          >
            Apply for this position
          </Button>
        </Box>
      </FormProvider>
    </Div>
  );
});

const Div = styled('div')({});
