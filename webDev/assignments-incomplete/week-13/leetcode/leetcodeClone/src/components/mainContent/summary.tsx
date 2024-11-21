import { ProgressSection } from "./progressSection"
import { SummaryHeader } from "./summaryheader"

export const Summary: () => JSX.Element = () => {

  return (
    <>
      <div className="bg-leetcode-darkgrey h-fit col-start-2 col-span-6 m-6 p-6 rounded-lg">
        <SummaryHeader />
        <hr className="h-px my-4 bg-leetcode-lightgrey border-0" />
        <ProgressSection />
      </div>
    </>
  )
}