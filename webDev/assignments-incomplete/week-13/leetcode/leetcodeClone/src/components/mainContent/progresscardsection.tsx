import tickIcon from "../../assets/tick.svg";

export const ProgressCardSection: () => JSX.Element = () => {
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-3 gap-2 mt-2">
        <div className="col-span-3 row-span-3 bg-leetcode-grey text-center rounded-lg flex flex-col justify-center items-center">
          <p className="text-4xl">
            19<span className="text-lg">/19</span>
          </p>
          <div className="flex justify-center items-center">
            <img className="w-4 h-4" src={tickIcon} />
            <p>Solved</p>
          </div>
        </div>
        <div className="text-xs bg-leetcode-grey p-2 text-center rounded-lg">
          <p className="text-cyan-400">Easy</p>
          <p>7/7</p>
        </div>
        <div className="text-xs bg-leetcode-grey p-2 text-center rounded-lg">
          <p className="text-yellow-500">Med.</p>
          <p>12/15</p>
        </div>
        <div className="text-xs bg-leetcode-grey p-2 text-center rounded-lg">
          <p className="text-red-500">Hard</p>
          <p>2/6</p>
        </div>
      </div>
    </>
  );
};
