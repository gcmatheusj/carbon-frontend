import { Space, Form, Button, Card, InputNumber } from 'antd'

import { Category } from '../../App'

type FormValues = {
  consumptionPerYear: number
}

type CarbonEmissionFormProps = {
  category: Category
  onSubmit: (values: FormValues) => void
  disabledOnSubmit: boolean
}

export const CarbonEmissionForm = ({
  category,
  onSubmit,
  disabledOnSubmit
}: CarbonEmissionFormProps) => {
  const [form] = Form.useForm<FormValues>()

  return (
    <Card style={{ width: 280 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="consumptionPerYear"
          label={`Annual Consumption ${
            category === 'electricity' ? '(kWh/yr)' : '(therms/yr)'
          }`}
          rules={[
            {
              required: true,
              message: 'Annual consumption is required'
            }
          ]}
          extra="Only numbers"
        >
          <InputNumber
            placeholder="input your consumption"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabledOnSubmit}
            >
              Calculate
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
