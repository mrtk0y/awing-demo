import Box from '@mui/material/Box'
import { PropsWithChildren } from 'react'

type Props = {
  isShow: boolean
}

const TabPanel = ({ isShow, children }: PropsWithChildren<Props>) => {
  return <Box hidden={!isShow}>{children}</Box>
}

export default TabPanel
