import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {  useState } from 'react';
import CustomTabPanel from './components/CustomTabs';
import Information from './components/Information';
import Campaign from './components/Campaign';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';

enum FORMS {
  INFORMATION,
  CAMPAIGN
}

function App() {

  const [activeTab, setActiveTab] = useState(FORMS.CAMPAIGN)

  const [isSubmitting, setIsSubmitting] = useState(false)

  console.log('!!isSubmitting',isSubmitting);


  const handleSetSubmit = () => {
    setIsSubmitting((pre)=>!pre)
  }



  return (
    <Box paddingY={1}>
      <Box display={'flex'} justifyContent={'end'} paddingX={2}>
        <Button type="submit" variant="contained"
          onClick={handleSetSubmit}
        >Submit</Button>
      </Box>

      <Box marginTop={2}>

        <Divider />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_e, value) => setActiveTab(value)} aria-label="basic tabs example">
            <Tab label="Thông tin" />
            <Tab label="Chiến dịch con" />
          </Tabs>
        </Box>

        <CustomTabPanel value={activeTab} index={FORMS.INFORMATION}>
          <Information isSubmitting={isSubmitting && activeTab === FORMS.INFORMATION}  handleSetSubmit={handleSetSubmit}/>
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={FORMS.CAMPAIGN}>
          <Campaign isSubmitting={isSubmitting && activeTab === FORMS.CAMPAIGN}  handleSetSubmit={handleSetSubmit}/>
        </CustomTabPanel>

      </Box>
    </Box>
  )
}

export default App
