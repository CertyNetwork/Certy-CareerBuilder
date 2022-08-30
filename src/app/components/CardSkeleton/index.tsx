// @mui
import { Box, Card, Skeleton, Stack } from '@mui/material';

export default function CardSkeleton() {
  return (
    <Card sx={{ marginBottom: 3 }}>
      <Stack spacing={3} sx={{ p: 3 }}>
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
              backgroundColor: 'background.neutral',
            }}
          >
            <Skeleton variant="circular" width={48} height={48} />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 160 }}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="80%" />
            <Stack
              direction="row"
              alignItems="center"
              sx={{ mt: 0.5, color: 'text.secondary' }}
            >
              {/* <Typography variant="subtitle2" sx={{ ml: 0.5, mr: 1 }}>
                {system}
              </Typography> */}
              {/* <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
                {work_location_city}
              </Typography> */}
              <Skeleton
                animation="wave"
                width="30%"
                style={{ marginBottom: 6 }}
              />
            </Stack>
          </Box>

          {/* <Box>
            <IconButton color="primary" aria-label="add to shopping cart">
              <FavoriteBorderIcon />
            </IconButton>
          </Box> */}
        </Stack>
        <Skeleton animation="wave" height={15} style={{ margin: 1 }} />{' '}
        <Skeleton animation="wave" height={15} style={{ margin: 1 }} />{' '}
        <Skeleton
          animation="wave"
          height={15}
          width="80%"
          style={{ margin: 1 }}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" columnGap={2} alignItems="center">
            <Skeleton
              animation="wave"
              height={15}
              width="200px"
              style={{ margin: 1 }}
            />{' '}
            <Skeleton
              animation="wave"
              height={15}
              width="200px"
              style={{ margin: 1 }}
            />{' '}
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              height={15}
              width="80%"
              style={{ margin: 1 }}
            />
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
