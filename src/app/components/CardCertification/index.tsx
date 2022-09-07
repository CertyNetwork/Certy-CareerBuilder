// @mui
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Image from '../Image';

interface Props {
  dataCert: any;
}

export default function CardCertification(props: Props) {
  const { dataCert } = props;
  const theme: any = useTheme();

  return (
    <Box
      py={2}
      px={3}
      sx={{
        backgroundColor: theme.palette.background.certificate,
        borderRadius: '12px',
        width: '100%',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 64,
            height: 64,
            flexShrink: 0,
            display: 'flex',
            borderRadius: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.neutral',
          }}
        >
          <Image src={dataCert?.media} alt={dataCert?.title} />
        </Box>

        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <Typography variant="subtitle1">{dataCert?.title}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: 0.5, color: 'text.secondary' }}
          >
            <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
              {dataCert?.title}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
