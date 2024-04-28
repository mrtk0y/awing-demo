import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import CustomTabPanel from './components/CustomTabs';
import Information from './components/Information';
import Campaign from './components/Campaign';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';

enum FORMS {
  INFORMATION,
  CAMPAIGN
}

export type TFormData = {
  name: string
  id: string
  description: string
  childCampaign: TChildCampaign[]
}

export type TChildCampaign = {
  name: string
  id: string
  advertisement: {
    id: number
    title: string
    number: number
    label: string
  }[]
}
function App() {

  const [activeTab, setActiveTab] = useState(FORMS.CAMPAIGN)


  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      childCampaign: [
        {
          name: "Chiến dịch 1",
          advertisement: [
            {
              id: 0,
              title: 'ad',
              number: 0,
              label: "Quảng cáo 1"
            }
          ]
        }
      ]
    },
  })

  const onSubmit = async (values: unknown) => {
    // form submit action here
    console.log('!!values', values);
    try {
      //
    } catch (err) {
      //
    }
  }

  return (
    <Box paddingY={1}>
      <Box display={'flex'} justifyContent={'end'} paddingX={2}>
        <Button type="submit" variant="contained"
          onClick={handleSubmit(onSubmit)}
        >Submit</Button>
      </Box>

      <Box marginY={2} >
        <Divider />
      </Box>

      <Box margin={2} boxShadow={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_e, value) => setActiveTab(value)} aria-label="basic tabs example">
            <Tab label="Thông tin" />
            <Tab label="Chiến dịch con" />
          </Tabs>
        </Box>

        <CustomTabPanel value={activeTab} index={FORMS.INFORMATION}>
          <Information control={control} errors={errors} />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={FORMS.CAMPAIGN}>
          <Campaign
            control={control}
          />
        </CustomTabPanel>

      </Box>
    </Box>
  )
}

export default App
