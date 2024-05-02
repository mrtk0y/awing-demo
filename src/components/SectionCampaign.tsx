import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { SectionAdvertisement } from './SectionAdvertisement.tsx'
import { CampainWatch } from './CampainWatch.tsx'
import { useState } from 'react'

export const SectionCampaign = () => {
  const { control } = useFormContext()
  const [activeCampaignIndex, setActiveCampaignIndex] = useState(0)

  const { append, fields: childCampaignFields } = useFieldArray({
    control,
    name: `childCampaign`
  })

  const addNewCampaign = () => {
    const lastCampaign = childCampaignFields[childCampaignFields.length - 1]

    const lastCampaignId = lastCampaign?.campaignId || 0
    const nextCampaignId = Number(lastCampaignId) + 1

    append({
      name: 'Chiến dịch ' + nextCampaignId,
      isActive: true,
      campaignId: nextCampaignId,
      advertisement: [
        {
          adsId: 1,
          quantity: 0,
          name: 'Quảng cáo ' + 1
        }
      ]
    })
  }

  return (
    <Box>
      <Box>
        <Button onClick={addNewCampaign} variant='contained'>
          Thêm chiến dịch
        </Button>
        <Box
          display='flex'
          gap={2}
          sx={{
            overflow: 'auto hidden',
            paddingRight: 1
          }}
          width={'100%'}
        >
          {childCampaignFields?.map((campaign, campaignIndex: number) => {
            return (
              <CampainWatch
                key={campaign.campaignId}
                isSelectedCampaign={campaignIndex === activeCampaignIndex}
                onClick={() => {
                  setActiveCampaignIndex(campaignIndex)
                }}
                campaignIndex={campaignIndex}
              />
            )
          })}
        </Box>
      </Box>
      <Box>
        {childCampaignFields?.map((campaignField, campaignIndex: number) => {
          if (campaignIndex !== activeCampaignIndex) return null

          return (
            <Box key={campaignField.id} display='flex'>
              <Controller
                name={`childCampaign.${campaignIndex}.name`}
                control={control}
                render={({ field }) => (
                  <Box flexGrow={1}>
                    <TextField
                      {...field}
                      variant='standard'
                      fullWidth
                      margin='dense'
                      // error={!!getFieldState(`childCampaign[${campaignIndex}].name`).error?.message}
                    />
                    <ErrorMessage
                      name={`childCampaign[${campaignIndex}].name`}
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
                name={`childCampaign.${campaignIndex}.isActive`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel {...field} control={<Checkbox checked={field.value} />} label='Đang hoạt động' />
                )}
              />
            </Box>
          )
        })}
        <Box marginTop={2} display='flex' alignItems={'center'} gap={1}>
          <Typography textTransform='uppercase' fontSize={22}>
            danh sách quảng cáo
          </Typography>
        </Box>
        <Box marginY={2}>
          {childCampaignFields.map((campaign, campaignIndex: number) => {
            return (
              <Box key={campaign.id} display={campaignIndex !== activeCampaignIndex ? 'none' : 'block'}>
                <SectionAdvertisement campaignIndex={campaignIndex} />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
