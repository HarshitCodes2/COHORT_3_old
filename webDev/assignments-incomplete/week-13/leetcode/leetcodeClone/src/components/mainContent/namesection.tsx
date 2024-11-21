import lockIcon from "../../assets/lock.svg"
import dotIcon from "../../assets/dot.svg"
import downarrowIcon from "../../assets/downarrow.svg"

export const NameSection: () => JSX.Element = () => {

  return (
    <>
      <div className="flex items-center text-xs mt-4">
        <p>Harshit</p>
        <img src={dotIcon} className="w-4 h-4 pt-1"/>
        <p>19 questions</p>
        <img src={dotIcon} className="w-4 h-4 pt-1"/>
        <img src={lockIcon} className="h-4 w-4 mr-1" />
        <p>Private</p>
        <img src={downarrowIcon} className="h-4 w-4 ml-1 mt-1"  />
        
      </div>
    </>
  )
}