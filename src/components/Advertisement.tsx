import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  name: string
  label?: string
  number?: number
}

const Advertisement = ({ control, name, label }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextField {...field} value={label} variant="standard" fullWidth margin="dense" />}
    />
  )
}

export default Advertisement
