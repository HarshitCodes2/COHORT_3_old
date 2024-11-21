import playIcon from "../../assets/play.svg"
import forkIcon from "../../assets/git-fork.svg"

export const ButtonSection: () => JSX.Element = () => {
  return (
    <>
      <div className="flex mt-3">
        <div onClick={() => console.log("Clicked")} className="flex items-center text-sm bg-leetcode-white p-1 px-3 rounded-2xl hover:cursor-pointer">
          <img className="w-4 h-4 mr-1" src={playIcon} />
          <p className="text-black">Practice</p>
        </div>
        <img src={forkIcon} className="w-7 h-7 p-1.5 bg-leetcode-lightgrey rounded-full ml-2" />
      </div>
    </>
  ) 
}