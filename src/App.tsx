import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import InformationPanel from './components/InformationPanel.tsx'
import { Button } from '@mui/material'
import Divider from '@mui/material/Divider'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubCampaignsPanel } from './components/SubCampaignsPanel.tsx'

enum FORMS {
  INFORMATION,
  CAMPAIGN
}

const schema = z.object({
  campaign: z.object({
    information: z.object({
      name: z.string().min(1, { message: 'Tên chiến dịch không được để trống' }),
      describe: z.string()
    }),
    subCampaigns: z
      .array(
        z.object({
          name: z.string().min(1, { message: 'Tên chiến dịch con không được để trống' }),
          status: z.boolean(),
          ads: z.array(
            z.object({
              name: z.string().min(1, { message: 'Không được trống' }),
              quantity: z.number().min(1, { message: 'Số phải lớn hơn 0' })
            })
          )
        })
      )
      .nonempty({ message: 'Bắt buộc' })
  })
})

export type TFormData = z.infer<typeof schema>

const defaultValues: TFormData = {
  campaign: {
    information: {
      name: '',
      describe: ''
    },
    subCampaigns: [
      {
        name: 'Chiến dịch con 1',
        status: true,
        ads: [
          {
            quantity: 0,
            name: 'Quảng cáo 1'
          }
        ]
      }
    ]
  }
}

const App = () => {
  const [activeTab, setActiveTab] = useState(FORMS.CAMPAIGN)

  const method = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const {
    handleSubmit,
    formState: { errors }
  } = method

  const onSubmit = (values: unknown) => {
    alert(JSON.stringify(values, null, 2))
  }

  useEffect(() => {
    if (Object.values(errors).length) {
      alert(JSON.stringify('Điền đủ thông tin', null, 2))
      if (errors.campaign?.information) {
        setActiveTab(FORMS.INFORMATION)
        return
      }
      if (errors.campaign?.subCampaigns) {
        setActiveTab(FORMS.CAMPAIGN)
        return
      }
    }
  }, [errors])

  return (
    <Box>
      <Box display={'flex'} justifyContent={'end'} paddingX={2} pb={1} pt={2}>
        <Button type='submit' variant='contained' onClick={() => handleSubmit(onSubmit)()}>
          Submit
        </Button>
      </Box>

      <Divider />

      <Box margin={2} boxShadow={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_e, value) => setActiveTab(value)} aria-label='basic tabs example'>
            <Tab label='Thông tin' key={FORMS.INFORMATION}/>
            <Tab label='Chiến dịch con' key={FORMS.CAMPAIGN} />
          </Tabs>
        </Box>

        <FormProvider {...method}>
          <Box paddingY={2} paddingX={3}>
            <Box hidden={activeTab !== FORMS.INFORMATION}>
              <InformationPanel />
            </Box>
            <Box hidden={activeTab !== FORMS.CAMPAIGN}>
              <SubCampaignsPanel />
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  )
}

export default App
