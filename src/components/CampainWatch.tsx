import { useFormContext, useWatch } from 'react-hook-form'
import { CampaignCard } from './CampaignCard'

export const CampainWatch = ({
  isSelectedCampaign,
  onClick,
  campaignIndex
}: {
  isSelectedCampaign: boolean
  onClick: () => void
  campaignIndex: number
}) => {
  const { control } = useFormContext()
  const { name, advertisement, isActive } = useWatch({ control, name: `childCampaign.${campaignIndex}` })
  return (
    <CampaignCard
      isSelectedCampaign={isSelectedCampaign}
      onClick={onClick}
      name={name}
      adsCount={advertisement.length}
      isActive={isActive}
    />
  )
}
