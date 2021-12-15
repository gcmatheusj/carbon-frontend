import { useState, useCallback } from 'react'
import axios from 'axios'

import { Category } from '../App'
import { api } from '../services/api'

export type CalculationResult = {
  category: string
  result: number
}

type CalculateArgs = {
  category: Category
  consumptionPerYear: number
}

type UseCarbonEmission = {
  loading: boolean
  error: string | undefined
  calculate: (args: CalculateArgs) => Promise<CalculationResult | undefined>
}

export const useCarbonEmission = (): UseCarbonEmission => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const calculate = useCallback(
    async ({
      category,
      consumptionPerYear
    }: CalculateArgs): Promise<CalculationResult | undefined> => {
      try {
        setLoading(true)
        const response = await api.post<CalculationResult>(
          '/carbon-emission-calculator',
          {
            category,
            consumptionPerYear
          }
        )

        return response.data
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.error)
        } else {
          setError('Error when calculating carbon emission')
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    calculate,
    loading,
    error
  }
}
