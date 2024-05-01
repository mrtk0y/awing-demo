/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from '@hookform/error-message'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { useState } from 'react'

type Props = {
  control: any
  name: any
  quantity: any
  activeCampaign: number
  position: number
  isCheckedAll: boolean
  addNewSelected: (newAd: number) => void
  listAdSelected: number[]
}

const AdvertisementCard = ({
  control,
  quantity,
  name,
  activeCampaign,
  position,
  addNewSelected,
  listAdSelected,
  isCheckedAll
}: Props) => {
  const { getFieldState } = useFormContext()

  const { remove } = useFieldArray({
    control,
    name: `childCampaign[${activeCampaign}].advertisement`
  })
  return (
    <Box display='flex' gap={2} marginY={2}>
      <Checkbox
        checked={isCheckedAll ? isCheckedAll : listAdSelected.includes(position)}
        onChange={() => {
          addNewSelected(position)
        }}
      ></Checkbox>
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
          console.log('!!position', position)
          remove(position)
        }}
      >
        Delete
      </Button>
    </Box>
  )
}

export default AdvertisementCard
