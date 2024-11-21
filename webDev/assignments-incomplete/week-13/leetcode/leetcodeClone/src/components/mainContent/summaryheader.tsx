import starIcon from "../../assets/star.svg"
import { ButtonSection } from "./buttonsection"
import { NameSection } from "./namesection"

export const SummaryHeader: () => JSX.Element = () => {
  
  return (
    <>
      <div>
        <img src={starIcon} className="bg-leetcode-white rounded-md p-2 w-16 h-16"/>
        <p className="text-3xl mt-3">Favorite</p>
        <NameSection />
        <ButtonSection />
      </div>
    </>
  )
}