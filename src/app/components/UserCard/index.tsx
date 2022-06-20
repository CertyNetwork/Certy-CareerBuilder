import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import cssStyles from 'app/utils/cssStyles';

// components
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
  user?: any;
}

export default function UserCard({ user }: Props) {
  //   const { name, cover, position, follower, totalPost, avatarUrl, following } =
  //     user;

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
            'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg'
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
            'https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_1.jpg'
          }
          alt={'cover'}
          ratio="16/9"
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {'test'}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {'position'}
      </Typography>

      <Stack alignItems="center">
        <SocialsButton initialColor sx={{ my: 2.5 }} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 3, textAlign: 'left' }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ mb: 0.75, color: 'text.disabled' }}
        >
          About Tim
        </Typography>

        <Typography variant="subtitle1" component="p">
          MBA at Harvard Business School. Building Technology product with
          experience in product management and business strategy.
        </Typography>
        <ul style={{ paddingLeft: 15 }}>
          <li>
            Start up (E-commerce, SaaS, Education), Consulting (BCG), Launching
            ventures (BCG Digital Ventures), Product Management (B2B & B2C)
          </li>
          <li>
            Worked and lived across 3 continents (North America, Europe, Asia){' '}
          </li>
          <li>
            Bachelor degree in Economics (Math and Psychology minor), graduated
            Summa Cum Laude with Distinction honor
          </li>
        </ul>
      </Box>
    </Card>
  );
}
