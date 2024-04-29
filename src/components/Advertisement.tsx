/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from '@hookform/error-message'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  control: any
  name: any
  quantity: any
}

const Advertisement = ({ control, quantity, name }: Props) => {
  const { getFieldState } = useFormContext();

  return (
    <Box display="flex" gap={2} marginY={2}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Box flexGrow={1}>
          <TextField {...field} variant="standard" fullWidth margin="dense"
            error={!!getFieldState(name).error?.message}
          />
          <ErrorMessage name={name}
            render={({ message }) =>
              <Typography fontSize={14} color='red'>
                {message}
              </Typography>
            } />
        </Box>}
      />
      <Controller
        name={quantity}
        control={control}

        render={({ field, }) => <Box flexGrow={1}>
          <TextField {...field} variant="standard" fullWidth margin="dense"
            onChange={(event) => field.onChange(+event.target.value)}
            type="number"
            error={!!getFieldState(quantity).error?.message}
          />
          <ErrorMessage name={quantity}
            render={({ message }) =>
              <Typography fontSize={14} color='red'>
                {message}
              </Typography>
            } />
        </Box>}
      />
      <Button color="error" variant="contained" >
        Delete
      </Button>
    </Box >
  )
}

export default Advertisement
