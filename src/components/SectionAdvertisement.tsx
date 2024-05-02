import { Box, Button, Checkbox, Divider, Typography } from '@mui/material'
import AdvertisementCard from './AdvertisementCard.tsx'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'

export const SectionAdvertisement = ({ campaignIndex }: { campaignIndex: number }) => {
  const { control, getValues, setValue, watch } = useFormContext()
  const { fields: childAdsFields } = useFieldArray({
    control,
    name: `childCampaign.${campaignIndex}.advertisement`,
    keyName: '_id'
  })

  const hehe = watch(`childCampaign.${campaignIndex}`)

  console.log('hehe', hehe)

  const addNewAd = () => {}

  return (
    <>
      <Box display='flex' gap={2}>
        <Controller
          name={`childCampaign[${campaignIndex}].checked`}
          control={control}
          render={({ field }) => {
            return (
              <Checkbox
                indeterminate={getValues(`childCampaign[${campaignIndex}].intermediate`)}
                checked={field.value}
                onChange={(_e, checked) => {
                  field.onChange(checked)
                  setValue(`childCampaign.${campaignIndex}.intermediate`, false)
                  setValue(
                    `childCampaign.${campaignIndex}.advertisement`,
                    childAdsFields.map((ad) => ({ ...ad, checked: checked }))
                  )
                }}
              ></Checkbox>
            )
          }}
        />

        <Box flexGrow={1}>
          {/*{isIntermediate || isCheckedAll*/}
          {true ? (
            <Button
              variant='contained'
              color='error'
              onClick={() => {
                // selectionStatus.isSelecting ? deleteSelected() : deleteAllAdv()
              }}
            >
              Xóa
            </Button>
          ) : (
            <Box display='flex'>
              <Typography flexGrow={1}>Tên quảng cáo * </Typography>
              <Typography flexGrow={1}>Số lượng * </Typography>
            </Box>
          )}
        </Box>

        <Button onClick={addNewAd} variant='contained'>
          Thêm
        </Button>
      </Box>
      <Divider />
      <Box>
        {childAdsFields?.map((adsField, adIndex: number) => {
          return (
            <Box key={adsField._id}>
              <AdvertisementCard
                // addNewSelected={addNewAd}
                position={adIndex}
                control={control}
                name={`childCampaign[${campaignIndex}].advertisement[${adIndex}].name`}
                quantity={`childCampaign[${campaignIndex}].advertisement[${adIndex}].quantity`}
                check={`childCampaign[${campaignIndex}].advertisement[${adIndex}].checked`}
              />
            </Box>
          )
        })}
      </Box>
    </>
  )
}
