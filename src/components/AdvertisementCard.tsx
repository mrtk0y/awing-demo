/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from '@hookform/error-message'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type Props = {
  control: any
  name: any
  quantity: any
  // activeCampaign: number
  position: number
  addNewSelected: (newAd: number) => void
  // listAdSelected: string[]
  // adId: number
  // onSelect: () => void
  check: string
}

const AdvertisementCard = ({ control, quantity, name, check }: Props) => {
  const { getFieldState } = useFormContext()

  // const { remove } = useFieldArray({
  //   control,
  //   name: `childCampaign[${activeCampaign}].advertisement`
  // })

  return (
    <Box display='flex' gap={2} marginY={2}>
      <Controller
        name={check}
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
            // checked={listAdSelected.includes(adId)
            checked={field.value}
            onChange={(e) => {
              console.log('checkb box change', e.target.checked, field)
              field.onChange(e.target.checked)
            }}
          ></Checkbox>
        )}
      />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box flexGrow={1}>
            <TextField
              {...field}
              variant='standard'
              fullWidth
              margin='dense'
              error={!!getFieldState(name).error?.message}
            />
            <ErrorMessage
              name={name}
              render={({ message }) => (
                <Typography fontSize={14} color='red'>
                  {message}
                </Typography>
              )}
            />
          </Box>
        )}
      />
      <Controller
        name={quantity}
        control={control}
        render={({ field }) => (
          <Box flexGrow={1}>
            <TextField
              {...field}
              variant='standard'
              fullWidth
              margin='dense'
              onChange={(event) => field.onChange(+event.target.value)}
              type='number'
              error={!!getFieldState(quantity).error?.message}
            />
            <ErrorMessage
              name={quantity}
              render={({ message }) => (
                <Typography fontSize={14} color='red'>
                  {message}
                </Typography>
              )}
            />
          </Box>
        )}
      />
      <Button
        color='error'
        variant='contained'
        onClick={() => {
          // remove(position)
        }}
      >
        Delete
      </Button>
    </Box>
  )
}

export default AdvertisementCard
