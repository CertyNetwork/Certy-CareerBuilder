/* eslint-disable prettier/prettier */
import { useContext, useState } from 'react';

import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { DialogAnimate } from 'app/components/animate';
import { NearContext } from 'app/contexts/NearContext';
import PropTypes from 'prop-types';

import Iconify from '../../../components/Iconify';
import Logo from '../../../components/Logo';
import { IconButtonAnimate } from '../../../components/animate';
import { HEADER, NAVBAR } from '../../../config';
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
import { PostJob } from '../../../pages/PostJob';
import cssStyles from '../../../utils/cssStyles';
import AccountPopover from './AccountPopover';
import OurProductsPopover from './OurProductsPopover';

const RootStyle = styled(AppBar, {
  shouldForwardProp: prop =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),

  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');
  const [openDialogPostJob, setOpenDialogPostJob] = useState(false);

  const { wallet, account } = useContext(NearContext);

  const handleClick = async () => {
    wallet.requestSignIn(
      'cecareer.certynetwork.testnet', // contract requesting access
      'Certify',
    );
  };

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          {/* <ContactsPopover /> */}
          <OurProductsPopover />
          {account ? (
            <>
              <AccountPopover infoAccount={account} />
              <Button
                variant="contained"
                sx={{ alignSelf: 'flex-end', maxWidth: 'max-content' }}
                onClick={() => setOpenDialogPostJob(true)}
              >
                Post a Job
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{ alignSelf: 'flex-end', maxWidth: 'max-content' }}
              onClick={handleClick}
            >
              Login with NEAR
            </Button>
          )}
        </Stack>

        <DialogAnimate open={openDialogPostJob}>
          <PostJob close={() => setOpenDialogPostJob(false)} />
        </DialogAnimate>
      </Toolbar>
    </RootStyle>
  );
}
