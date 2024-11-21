import { useRecoilValue } from "recoil"
import { balance } from "../../store/dashboardstate"

export function Balance(){
  const balanceVal = parseFloat(useRecoilValue(balance)).toFixed(2);

  return (
    <div>
      <p className="p-4 pt-8 font-medium">Your Balance: ₹ {balanceVal}</p>
    </div>
  )
}