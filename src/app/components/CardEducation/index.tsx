// @mui
import { Box, Stack, Typography } from '@mui/material';
import educationImg from 'app/assets/svg/educationImg.png';
import moment from 'moment';

import Image from '../Image';

interface Props {
  education: any;
  certificates: any;
}

export default function CardEducation(props: Props) {
  const { education } = props;
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            display: 'flex',
            borderRadius: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#2A85FF',
          }}
        >
          <Image
            src={educationImg}
            alt={education?.school}
            sx={{ width: 24, height: 24 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 160 }}>
          <Typography variant="h6">{education?.school}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: 0.5, color: 'text.secondary' }}
          >
            <Typography variant="subtitle2" sx={{ mr: 1 }}>
              {education?.degree}
            </Typography>
            <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
              {education?.fieldOfStudy}
            </Typography>
            <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
              {moment(education?.startDate).format('DD/MM/YYYY')}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 0.5 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <Box
          dangerouslySetInnerHTML={{
            __html: education?.description,
          }}
        ></Box>
      </Stack>
    </Box>
  );
}
