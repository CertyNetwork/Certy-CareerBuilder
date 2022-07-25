import { useState } from 'react';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
} from '@mui/material';

interface Props {
  handleNo: Function;
  handleYes: Function;
}

export const DialogConfirm = (props: Props) => {
  const { handleNo, handleYes } = props;
  const [open, setOpen] = useState(false);

  const changeStatus = () => {
    setOpen(true);
    handleYes();
  };
  return (
    <Dialog open>
      <DialogTitle>Are you sure change status?</DialogTitle>
      <Box
        display="flex"
        justifyContent="center"
        columnGap="30px"
        paddingBottom="16px"
      >
        <Button variant="contained" onClick={() => changeStatus()}>
          Yes
        </Button>
        <Button variant="contained" color="error" onClick={() => handleNo()}>
          No
        </Button>
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};
