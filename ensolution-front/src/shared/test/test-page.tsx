import { usePlanDetail } from "@plan/hooks"

export const TestPage = () => {
  const { planDetail } = usePlanDetail(75);

  console.log(planDetail);

  return (
    <div>
      test page
    </div>
  )
}