import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import CustomTabPanel from './components/CustomTabs';
import Information from './components/Information';
import Campaign, { CampainRefFuncs } from './components/Campaign';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';


function App() {

  const [value, setValue] = useState(0);


  const submitRef = useRef(null);

  const campaignRef = useRef<CampainRefFuncs>(null)


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubmit = ()=>{
    // console.log('!!submitRef.current',submitRef.current);

    // submitRef.current.submit()

    // ! if active tab === information
    if(submitRef.current){
      // submitRef.current.submitInformation()
    }

    // ! if active tab === campain
    console.log('!!campaignRef.current?',campaignRef.current?.refSubmit());

    campaignRef.current?.refSubmit()
    if (campaignRef.current) {//
    }
  }



  return (
    <Box paddingY={1}>
      <Box display={'flex'} justifyContent={'end'} paddingX={2}>
        <Button  type="submit" variant="contained"
        onClick={handleSubmit}
        >Submit</Button>
      </Box>

      <Box marginTop={2}>

        <Divider />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thông tin" />
            <Tab label="Chiến dịch con" />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Information/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Campaign ref={campaignRef}/>
        </CustomTabPanel>

      </Box>
    </Box>
  )
}

export default App
