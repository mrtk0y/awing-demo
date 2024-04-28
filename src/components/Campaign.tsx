import { Box, Button, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import Advertisement from "./Advertisement";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any


}
const Campaign = ({ control }: Props) => {
  //TODO: fix any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { append, fields } = useFieldArray<any>({
    control,
    name: `childCampaign`
  });
  const [activeCampaign, setActiveCampaign] = useState(fields?.[0]?.id)


  console.log('!fields', fields);
  const item = useWatch({ control, name: `childCampaign` });
  console.log('!item', item);



  const nextNumberOfChildCampaign = ` ${Number(fields.length) + 1}`


  return (
    <Fragment>
      {activeCampaign}
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
      }}>
        Add
      </Button>
      <Box display="flex" gap={2}>
        {
          fields?.map((campaign) => {
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
                borderColor={activeCampaign === campaign.id ? 'rgb(33, 150, 243)' : 'white'}
                onClick={() => setActiveCampaign(campaign.id)}
              >
                {campaign?.name}
              </Box>)
          })
        }
      </Box>
      <Box>
        {
          fields?.map((campaign) => {
            if (activeCampaign === campaign.id) {
              return <Box key={campaign.id}>
                <Controller name={'name'}
                  control={control}
                  render={({ field }) => <TextField {...field} label="Mô tả" variant="standard" fullWidth margin="dense" />}
                />

              </Box>
            }
          })
        }
        <Typography textTransform="uppercase" fontSize={22}>
          danh sách quảng cáo
        </Typography>

        {
          fields?.map((campaign) => {
            if (activeCampaign === campaign.id) {
              return <Box key={campaign.id}>
                {campaign.advertisement.map((ad) => <Box key={ad.id} >
                  <Advertisement control={control} name={`campaign[${campaign.id}].advertisement[${ad.id}].label`} label={ad.label} />
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
