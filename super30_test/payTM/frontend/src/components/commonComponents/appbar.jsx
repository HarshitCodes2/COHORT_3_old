import { useRecoilValue } from "recoil";
import userPfp from "../../assets/icon/action/userPfp.svg"
import { firstName } from "../../store/dashboardstate"
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { ButtonAppBar } from "./appbarbutton";

export function AppBar(){
  const userfirstName = useRecoilValue(firstName);
  const navigate = useNavigate();


  return (
      <div className="justify-between p-4 flex">
        <p className="font-bold text-xl">PayTM App</p>
        <div className="flex items-center">
          <img src={userPfp} className="w-8 h-8 rounded-full" />
          <p className="w-fit text-right mx-2 self-center">Hello, {userfirstName}</p>
          <ButtonAppBar onClick={() => {
            localStorage.removeItem("Authorization");
            navigate("/signup");
          }}>LogOut</ButtonAppBar>
        </div>
      </div>

  )
}