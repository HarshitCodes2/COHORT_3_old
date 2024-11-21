import reloadIcon from "../../assets/reload.svg"
import { ProgressCardSection } from "./progresscardsection";

export const ProgressSection: () => JSX.Element = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p>Progress</p>
        <img src={reloadIcon} className="w-3 h-3 "/>
      </div>
      <ProgressCardSection />
    </>
  );
};
