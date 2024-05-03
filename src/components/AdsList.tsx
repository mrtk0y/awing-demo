import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Checkbox, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { TFormData } from '../App.tsx'

export const AdsList = ({ campaignIndex }: { campaignIndex: number }) => {
  const { control } = useFormContext<TFormData>()
  const {
    fields: childAdsFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: `campaign.subCampaigns.${campaignIndex}.ads`
  })

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const addNewAd = () => {
    append({
      quantity: 0,
      name: 'Quảng cảo ' + (childAdsFields.length + 1)
    })
  }

  const onCheckChange = (rowId: string, checked: boolean) => {
    setSelectedKeys((state) => (checked ? [...state, rowId] : state.filter((key) => key !== rowId)))
  }

  const onCheckedAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(childAdsFields.map((field) => field.id))
    } else {
      setSelectedKeys([])
    }
  }

  const onDeleteRow = (rowId: string, position: number) => {
    setSelectedKeys((state) => state.filter((key) => key !== rowId))
    remove(position)
  }

  const {
    getValues,
    formState: { errors }
  } = useFormContext<TFormData>()

  const selectionState = useMemo(() => {
    let isIntermediate = false
    let isSelectedAll = false

    const adsList = getValues(`campaign.subCampaigns.${campaignIndex}.ads`)
    if (adsList.length === selectedKeys.length && selectedKeys.length > 0) isSelectedAll = true
    if (!isSelectedAll && selectedKeys.length > 0) isIntermediate = true

    return {
      isIntermediate,
      isSelectedAll
    }
  }, [selectedKeys])

  const onDeleteMultipleRow = () => {
    const rowIndexes = selectedKeys.map((key) => childAdsFields.findIndex((field) => field.id === key))
    remove(rowIndexes)
    setSelectedKeys([])
  }

  return (
    <Box>
      {/* HEADER */}
      <Grid container spacing={2} paddingY={1} borderBottom={'1px solid #e0e0e0'} overflow={'hidden'}>
        <Grid item xs={1}>
          <Checkbox
            indeterminate={selectionState.isIntermediate}
            checked={selectionState.isSelectedAll}
            onChange={(_e, checked) => {
              onCheckedAll(checked)
            }}
          ></Checkbox>
        </Grid>
        {selectedKeys.length ? (
          <Grid item xs={9}>
            <IconButton onClick={() => onDeleteMultipleRow()}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid item xs={4} display={'flex'} alignItems={'center'}>
              <Typography flexGrow={1}>Tên quảng cáo * </Typography>
            </Grid>
            <Grid item xs={5} display={'flex'} alignItems={'center'}>
              <Typography flexGrow={1}>Số lượng * </Typography>
            </Grid>
          </React.Fragment>
        )}
        <Grid item xs={2} display={'flex'} justifyContent={'end'}>
          <Button onClick={addNewAd} variant='outlined' startIcon={<AddIcon />}>
            Thêm
          </Button>
        </Grid>
      </Grid>

      {/* LIST ADVERTISEMENT */}
      {childAdsFields?.map((adsField, adIndex: number) => (
        <Grid
          container
          spacing={2}
          paddingY={1}
          borderBottom={'1px solid #e0e0e0'}
          overflow={'hidden'}
          key={adsField.id}
        >
          <Grid item xs={1}>
            <Checkbox
              checked={selectedKeys.includes(adsField.id)}
              onChange={(_e, checked) => onCheckChange(adsField.id, checked)}
            ></Checkbox>
          </Grid>
          <Grid item xs={4}>
            <Controller
              name={`campaign.subCampaigns.${campaignIndex}.ads.${adIndex}.name`}
              control={control}
              render={({ field }) => (
                <Box flexGrow={1}>
                  <TextField
                    {...field}
                    variant='standard'
                    fullWidth
                    margin='dense'
                    error={!!errors.campaign?.subCampaigns?.[campaignIndex]?.ads?.[adIndex]?.name?.message}
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={5}>
            <Controller
              name={`campaign.subCampaigns.${campaignIndex}.ads.${adIndex}.quantity`}
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
                    error={!!errors?.campaign?.subCampaigns?.[campaignIndex]?.ads?.[adIndex]?.quantity?.message}
                  />
                </Box>
              )}
            />
          </Grid>
          <Grid item xs={2} display={'flex'} justifyContent={'end'} alignItems={'start'}>
            <IconButton aria-label='delete' onClick={() => onDeleteRow(adsField.id, adIndex)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}
