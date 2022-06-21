import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.disabled,
  marginBottom: theme.spacing(1),
}));
