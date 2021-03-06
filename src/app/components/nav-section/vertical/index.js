import { Box, List, ListSubheader } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import useSettings from 'app/hooks/useSettings';
import PropTypes from 'prop-types';

//
import { NavListRoot } from './NavList';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled(props => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.textSecondary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
  navConfigRecruiter: PropTypes.array,
};

export default function NavSectionVertical({
  navConfig,
  navConfigRecruiter,
  isCollapse = false,
  ...other
}) {
  const { recruiterMode } = useSettings();
  return (
    <Box {...other}>
      {navConfig.map(group => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {group.subheader}
          </ListSubheaderStyle>
          {group.items.map(list => (
            <NavListRoot
              key={list.title + list.path}
              list={list}
              isCollapse={isCollapse}
            />
          ))}
        </List>
      ))}

      {recruiterMode &&
        navConfigRecruiter.map(group => (
          <List key={group.subheader} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle
              sx={{
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {group.subheader}
            </ListSubheaderStyle>
            {group.items.map(list => (
              <NavListRoot
                key={list.title + list.path}
                list={list}
                isCollapse={isCollapse}
              />
            ))}
          </List>
        ))}
    </Box>
  );
}
