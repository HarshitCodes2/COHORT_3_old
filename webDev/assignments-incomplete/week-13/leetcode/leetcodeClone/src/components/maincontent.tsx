import { useRecoilValue } from "recoil";
import { showSideBar } from "../store/behaviourState";
import { Summary } from "./mainContent/summary";
import { QuestionList } from "./mainContent/questionList";

export const MainContent: () => JSX.Element = () => {
  const showSideBarVal = useRecoilValue(showSideBar);

  return (
    <>  
      <div className={`${showSideBarVal ? "md:col-span-13 col-span-full " : "col-start-2 col-span-15"} min-h-24 text-white grid grid-cols-16`}>
          <Summary />
          <QuestionList />
      </div>
    </>
  )
}