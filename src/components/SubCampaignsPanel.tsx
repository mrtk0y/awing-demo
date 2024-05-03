import { Box, Button, Checkbox, FormControlLabel, IconButton, TextField, Typography } from '@mui/material'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { AdsList } from './AdsList.tsx'
import { CampaignWatch } from './CampainWatch.tsx'
import { useState } from 'react'
import { TFormData } from '../App.tsx'
import { Add } from '@mui/icons-material'

export const SubCampaignsPanel = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<TFormData>()
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0)

  const { append, fields: subCampaignFields } = useFieldArray({
    control,
    name: `campaign.subCampaigns`
  })

  const addNewSubCampaign = () => {
    const nextIndex = subCampaignFields.length + 1

    append({
      name: 'Chiến dịch con ' + nextIndex,
      status: true,
      ads: [
        {
          name: 'Quảng cáo ' + 1,
          quantity: 0
        }
      ]
    })
  }

  return (
    <Box>
      <Box mb={2}>
        <Box
          display='flex'
          gap={2}
          sx={{ overflow: 'auto hidden', pr: 1 }}
          alignItems={'start'}
          width={'100%'}
          paddingY={1}
        >
          <IconButton onClick={addNewSubCampaign} sx={{ background: '#e0e0e0', color: 'red' }} size='large'>
            <Add />
          </IconButton>
          {subCampaignFields?.map((campaign, campaignIndex: number) => (
            <CampaignWatch
              key={campaign.id}
              isSelectedCampaign={campaignIndex === activeCampaignIndex}
              onClick={() => setActiveCampaignIndex(campaignIndex)}
              campaignIndex={campaignIndex}
            />
          ))}
        </Box>
      </Box>

      {subCampaignFields?.map((campaignField, campaignIndex: number) => {
        if (campaignIndex !== activeCampaignIndex) return null
        return (
          <Box key={campaignField.id}>
            <Box display='flex' gap={3}>
              <Controller
                name={`campaign.subCampaigns.${campaignIndex}.name`}
                control={control}
                render={({ field }) => (
                  <Box flexGrow={1}>
                    <TextField
                      {...field}
                      variant='standard'
                      fullWidth
                      label='Tên chiến dịch con'
                      margin='dense'
                      required
                      error={!!errors.campaign?.subCampaigns?.[campaignIndex]?.name}
                      helperText={errors.campaign?.subCampaigns?.[campaignIndex]?.name?.message}
                    />
                  </Box>
                )}
              />
              <Controller
                name={`campaign.subCampaigns.${campaignIndex}.status`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel {...field} control={<Checkbox checked={field.value} />} label='Đang hoạt động' />
                )}
              />
            </Box>
            <Typography textTransform='uppercase' fontSize={22} marginTop={2}>
              Danh sách quảng cáo
            </Typography>
            <Box marginY={2}>
              <AdsList campaignIndex={campaignIndex} />
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
