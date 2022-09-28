import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Box, Button, Dialog, Typography } from '@mui/material';

interface Props {
  confirmYes: Function;
  confirmNo: Function;
  title: string;
}

const Confirm = (props: Props) => {
  const { confirmYes, confirmNo, title } = props;
  return (
    <Dialog open>
      <Box p={2}>
        <Box display="flex" columnGap={2} alignItems="center">
          <Box
            sx={{
              borderRadius: '50%',
              backgroundColor: '#fdf9c3',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ReportProblemIcon sx={{ color: '#cb8a03' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1">Pending work</Typography>
            <Typography variant="body2">{title}</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" columnGap="20px" pt={2}>
          <Button variant="contained" onClick={() => confirmYes()}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={() => confirmNo()}>
            No
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Confirm;
