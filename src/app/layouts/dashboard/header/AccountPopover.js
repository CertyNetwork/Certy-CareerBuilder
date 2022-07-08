// components
import { useContext, useState } from 'react';

import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import Switch from '@mui/material/Switch';
// @mui
import { alpha } from '@mui/material/styles';
import { NearContext } from 'app/contexts/NearContext';
import { storage } from 'utils/util';

import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import useSettings from '../../../hooks/useSettings';

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { themeMode, onToggleMode } = useSettings();

  const { wallet, account, dispatchReset } = useContext(NearContext);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    wallet.signOut();
    storage.clear('Near_token_bearer');
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
        <Avatar
          src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
          alt={account}
        />
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
          <Typography variant="subtitle2" noWrap>
            {account}
          </Typography>
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
              <Switch
                checked={themeMode === 'light' ? true : false}
                onChange={onToggleMode}
              />
            </Box>
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem>
            <Typography component="p">Edit Individiual Profile</Typography>
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem>
            <Typography component="p">Edit Company Profile</Typography>
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
