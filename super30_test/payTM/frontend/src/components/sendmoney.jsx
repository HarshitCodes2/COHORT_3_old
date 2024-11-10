import { Amount } from "./commonComponents/amount"
import { Heading } from "./commonComponents/heading"
import { SendMoneyButton } from "./commonComponents/sendmoneybutton"
import { UserInfo } from "./commonComponents/userinfo"
import { recieverUserFullName, recieverUserId } from "../store/sendmoneystate";
import { useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom"


export const SendMoneyPage = () => {
  // const userFullName = useRecoilValue(recieverUserFullName);
  // const userId = useRecoilValue(recieverUserId);

  // console.log("userId in SendMoneyPage: ", userId);
  
  const [ searchParams, setSearchParams ] = useSearchParams();
  const userId = searchParams.get("id");
  const userFname = searchParams.get("fName");
  const userLname = searchParams.get("lName");

  return (
    <div className="flex min-h-screen justify-center p-10 items-center">
        <div className="bg-white flex flex-col h-fit w-72 sm:w-96 py-8 px-6 rounded-lg" >
          <Heading>Send Money</Heading>
          <UserInfo fName={userFname} lName={userLname}/>
          <Amount />
          <SendMoneyButton userId = {userId} >Initiate Transfer</SendMoneyButton>
        </div>
    </div>
  )
}
