import { useSetRecoilState } from "recoil"
import { amount } from "../../store/sendmoneystate"

export function Amount(){
  const setAmount = useSetRecoilState(amount);
  
  return(
    <div className="py-3 px-1">
      <p className="text-sm">Amount (in Rs.)</p>
      <input onChange={(e) => {
        setAmount(e.target.value);
      }} type="number" placeholder="Enter amount" className="p-2 my-1 text-sm w-full outline outline-1 outline-grey-200 rounded-sm"  />
    </div>
  )
}