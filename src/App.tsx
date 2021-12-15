import { useState } from 'react'
import { Space, Typography, Row, Col } from 'antd'

import { useCarbonEmission, CalculationResult } from './hooks/useCarbonEmission'

import { CarbonEmissionForm } from './components/CarbonEmissionForm'
import { CategoryCard } from './components/CategoryCard'
import { CarbonEmissionResult } from './components/CarbonEmissionResult/'

const { Title } = Typography

export type Category = 'electricity' | 'natural_gas'

function App() {
  const [category, setCategory] = useState<Category>('electricity')
  const [carbonEmissionResult, setCarbonEmissionResult] = useState<
    CalculationResult | undefined
  >(undefined)
  const { calculate, loading } = useCarbonEmission()

  return (
    <Row justify="center">
      <Col>
        <Title>Carbon Footprint Calculator</Title>

        <Space direction="vertical" size={16} style={{ width: 500 }}>
          {!carbonEmissionResult ? (
            <>
              <Space size={16}>
                <CategoryCard
                  title="Electricity"
                  description="Calculate your carbon emission for electricity"
                  isSelected={category === 'electricity'}
                  onSelect={() => setCategory('electricity')}
                />
                <CategoryCard
                  title="Natural Gas"
                  description="Calculate your carbon emission for natural gas"
                  isSelected={category === 'natural_gas'}
                  onSelect={() => setCategory('natural_gas')}
                />
              </Space>

              <Space size={16}>
                <CarbonEmissionForm
                  category={category}
                  onSubmit={async ({ consumptionPerYear }) => {
                    const calculationResult = await calculate({
                      category,
                      consumptionPerYear
                    })

                    setCarbonEmissionResult(calculationResult)
                  }}
                  disabledOnSubmit={loading}
                />
              </Space>
            </>
          ) : (
            <CarbonEmissionResult
              calculationResult={carbonEmissionResult}
              onRecalculate={() => {
                setCarbonEmissionResult(undefined)
                setCategory('electricity')
              }}
            />
          )}
        </Space>
      </Col>
    </Row>
  )
}

export default App
