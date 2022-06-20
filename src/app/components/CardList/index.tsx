// @mui
import { Card, CardHeader, Stack } from '@mui/material';

import Scrollbar from '../Scrollbar';

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
      <CardHeader title={title} subheader={subheader} />

      {/* <Scrollbar> */}
      <Stack spacing={3} sx={{ p: 3 }}>
        {children}
      </Stack>
      {/* </Scrollbar> */}
    </Card>
  );
}
