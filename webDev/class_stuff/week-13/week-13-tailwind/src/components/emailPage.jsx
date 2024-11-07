import { Button } from "./button";
import { Input } from "./input";
import { Logo } from "./logo";
import { emailValidity } from "../store/emailPageState"
import { email } from "../store/globalState";
import { useSetRecoilState } from "recoil";

export function EmailPage() {
  const setEmailValid = useSetRecoilState(emailValidity);
  const setEmail = useSetRecoilState(email);

  function checkEmail(e) {
    const value = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(value);

    console.log(isValid);
    
    setEmailValid(isValid);
    if(isValid){
      setEmail(value);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col bg-blue-800 items-center">
        <Logo />
        <h1 className="text-white text-2xl mt-24 mb-10 font-medium">
          Let's get Started
        </h1>
        <Input onchange={checkEmail} placeholder={"Your Email"} />
        <Button toLink={"/otp"} enableBy={"email"}>Continue</Button>
      </div>
    </>
  );
}
