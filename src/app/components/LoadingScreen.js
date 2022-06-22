import { Box } from '@mui/material';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  isDashboard: PropTypes.bool,
};

export default function LoadingScreen({ isDashboard, ...other }) {
  return (
    <>
      <ProgressBar />

      {!isDashboard && (
        <RootStyle {...other}>
          <m.div
            animate={{
              scale: [1, 0.9, 0.9, 1, 1],
              opacity: [1, 0.48, 0.48, 1, 1],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_531_505)">
                <path
                  d="M16.1764 12.3524L20.9389 17.1149H27.0589V17.113H27.057L23.9989 14.0549L19.2373 9.29242C19.2232 9.27836 19.2101 9.26523 19.1961 9.25211L19.1539 9.21086C17.4307 7.57305 14.7242 7.55523 12.9795 9.15742L16.1661 12.344C16.1661 12.344 16.1736 12.3496 16.1764 12.3524Z"
                  fill="#2A85FF"
                />
                <path
                  d="M4.38387 24.1454C4.30699 24.0685 4.30699 23.9438 4.38387 23.867L15.1576 13.0941L12.0967 10.0332L1.32293 20.807C-0.440508 22.5713 -0.441445 25.442 1.32293 27.2063L12.1042 37.9866L15.1642 34.9257L4.38387 24.1454Z"
                  fill="#2A85FF"
                />
                <path
                  d="M35.0161 9.15471C33.2432 7.52908 30.4786 7.57502 28.7611 9.29252L24.8779 13.1756L27.937 16.2347L35.0161 9.15471Z"
                  fill="#2A85FF"
                />
                <path
                  d="M46.6745 20.8068L35.8979 10.0303L32.8379 13.0903L43.6145 23.8668C43.652 23.9053 43.6716 23.9521 43.6716 24.0065C43.6716 24.0609 43.652 24.1068 43.6135 24.1453L32.8388 34.92L35.8998 37.9809L46.6745 27.2062C47.5295 26.3512 48.0001 25.215 48.0001 24.0065C48.0001 22.7981 47.5295 21.6609 46.6745 20.8068Z"
                  fill="#2A85FF"
                />
                <path
                  d="M24.8789 34.8383L28.7611 38.7205C29.6152 39.5755 30.7523 40.0461 31.9608 40.0461C33.1036 40.0461 34.1808 39.6252 35.018 38.8564L27.9398 31.7783L24.8789 34.8383Z"
                  fill="#2A85FF"
                />
                <path
                  d="M25.606 30.914V30.9055H20.9438L12.9863 38.8621C13.8216 39.6271 14.897 40.0461 16.0379 40.0461C17.2463 40.0461 18.3826 39.5755 19.2376 38.7205L23.9991 33.959H24.0001L27.0451 30.914H25.606Z"
                  fill="#2A85FF"
                />
                <path
                  d="M22.1403 20.7861L20.2803 24.0074L22.1403 27.2286H25.8603L27.7203 24.0074L25.8603 20.7861H22.1403Z"
                  fill="#2A85FF"
                />
              </g>
              <defs>
                <clipPath id="clip0_531_505">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </m.div>

          <Box
            component={m.div}
            animate={{
              scale: [1.2, 1, 1, 1.2, 1.2],
              rotate: [270, 0, 0, 270, 270],
              opacity: [0.25, 1, 1, 1, 0.25],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '25%',
              position: 'absolute',
              border: theme =>
                `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
            }}
          />

          <Box
            component={m.div}
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 270, 270, 0, 0],
              opacity: [1, 0.25, 0.25, 0.25, 1],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{
              ease: 'linear',
              duration: 3.2,
              repeat: Infinity,
            }}
            sx={{
              width: 120,
              height: 120,
              borderRadius: '25%',
              position: 'absolute',
              border: theme =>
                `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
            }}
          />
        </RootStyle>
      )}
    </>
  );
}
