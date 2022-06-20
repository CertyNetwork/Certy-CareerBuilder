// @mui
import { Box } from '@mui/material';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

//
import { varContainer } from '.';
// hooks
import useResponsive from '../../hooks/useResponsive';

//

// ----------------------------------------------------------------------

MotionViewport.propTypes = {
  children: PropTypes.node.isRequired,
  disableAnimatedMobile: PropTypes.bool,
};

export default function MotionViewport({
  children,
  disableAnimatedMobile = true,
  ...other
}) {
  const isDesktop = useResponsive('up', 'sm');

  if (!isDesktop && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>;
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
