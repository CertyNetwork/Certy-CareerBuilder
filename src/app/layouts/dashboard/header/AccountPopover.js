// components
import { useContext, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Switch from '@mui/material/Switch';
// @mui
import { alpha } from '@mui/material/styles';
import { NearContext } from 'app/contexts/NearContext';
import { useProfileAvatar } from 'app/hooks/Profile/useProfile';

import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import useSettings from '../../../hooks/useSettings';

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { recruiterMode, onRecruiterMode } = useSettings();

  const { wallet, account, dispatchReset } = useContext(NearContext);

  const { dataProfileAvatar, loadingDataProfileAvatar } = useProfileAvatar();

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    wallet.signOut();
    localStorage.removeItem('Near_token_bearer');
    localStorage.removeItem('REFRESH_TOKEN');
    dispatchReset();
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: theme => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {loadingDataProfileAvatar ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <Avatar src={dataProfileAvatar?.src} alt={account} />
        )}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Link to={`/profile/${account}`}>
            <Typography variant="subtitle2" noWrap>
              {account}
            </Typography>
          </Link>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="p">Recruiter Mode</Typography>
              <Switch checked={recruiterMode} onChange={onRecruiterMode} />
            </Box>
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem>
            <a
              href={`https://certy-profile-app.vercel.app/accounts/${account}`}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                color: 'unset',
              }}
            >
              <Typography component="p">Edit Profile</Typography>
            </a>
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={handleLogout}>
            <Typography component="p">Logout</Typography>
          </MenuItem>
        </Stack>
      </MenuPopover>
    </>
  );
}
