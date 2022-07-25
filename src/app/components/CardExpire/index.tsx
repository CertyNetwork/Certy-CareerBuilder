// @mui
import { Box, Stack, Typography } from '@mui/material';
import experienceImg from 'app/assets/svg/experienceImg.png';
import moment from 'moment';

import Image from '../Image';

interface Props {
  experience: any;
}

export default function CardExpire(props: Props) {
  const { experience } = props;
  return (
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
          src={experienceImg}
          alt={experience?.companyName}
          sx={{ width: 24, height: 24 }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="h6">{experience?.companyName}</Typography>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ mt: 0.5, color: 'text.secondary' }}
        >
          <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
            {experience?.companyName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ ml: 0.5, mr: 1, textTransform: 'capitalize' }}
          >
            {experience?.employmentType}
          </Typography>
          <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
            {moment(experience?.startDate).format('DD/MM/YYYY')}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
