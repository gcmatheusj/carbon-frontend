import { Card } from 'antd'

const { Meta } = Card

type CategoryCardProps = {
  title: string
  description: string
  isSelected: boolean
  onSelect: () => void
}

export const CategoryCard = ({
  title,
  description,
  isSelected,
  onSelect
}: CategoryCardProps) => {
  return (
    <Card
      hoverable
      style={{
        width: 280,
        borderColor: isSelected ? 'green' : '#f0f0f0'
      }}
      onClick={onSelect}
    >
      <Meta title={title} description={description} />
    </Card>
  )
}
