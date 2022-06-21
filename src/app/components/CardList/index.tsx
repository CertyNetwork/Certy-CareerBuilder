// @mui
import { Box, Card, Stack } from '@mui/material';

import { LabelStyle } from '../LabelStyle';

// import Scrollbar from '../Scrollbar';

interface Props {
  title?: string;
  subheader?: string;
  list?: any;
  children: any;
}

export default function CardList({
  title,
  subheader,
  list,
  children,
  ...other
}: Props) {
  return (
    <Card>
      <Box px={8} py={4}>
        <Box mb={3}>
          <LabelStyle>{title}</LabelStyle>
        </Box>
        {/* <Scrollbar> */}
        <Stack spacing={3}>{children}</Stack>
        {/* </Scrollbar> */}
      </Box>
    </Card>
  );
}
