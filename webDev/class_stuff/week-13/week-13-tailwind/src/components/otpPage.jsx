import { Logo } from "./logo";
import { OtpInputs } from "./otpInputs";
import { email } from "../store/globalState";
import { useRecoilValue } from "recoil";
import { Button } from "./button";


export function OtpPage() {
  const emailValue = useRecoilValue(email);

  return (
    <div className="h-screen flex flex-col bg-blue-800 items-center">
      <Logo />
      <h1 className="text-white text-2xl mt-24 font-medium">
        Check Your Email For A Code
      </h1>
      <p className="text-blue-100 mt-20 mb-5">
        Please enter the verification code sent to your email id : {emailValue}
      </p>
      <OtpInputs inpNumber={6} />
      <p className="mt-2 text-gray-400 text-xs">09:32</p>
      <Button toLink={"/"} enableBy={"otp"}>
        Verify
      </Button>
      <p className={`mt-2 text-gray-400 text-sm`}>
        Can't find the email? Click <span className={`text-white underline cursor-pointer`}>here</span> to resend
      </p>
    </div>
  );
}
