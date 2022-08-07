// components
import { Avatar, Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import cssStyles from 'app/utils/cssStyles';

import Image from '../Image';
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
  company: any;
  avatar: string;
  bgImg: string;
}

export default function CompanyCard(props: Props) {
  const { company, avatar, bgImg } = props;

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
        {company?.info?.companyName}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          textTransform: 'capitalize',
          marginBottom: '24px',
        }}
      >
        {`${company?.info?.organizationType} | ${company?.info?.location}`}
      </Typography>
    </Card>
  );
}
