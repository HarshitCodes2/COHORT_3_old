import sidebarIcon from "../../assets/sidebar.svg";
import { showSideBar } from "../../store/behaviourState";
import { useRecoilState } from "recoil";

export const SideBarHeader: () => JSX.Element = () => {
  const [showSideBarVal, setShowSideBar] = useRecoilState(showSideBar);

  function changeShowSideBar(){
    console.log(showSideBarVal);
    setShowSideBar(!showSideBarVal)
  }
  return (
    <>
      <div>
        <div className="flex justify-between mt-2 text-white font-medium pl-2 items-center">
          <h1>My Lists</h1>
          <button onClick={changeShowSideBar} className="hover:bg-leetcode-lightgrey rounded-sm">
            <img src={sidebarIcon} className="w-8 h-8 p-1 pt-2" />
          </button>
        </div>
        <p className="text-sm text-white py-2 px-2">Created by me</p>
      </div>
    </>
  );
};
