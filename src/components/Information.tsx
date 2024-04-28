

import { Box, TextField, Typography } from '@mui/material'
import { Controller, FieldErrors } from 'react-hook-form'
import { Fragment } from 'react/jsx-runtime'
import { ErrorMessage } from "@hookform/error-message"
import { TFormData } from '../App'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  errors: FieldErrors<TFormData>
}

const Information = ({ control, errors }: Props) => {

  return (
    <Box>
      <Controller name="name"
        control={control}
        rules={{ required: 'Tên chiến dịch không được để trống' }}
        render={({ field }) => {
          return <Fragment>
            <TextField
              {...field} label="Tên chiến dịch" variant="standard" required fullWidth margin="dense"
              error={!!errors.name}
            />
            <ErrorMessage errors={errors} name='name'
              render={({ message }) =>
                <Typography fontSize={14} color='red'>
                  {message}
                </Typography>
              } />
          </Fragment>
        }
        }
      />

      <Controller name="description"
        control={control}
        render={({ field }) => <TextField {...field} label="Mô tả" variant="standard" fullWidth margin="dense" />}
      />
    </Box >
  )
}

export default Information
