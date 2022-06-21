/**
 *
 * JobDetail
 *
 */
import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TabContext } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as IconOutSvg } from 'app/assets//button/out_going.svg';
import Page from 'app/components/Page';
import useSettings from 'app/hooks/useSettings';

import { messages } from './messages';

interface Props {}

interface StyledTabProps {
  label: string;
  value: number;
}

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }: any) => ({
  textTransform: 'none',
  minWidth: 0,
  fontWeight: theme.typography.fontWeightMedium,
  '&.Mui-selected': {
    color: theme.palette.text.active,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const JobDetail = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { themeStretch } = useSettings();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page title="Job Detail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Div>
          {t('')}
          {/*  {t(...messages.someThing())}  */}
          <Box display="flex" columnGap="24px" alignItems="center">
            <IconButton aria-label="back">
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, minWidth: 160 }}>
              <Typography variant="h3">
                Head Of User Experience and Design
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ mt: 0.5, color: 'text.secondary' }}
              >
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Snapshot Labs
                </Typography>
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Hanoi
                </Typography>
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  Negotiation
                </Typography>
                <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
                  19 applicants
                </Typography>
              </Stack>
            </Box>
            <Box display="flex" columnGap="12px" alignItems="center">
              <Button variant="contained">Apply For This Position</Button>
              <IconButton aria-label="delete">
                <IconOutSvg fill="currentcolor" />
              </IconButton>
              <IconButton aria-label="delete">
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Box>

          <Box mt={6} sx={{ width: '100%', typography: 'subtitle1' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <AntTab label="Job Detail" value={0} />
                <AntTab label="About Company" value={1} />
                <AntTab label="All Jobs From This Company" value={2} />
              </Tabs>
            </Box>
            {value === 0 && 'aaaa'}
            {value === 1 && 'aaaa'}
            {value === 2 && 'aaaa'}
          </Box>
        </Div>
      </Container>
    </Page>
  );
});

export default JobDetail;

const Div = styled('div')({});
