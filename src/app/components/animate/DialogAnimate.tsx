// @mui
import { Box, Dialog, Paper } from '@mui/material';
import { AnimatePresence, m } from 'framer-motion';

import { varFade } from './variants';

interface Props {
  children: any;
  onClose: () => void;
  open: boolean;
  sx?: any;
  variants?: any;
}

export default function DialogAnimate({
  open = false,
  variants,
  onClose,
  children,
  sx,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={open}
          onClose={onClose}
          PaperComponent={props => (
            <Box
              component={m.div}
              {...(variants ||
                varFade({
                  distance: 120,
                  durationIn: 0.32,
                  durationOut: 0.24,
                  easeIn: 'easeInOut',
                }).inUp)}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                onClick={onClose}
                sx={{ width: '100%', height: '100%', position: 'fixed' }}
              />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}
