import { forwardRef } from 'react';

import { Helmet } from 'react-helmet-async';

// @mui
import { Box } from '@mui/material';

interface Props {
  children: any;
  title: string;
  meta?: any;
}

const Page = forwardRef(
  ({ children, title = '', meta, ...other }: Props, ref) => (
    <>
      <Helmet>
        <title>{`${title} | Certy-Career`}</title>
        {meta}
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  ),
);

export default Page;
