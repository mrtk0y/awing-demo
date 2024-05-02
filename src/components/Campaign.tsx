/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO: fix any type

import { Box, Button, Checkbox, Divider, FormControlLabel, TextField, Typography } from '@mui/material'
import { Fragment, useMemo, useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import AdvertisementCard from './AdvertisementCard'
import { ErrorMessage } from '@hookform/error-message'
import { isEmpty } from '../utils/isEmptyObject.ts'

type Props = {
  control: any
  watch: any
}

const Campaign = ({ control, watch }: Props) => {
  const { getFieldState } = useFormContext()
  const [activeCampaign, setActiveCampaign] = useState(0)

  const [listAdSelected, setListAdSelected] = useState<number[]>([])

  const { insert } = useFieldArray({
    control,
    name: `childCampaign`
  })

  const { insert: insertAdv } = useFieldArray({
    control,
    name: `childCampaign[${activeCampaign}].advertisement`
  })

  const { childCampaign } = watch()

  const [isCheckedAll, setIsCheckedAll] = useState(false)
  const isSelecting = useMemo(() => {
    return !isEmpty(listAdSelected)
  }, [listAdSelected])
  const [_countAd, setCountAd] = useState(1)
  const [_countCampaign, setCountCampaign] = useState(1)
  const { remove } = useFieldArray({
    control,
    name: `childCampaign[${activeCampaign}].advertisement`
  })

  const deleteAllAdv = () => {
    remove()
    setCountAd(0)
    setIsCheckedAll(false)
  }
  const deleteSelected = () => {
    remove(listAdSelected)
    setListAdSelected([])
  }

  const addNewSelected = (newAd: number) => {
    setListAdSelected((pre) => {
      if (pre.includes(newAd)) {
        return pre.filter((ad) => ad !== newAd)
      } else {
        return [...pre, newAd]
      }
    })
  }

  return (
    <Fragment>
      <Button
        onClick={() => {
          setCountCampaign((pre) => {
            const nextNum = Number(pre) + 1
            insert(nextNum, {
              name: 'Chiến dịch ' + nextNum,
              isActive: true,
              id: nextNum,
              advertisement: [
                {
                  id: 1,
                  quantity: 0,
                  name: 'Quảng cáo ' + 1
                }
              ]
            })
            return nextNum
          })
        }}
        variant='contained'
      >
        Thêm chiến dịch
      </Button>
      <Box display='flex' gap={2}>
        {childCampaign?.map((campaign: any, index: number) => {
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
                }
              }}
              borderRadius={1}
              border={2}
              borderColor={activeCampaign === index ? 'rgb(33, 150, 243)' : 'white'}
              onClick={() => setActiveCampaign(index)}
            >
              <Box display='flex' flexDirection={'column'}>
                <Typography textAlign={'center'} height={16} color={campaign?.name ? 'black' : 'gray'}>
                  {campaign?.name || 'Chưe chỉa có tên'}
                </Typography>
                <Box textAlign={'center'}>
                  {campaign?.isActive ? (
                    <Typography color={'green'}>Đang hoạt động</Typography>
                  ) : (
                    <Typography color={'red'}>Không hoạt động</Typography>
                  )}
                </Box>
                <Typography textAlign={'center'}>Số lượng quảng cáo: {campaign.advertisement.length}</Typography>
              </Box>
            </Box>
          )
        })}
      </Box>
      <Box>
        {childCampaign?.map((_campaign: any, index: number) => {
          if (activeCampaign === index) {
            return (
              <Box key={index} display='flex'>
                <Controller
                  name={`childCampaign[${activeCampaign}].name`}
                  control={control}
                  // render={({ field }) => <TextField {...field} label="Tên Campaign" variant="standard" fullWidth margin="dense" />}
                  render={({ field }) => (
                    <Box flexGrow={1}>
                      <TextField
                        {...field}
                        variant='standard'
                        fullWidth
                        margin='dense'
                        error={!!getFieldState(`childCampaign[${activeCampaign}].name`).error?.message}
                      />
                      <ErrorMessage
                        name={`childCampaign[${activeCampaign}].name`}
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
                  name={`childCampaign[${activeCampaign}].isActive`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel {...field} control={<Checkbox checked={field.value} />} label='Đang hoạt động' />
                  )}
                />
              </Box>
            )
          }
        })}
        <Box marginTop={2} display='flex' alignItems={'center'}>
          <Checkbox
            indeterminate={isSelecting && listAdSelected.length < _countAd}
            checked={isCheckedAll || listAdSelected.length === _countAd}
            onChange={() => setIsCheckedAll((pre) => !pre)}
          ></Checkbox>

          {isCheckedAll || isSelecting ? (
            <Button
              variant='contained'
              color='error'
              onClick={() => {
                isSelecting ? deleteSelected() : deleteAllAdv()
              }}
            >
              Xóa
            </Button>
          ) : (
            <Typography textTransform='uppercase' fontSize={22}>
              danh sách quảng cáo
            </Typography>
          )}
        </Box>
        <Box marginY={2}>
          <Box display='flex' gap={2}>
            <Typography flexGrow={1}>Tên quảng cáo * </Typography>
            <Typography flexGrow={1}>Số lượng * </Typography>
            <Button
              onClick={() => {
                setCountAd((pre) => {
                  insertAdv(pre + 1, {
                    id: pre + 1,
                    quantity: 0,
                    name: 'Quảng cáo ' + (Number(pre) + 1)
                  })
                  return pre + 1
                })
              }}
              variant='contained'
            >
              Thêm
            </Button>
          </Box>
          <Divider />
        </Box>
        {childCampaign?.map((campaign: any, index: number) => {
          if (activeCampaign === index) {
            return (
              <Box key={index}>
                {campaign.advertisement.map((ad: any, adIndex: number) => {
                  return (
                    <Box key={ad.id}>
                      <AdvertisementCard
                        addNewSelected={addNewSelected}
                        listAdSelected={listAdSelected}
                        isCheckedAll={isCheckedAll}
                        position={adIndex}
                        activeCampaign={activeCampaign}
                        control={control}
                        name={`childCampaign[${activeCampaign}].advertisement[${adIndex}].name`}
                        quantity={`childCampaign[${activeCampaign}].advertisement[${adIndex}].quantity`}
                      />
                    </Box>
                  )
                })}
              </Box>
            )
          }
        })}
      </Box>
    </Fragment>
  )
}

export default Campaign
