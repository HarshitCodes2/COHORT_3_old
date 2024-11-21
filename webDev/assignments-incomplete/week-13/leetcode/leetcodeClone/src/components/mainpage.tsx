import { MainContent } from "./maincontent";
import { SideBar } from "./sidebar";

export const MainPage: () => JSX.Element = () => {
  return (
    <>
      <div className="grid grid-cols-16 min-h-screen bg-leetcode-black">
        <SideBar />
        <MainContent />
      </div>
    </>
  );
};
