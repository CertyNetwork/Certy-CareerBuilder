// icons
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

interface Props {
  icon: any;
  sx?: any;
  width?: number;
  height?: number;
}

export default function Iconify({ icon, sx, ...other }: Props) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
