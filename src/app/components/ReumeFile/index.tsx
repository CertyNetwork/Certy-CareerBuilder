import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  Card,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

interface Props {
  name: any;
  options: any;
}

export default function ResumeFile({ name, options }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row>
            {options.map(option => (
              <Card key={option.value} sx={{ margin: '5px 0', width: '100%' }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  key={option.value}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      backgroundColor: 'rgba(42, 133, 255, 0.05)',
                      width: '78px',
                    }}
                  >
                    <Typography
                      sx={{
                        ml: 0.5,
                        mr: 1,
                        color: '#2A85FF',
                        fontWeight: 700,
                        fontSize: '15px',
                      }}
                    >
                      PDF
                    </Typography>
                  </Box>
                  <Box py={3} px={2}>
                    <Typography
                      sx={{ ml: 0.5, mr: 1, fontWeight: 700, fontSize: '15px' }}
                    >
                      Resume_Tu-Nguyen-Anh_UX-UI-designer
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ mt: 0.5, color: 'text.secondary' }}
                    >
                      <Typography variant="body2" sx={{ ml: 0.5, mr: 1 }}>
                        Hanoi
                      </Typography>
                    </Stack>
                  </Box>
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label=""
                  />
                </Box>
              </Card>
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
