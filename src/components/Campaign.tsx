/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO: fix any type

import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Advertisement from "./Advertisement";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  control: any
  watch: any
}

const Campaign = ({ control, watch }: Props) => {
  const { getFieldState } = useFormContext();
  const [activeCampaign, setActiveCampaign] = useState(0)

  const { append } = useFieldArray({
    control,
    name: `childCampaign`
  });


  const { append: appendAdv } = useFieldArray({
    control,
    name: `childCampaign[${activeCampaign}].advertisement`
  });



  const { childCampaign } = watch()




  const nextNumberOfChildCampaign = ` ${Number(childCampaign.length) + 1}`

  return (
    <Fragment>
      <Button onClick={() => {
        append({
          name: "Chiến dịch" + nextNumberOfChildCampaign,
          isActive: true,
          advertisement: [{
            id: nextNumberOfChildCampaign,
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
          childCampaign?.map((campaign: any, index: number) => {
            return (
              <Box
                key={index}
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
                <Box display='flex' flexDirection={'column'}>
                  <Typography height={16} color={campaign?.name ? 'black' : 'gray'}>
                    {campaign?.name || 'Chưa có tên'}
                  </Typography>
                  <Box textAlign={'center'}>
                    {campaign?.isActive ? <Typography color={'green'}>
                      Đang hoạt động
                    </Typography> : <Typography color={'red'}>
                      Không hoạt động
                    </Typography>}
                  </Box>
                  <Typography textAlign={'center'}>
                    {childCampaign[activeCampaign].advertisement?.length}
                  </Typography>
                </Box>
              </Box>
            )
          })
        }
      </Box>
      <Box>
        {
          childCampaign?.map((_campaign: any, index: number) => {
            if (activeCampaign === index) {
              return <Box key={index} display="flex">
                <Controller name={`childCampaign[${activeCampaign}].name`}
                  control={control}
                  // render={({ field }) => <TextField {...field} label="Tên Campaign" variant="standard" fullWidth margin="dense" />}
                  render={({ field }) => <Box flexGrow={1}>
                    <TextField {...field} variant="standard" fullWidth margin="dense"
                      error={!!getFieldState(`childCampaign[${activeCampaign}].name`).error?.message}
                    />
                    <ErrorMessage name={`childCampaign[${activeCampaign}].name`}
                      render={({ message }) =>
                        <Typography fontSize={14} color='red'>
                          {message}
                        </Typography>
                      } />
                  </Box>
                  }
                />
                <Controller name={`childCampaign[${activeCampaign}].isActive`}
                  control={control}
                  render={({ field }) => <FormControlLabel {...field} control={<Checkbox checked={field.value} />} label="Đang hoạt động" />}
                />
              </Box>
            }
          })
        }
        <Box marginTop={2} display='flex' justifyContent='space-between'>
          <Typography textTransform="uppercase" fontSize={22}>
            danh sách quảng cáo
          </Typography>
          <Button onClick={() => {
            appendAdv({
              id: nextNumberOfChildCampaign,
              title: 'ad' + nextNumberOfChildCampaign,
              quantity: 0,
              name: "Quảng cáo" + nextNumberOfChildCampaign,
            })
          }}>
            Thêm
          </Button>
        </Box>
        {
          childCampaign?.map((campaign: any, index: number) => {
            if (activeCampaign === index) {
              return <Box key={index}>
                {campaign.advertisement.map((_ad: any, adIndex: number) => <Box key={adIndex} >
                  <Advertisement
                    control={control}
                    name={`childCampaign[${activeCampaign}].advertisement[${adIndex}].name`}
                    quantity={`childCampaign[${activeCampaign}].advertisement[${adIndex}].quantity`}
                  />
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
