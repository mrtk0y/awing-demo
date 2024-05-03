import { Box, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const CampaignCard = ({
  isSelectedCampaign,
  onClick,
  name,
  adsCount,
  isActive,
  isError
}: {
  isSelectedCampaign: boolean
  onClick: () => void
  name: string
  adsCount: number
  isActive: boolean
  isError: boolean
}) => {
  return (
    <Box
      boxShadow={2}
      padding={1}
      sx={{
        '&:hover': {
          boxShadow: '1px 2px 4px',
          cursor: 'pointer'
        }
      }}
      boxSizing={'border-box'}
      width={210}
      height={124}
      flexShrink={'0'}
      borderRadius={1}
      border={2}
      borderColor={isSelectedCampaign ? 'rgb(33, 150, 243)' : 'white'}
      onClick={onClick}
    >
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
        <Typography
          textAlign={'center'}
          fontSize={20}
          sx={{
            color: isError ? 'red' : 'black',
            overflow: 'hidden',
            whiteSpace: 'normal',
            wordBreak: 'break-all'
          }}
        >
          {name.length > 30 ? `${name.slice(0, 30)}...` : name}
          <CheckCircleIcon sx={{ color: isActive ? 'green' : '#e0e0e0', fontSize: 14, ml: 0.5 }} />
        </Typography>
      </Box>
      <Typography fontSize={32} textAlign={'center'}>
        {adsCount}
      </Typography>
    </Box>
  )
}
