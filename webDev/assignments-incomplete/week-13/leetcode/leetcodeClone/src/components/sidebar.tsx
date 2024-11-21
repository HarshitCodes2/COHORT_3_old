import sidebarIcon from "../assets/sidebar.svg";
import { SideBarCard } from "./sidebarComponents/card";
import { SideBarHeader } from "./sidebarComponents/header";
import { showSideBar } from "../store/behaviourState";
import { useRecoilState } from "recoil";

export const SideBar: () => JSX.Element = () => {
  const [showSideBarVal, setShowSideBar] = useRecoilState(showSideBar);

  function changeShowSideBar() {
    console.log(showSideBarVal);
    setShowSideBar(!showSideBarVal);
  }
  return (
    <>
      {showSideBarVal ? (
        <div className="bg-leetcode-grey min-h-24 md:col-span-3 hidden md:block p-4">
          <SideBarHeader />
          <SideBarCard />
        </div>
      ) : (
        <div className="bg-leetcode-grey min-h-24 md:col-span-1 hidden md:block p-4 pt-6">
          <button
            onClick={changeShowSideBar}
            className="hover:bg-leetcode-lightgrey rounded-sm"
          >
            <img src={sidebarIcon} className="w-8 h-8 p-1 pt-2" />
          </button>
        </div>
      )}
    </>
  );
};
