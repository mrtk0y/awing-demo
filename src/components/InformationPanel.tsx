import { Box, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { TFormData } from '../App'

const InformationPanel = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<TFormData>()
  return (
    <Box>
      <Controller
        name='campaign.information.name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Tên chiến dịch'
            variant='standard'
            required
            fullWidth
            margin='dense'
            error={!!errors.campaign?.information?.name}
            helperText={errors.campaign?.information?.name?.message}
          />
        )}
      />

      <Controller
        name='campaign.information.describe'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Mô tả'
            variant='standard'
            fullWidth
            margin='dense'
            error={!!errors.campaign?.information?.describe}
            helperText={errors.campaign?.information?.describe?.message}
          />
        )}
      />
    </Box>
  )
}

export default InformationPanel
