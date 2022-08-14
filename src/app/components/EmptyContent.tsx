// @mui
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { NoDataSvg } from './Svg/NoData';

// import { EmtypIcon as ReactComponent } from 'app/assets/illustration_empty_content.svg';

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

interface Props {
  title: string;
  img?: string;
  description?: string;
  sx?: any;
}

export default function EmptyContent(props: Props) {
  const { title, description, img, sx } = props;
  return (
    <RootStyle sx={{ ...sx } || {}}>
      <NoDataSvg />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
