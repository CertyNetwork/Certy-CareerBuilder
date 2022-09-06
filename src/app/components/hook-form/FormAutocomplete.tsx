import { useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Autocomplete } from '@mui/lab';
import { Chip, TextField } from '@mui/material';

interface Props {
  name: string;
  data: any;
  defaultValue: any;
}

export default function RHFAutocomplete(props: Props) {
  const { control } = useFormContext();
  const { name, data, defaultValue } = props;
  const [limit, setLimit] = useState(0);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          id="tags-outlined"
          freeSolo
          size="small"
          disabled={limit === 5}
          defaultValue={defaultValue}
          options={
            data && data?.jobSpecialities.length > 0
              ? data.jobSpecialities.map((option: any) => option?.value)
              : []
          }
          renderTags={(value: any, getTagProps) =>
            value.map((option: any, index: number) => (
              <Chip
                variant="outlined"
                label={typeof option === 'string' ? option : option?.value}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Skills"
              error={!!error}
              helperText={error?.message}
            />
          )}
          onChange={(event, data) => {
            if (data.length > 5) {
              return false;
            }

            setLimit(data.length);
            onChange(data);
            return data;
          }}
        />
      )}
    />
  );
}
