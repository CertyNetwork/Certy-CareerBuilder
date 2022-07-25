import { useContext } from 'react';

import { Avatar, Box, Link, Skeleton, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { NearContext } from 'app/contexts/NearContext';
import { useProfileAvatar } from 'app/hooks/Profile/useProfile';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const { account } = useContext(NearContext);
  const { dataProfileAvatar, loadingDataProfileAvatar } = useProfileAvatar();

  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        {loadingDataProfileAvatar ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar src={dataProfileAvatar?.src} alt={account} />
        )}

        <Box
          sx={{
            ml: 2,
            transition: theme =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {account}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            user
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
