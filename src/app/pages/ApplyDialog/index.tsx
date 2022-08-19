/**
 *
 * ApplyDialog
 *
 */
import React, { memo, useCallback, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Scrollbar from 'react-perfect-scrollbar';
import { useParams } from 'react-router';

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, CircularProgress, IconButton, styled } from '@mui/material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Iconify from 'app/components/Iconify';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from 'app/components/hook-form';
import { ApplyJobSchema } from 'app/schema/applyJobSchema';
import { applyJob } from 'app/services/jobs';
import { handleErrorResponse, handleSuccessResponse } from 'app/utils/until';

interface Props {
  onClose: () => void;
  recruiter: string;
}

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  maxHeight: '420px',
}));

export const ApplyDialog = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { onClose, recruiter } = props;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showCover, setShowCover] = useState(false);

  const methods = useForm({
    resolver: yupResolver(ApplyJobSchema),
  });

  const { reset, setValue, handleSubmit } = methods;

  const handleDropResume = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      if (file) {
        setShowResume(true);
        setValue(
          'resume',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
      }
    },
    [setValue],
  );

  const resetFileResume = () => {
    setValue('resume', '');
    setShowResume(false);
  };
  const resetFileCoverLetter = () => {
    setValue('coverLetter', '');
    setShowCover(false);
  };

  const handleDropCoverLetter = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      if (file) {
        setShowCover(true);
        setValue(
          'coverLetter',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );
      }
    },
    [setValue],
  );

  const onSubmit = async data => {
    setLoading(true);

    let formData = new FormData();
    formData.append('jobId', id || '');
    formData.append('recruiterAccountId', recruiter);
    formData.append('contactEmail', data.contactEmail);
    formData.append('contactNumber', data.contactNumber);

    if (data.resume) {
      formData.append('resume', data.resume);
    }

    if (data.coverLetter) {
      formData.append('coverLetter', data.coverLetter);
    }

    try {
      await applyJob(formData);
      setLoading(false);
      onClose();
      reset();
      handleSuccessResponse('Apply job success!');
    } catch (error) {
      setLoading(false);
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
              Apply to Snapshot Labs
            </Typography>
          </Box>
          <IconButton color="primary" aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <StyledScrollBar>
          <Box py={1} px={3}>
            <Typography variant="subtitle1" component="div">
              Contact info
            </Typography>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Email address
              </Typography>
              <RHFTextField name="contactEmail" />
            </Box>
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Mobile phone number
              </Typography>
              <RHFTextField name="contactNumber" />
            </Box>
            <Box mt={2} mb={1}>
              <Typography variant="subtitle2" component="div">
                Resume
              </Typography>
              <Box position="relative">
                {showResume && (
                  <Box position="absolute" top={0} right={0}>
                    <IconButton
                      color="inherit"
                      sx={{
                        color: '#00AAEC',
                        '&:hover': {
                          bgcolor: alpha('#00AAEC', 0.08),
                        },
                      }}
                      onClick={resetFileResume}
                    >
                      <Iconify
                        icon={'carbon:close-filled'}
                        sx={{ width: 30, height: 30 }}
                      />
                    </IconButton>
                  </Box>
                )}

                <RHFUploadSingleFile
                  name="resume"
                  accept="image/*,application/pdf"
                  maxSize={3145728}
                  onDrop={handleDropResume}
                  // onRemove={resetFileResume}
                />
              </Box>
            </Box>

            <Box mt={2}>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ mb: '10px' }}
              >
                Cover Letter
              </Typography>
              <Box position="relative">
                {showCover && (
                  <Box position="absolute" top={0} right={0}>
                    <IconButton
                      color="inherit"
                      sx={{
                        color: '#00AAEC',
                        '&:hover': {
                          bgcolor: alpha('#00AAEC', 0.08),
                        },
                      }}
                      onClick={resetFileCoverLetter}
                    >
                      <Iconify
                        icon={'carbon:close-filled'}
                        sx={{ width: 30, height: 30 }}
                      />
                    </IconButton>
                  </Box>
                )}
                <RHFUploadSingleFile
                  name="coverLetter"
                  accept="image/*,application/pdf"
                  maxSize={3145728}
                  onDrop={handleDropCoverLetter}
                />
              </Box>
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

          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ alignSelf: 'flex-end', width: '270px' }}
          >
            Apply for this position
          </Button>
        </Box>
      </FormProvider>

      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Div>
  );
});

const Div = styled('div')({
  overflow: 'hidden',
});
