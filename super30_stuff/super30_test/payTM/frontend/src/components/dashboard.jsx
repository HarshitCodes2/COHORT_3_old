import { useEffect } from "react"
import { AppBar } from "./commonComponents/appbar"
import { Balance } from "./commonComponents/balance"
import { Users } from "./commonComponents/users"
import { useSetRecoilState } from "recoil"
import { balance, firstName } from "../store/dashboardstate"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
  const setFirstName= useSetRecoilState(firstName);
  const setBalance = useSetRecoilState(balance);
  const navigate = useNavigate();

  const authtoken = localStorage.getItem("Authorization");

  useEffect(() => {
    async function getUserInfo() {
      try{
        const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
          headers: {
            Authorization: authtoken
          }
        });

        setFirstName(res.data.firstName);
        setBalance(res.data.balance);

        console.log(res);
        

      }catch (e){
        console.log(e);
        alert("Please Log In");
        navigate("/signup")
      }
    }

    getUserInfo();
  }, [])

  return (
    <div className="h-screen bg-white ">
      <AppBar/>
      <hr className="grey-200" />
      <Balance />
      <Users />
    </div>   
  )
}


