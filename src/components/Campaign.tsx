import { Box, Button, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import Advertisement from "./Advertisement";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any
  //TODO: fix any type
}

const Campaign = ({ control, watch }: Props) => {
  const { append } = useFieldArray({
    control,
    name: `childCampaign`
  });

  const [activeCampaign, setActiveCampaign] = useState(0)

  const { childCampaign } = watch()

  const nextNumberOfChildCampaign = ` ${Number(childCampaign.length) + 1}`

  return (
    <Fragment>
      <Button onClick={() => {
        append({
          name: "Chiến dịch" + nextNumberOfChildCampaign,
          advertisement: [{
            id: 1,
            title: 'ad' + nextNumberOfChildCampaign,
            number: 0,
            label: "Quảng cáo" + nextNumberOfChildCampaign,
          }]
        })
      }}
        variant="contained">
        Add
      </Button>
      <Box display="flex" gap={2}>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          childCampaign?.map((campaign: any, index: any) => {
            return (
              <Box
                key={campaign.id}
                boxShadow={2}
                padding={2}
                marginY={2}
                sx={{
                  '&:hover': {
                    boxShadow: 4,
                    cursor: 'pointer'
                  },
                }}
                borderRadius={1}
                border={2}
                borderColor={activeCampaign === index ? 'rgb(33, 150, 243)' : 'white'}
                onClick={() => setActiveCampaign(index)}
              >
                {campaign?.name}
              </Box>)
          })
        }
      </Box>
      <Box>
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          childCampaign?.map((campaign: any, index: any) => {
            if (activeCampaign === index) {
              return <Box key={campaign.id}>
                <Controller name={`childCampaign[${activeCampaign}].name`}
                  control={control}
                  render={({ field }) => <TextField {...field} label="Tên Campaign" variant="standard" fullWidth margin="dense" />}
                />
              </Box>
            }
          })
        }

        <Box marginTop={2}>
          <Typography textTransform="uppercase" fontSize={22}>
            danh sách quảng cáo
          </Typography>
        </Box>

        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          childCampaign?.map((campaign: any, index: any) => {
            if (activeCampaign === index) {
              return <Box key={campaign.id}>
                {campaign.advertisement.map((ad, adIndex) => <Box key={ad.id} >
                  <Advertisement control={control} name={`campaign[${campaign.id}].advertisement[${adIndex}].label`} label={ad.label} />
                </Box>)}
              </Box>
            }
          })
        }


      </Box>

    </Fragment>
  )
}

export default Campaign
