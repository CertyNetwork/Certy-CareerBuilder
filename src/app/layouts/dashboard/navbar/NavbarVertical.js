import { useEffect } from 'react';
import { useContext } from 'react';

import { useLocation } from 'react-router-dom';

import { Drawer, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { NearContext } from 'app/contexts/NearContext';
import PropTypes from 'prop-types';

import Logo from '../../../components/Logo';
import Scrollbar from '../../../components/Scrollbar.tsx';
import { NavSectionVertical } from '../../../components/nav-section';
import { NAVBAR } from '../../../config';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
import useResponsive from '../../../hooks/useResponsive';
import cssStyles from '../../../utils/cssStyles';
import navConfig from './NavConfig';
import navConfigRecruiter from './NavConfigRecruiter.tsx';
import NavbarAccount from './NavbarAccount';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();
  const token = localStorage.getItem('Near_token_bearer');

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { account } = useContext(NearContext);

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    // onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Logo />
          {/* 
          {isDesktop && !isCollapse && (
            <CollapseButton
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
            />
          )} */}
        </Stack>

        {account && token && <NavbarAccount isCollapse={isCollapse} />}
      </Stack>

      <NavSectionVertical
        navConfig={navConfig}
        navConfigRecruiter={navConfigRecruiter}
        isCollapse={isCollapse}
      />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse
            ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
            : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'dashed',
              bgcolor: 'background.default',
              transition: theme =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: theme => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
