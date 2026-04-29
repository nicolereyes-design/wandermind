import { notFound } from 'next/navigation'
import StepTravelStyle from '@/components/onboarding/StepTravelStyle'
import StepBudget from '@/components/onboarding/StepBudget'
import StepInterests from '@/components/onboarding/StepInterests'
import StepDuration from '@/components/onboarding/StepDuration'
import StepLodging from '@/components/onboarding/StepLodging'

interface StepPageProps {
  params: Promise<{ step: string }>
}

export default async function StepPage({ params }: StepPageProps) {
  const { step } = await params
  const stepNumber = parseInt(step, 10)

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 5) {
    notFound()
  }

  const stepsMap: Record<number, React.ReactNode> = {
    1: <StepTravelStyle />,
    2: <StepBudget />,
    3: <StepInterests />,
    4: <StepDuration />,
    5: <StepLodging />,
  }

  return stepsMap[stepNumber]
}
