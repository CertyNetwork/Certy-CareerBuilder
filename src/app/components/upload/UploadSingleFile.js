import { useDropzone } from 'react-dropzone';

import { Box, Stack, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

//
import Image from '../Image';
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  onRemove,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      {!file && (
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter',
            }),
            ...(file && {
              padding: '12% 0',
            }),
          }}
        >
          <input {...getInputProps()} />

          <BlockContent />
        </DropZoneStyle>
      )}

      {file && file?.type?.split('/')[0] === 'image' && (
        <Box display="flex" justifyContent="center">
          <Image
            alt="file preview"
            src={typeof file === 'string' ? file : file.preview}
            sx={{
              width: '300px',
              height: 'auto',
            }}
          />
        </Box>
      )}

      {file && file?.type?.split('/')[0] === 'application' && (
        <Box display="flex">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: 'rgba(42, 133, 255, 0.05)',
              width: '78px',
            }}
          >
            <Typography
              sx={{
                ml: 0.5,
                mr: 1,
                color: '#2A85FF',
                fontWeight: 700,
                fontSize: '15px',
              }}
            >
              PDF
            </Typography>
          </Box>
          <Box py={3}>
            <Typography
              sx={{ ml: 0.5, mr: 1, fontWeight: 700, fontSize: '15px' }}
            >
              {file?.name}
            </Typography>
          </Box>
        </Box>
      )}

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {helperText && helperText}
    </Box>
  );
}
