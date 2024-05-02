import { Box, Typography } from '@mui/material'

export const CampaignCard = ({
  isSelectedCampaign,
  onClick,
  name,
  adsCount,
  isActive
}: {
  isSelectedCampaign: boolean
  onClick: () => void
  name: string
  adsCount: number
  isActive: boolean
}) => {
  return (
    <Box
      boxShadow={2}
      padding={2}
      marginY={2}
      sx={{
        '&:hover': {
          boxShadow: 4,
          cursor: 'pointer'
        }
      }}
      flexShrink={'0'}
      borderRadius={1}
      border={2}
      borderColor={isSelectedCampaign ? 'rgb(33, 150, 243)' : 'white'}
      onClick={onClick}
    >
      <Box display='flex' flexDirection={'column'}>
        <Typography textAlign={'center'} height={16} color={name ? 'black' : 'gray'}>
          {name || 'Chưa có tên'}
        </Typography>
        <Box textAlign={'center'}>
          {isActive ? (
            <Typography color={'green'}>Đang hoạt động</Typography>
          ) : (
            <Typography color={'red'}>Không hoạt động</Typography>
          )}
        </Box>
        <Typography textAlign={'center'}>Số lượng quảng cáo: {adsCount}</Typography>
      </Box>
    </Box>
  )
}
