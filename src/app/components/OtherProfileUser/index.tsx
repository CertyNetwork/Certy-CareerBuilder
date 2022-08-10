// components
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import cssStyles from 'app/utils/cssStyles';

import Image from '../Image';
import SocialsButton from '../SocialsButton';
import SvgIconStyle from '../SvgIconStyle';

const OverlayStyle = styled('div')(({ theme }: any) => ({
  ...cssStyles(theme).bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

interface Props {
  user: any;
  avatar: string;
  bgImg: string;
}

export default function OtherProfileUser(props: Props) {
  const { user, avatar, bgImg } = props;
  const theme = useTheme();

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api-dev.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={'Certy'}
          src={
            avatar
              ? avatar
              : 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg'
          }
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image
          src={
            bgImg
              ? bgImg
              : 'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg'
          }
          alt={'cover'}
          ratio="16/9"
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 6 }}>
        {user?.profile?.info?.displayName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`${user?.profile?.info?.location} | ${user?.profile?.info?.email}`}
      </Typography>

      <Stack alignItems="center">
        <SocialsButton initialColor sx={{ my: 2.5 }} />
      </Stack>
      <Box sx={{ px: 3, textAlign: 'left' }}>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Box>

      <Box sx={{ px: 8, py: 5, textAlign: 'left' }}>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ mb: 0.75, color: 'text.disabled' }}
        >
          About {user?.profile?.info?.displayName}
        </Typography>

        <Box mt={3}>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: theme.typography.fontWeightRegular,
              color: 'text.primary',
            }}
            component="p"
            dangerouslySetInnerHTML={{
              __html: user?.profile?.about,
            }}
          ></Typography>
        </Box>
      </Box>
    </Card>
  );
}
