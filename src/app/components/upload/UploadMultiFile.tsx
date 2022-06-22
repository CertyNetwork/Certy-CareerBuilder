import { useDropzone } from 'react-dropzone';

import { Box, Button, Stack } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';

import BlockContent from './BlockContent';
import MultiFilePreview from './MultiFilePreview';
import RejectionFiles from './RejectionFiles';

const DropZoneStyle = styled('div')(({ theme }: any) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

interface Props {
  files: any;
  error: any;
  showPreview?: any;
  onUpload?: any;
  onRemove?: any;
  onRemoveAll?: any;
  helperText: any;
  sx?: any;
  accept: any;
}

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  accept,
}: Props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      <MultiFilePreview
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
      />

      {files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )}

      {helperText && helperText}
    </Box>
  );
}
