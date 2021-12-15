import { Result, Button, Row, Col } from 'antd'

import { CalculationResult } from '../../hooks/useCarbonEmission'

type CarbonEmissionResultProps = {
  calculationResult: CalculationResult
  onRecalculate: () => void
}

export const CarbonEmissionResult = ({
  calculationResult,
  onRecalculate
}: CarbonEmissionResultProps) => {
  const { result, category } = calculationResult
  const humanCategory =
    category === 'electricity' ? 'Electricity' : 'Natural Gas'

  return (
    <Row justify="center">
      <Col>
        <Result
          status="success"
          title="Your Carbon Footprint"
          subTitle={`CO2 emissions: ${result.toFixed(
            2
          )} (kg CO2e/yr) for ${humanCategory}`}
          extra={[
            <Button key="calculate_again" onClick={onRecalculate}>
              Calculate Again
            </Button>
          ]}
        />
      </Col>
    </Row>
  )
}
