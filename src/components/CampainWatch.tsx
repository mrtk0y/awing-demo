import { useFormContext, useWatch } from 'react-hook-form'
import { CampaignCard } from './CampaignCard'
import { TFormData } from '../App'

export const CampaignWatch = ({
  isSelectedCampaign,
  onClick,
  campaignIndex
}: {
  isSelectedCampaign: boolean
  onClick: () => void
  campaignIndex: number
}) => {
  const { control, getFieldState } = useFormContext<TFormData>()
  const { name, ads, status } = useWatch({ control, name: `campaign.subCampaigns.${campaignIndex}` })
  return (
    <CampaignCard
      isSelectedCampaign={isSelectedCampaign}
      onClick={onClick}
      name={name}
      adsCount={ads.reduce((acc, item) => acc + item.quantity, 0)}
      isActive={status}
      isError={!!getFieldState(`campaign.subCampaigns.${campaignIndex}`).error}
    />
  )
}
