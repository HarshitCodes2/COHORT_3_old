import { Button } from "./button";
import { Input } from "./input";
import { Logo } from "./logo";
import { dateValidity } from "../store/agePageState";
import { useSetRecoilState } from "recoil";

export function AgePage() {
  const setDateValid = useSetRecoilState(dateValidity);

  function checkDate(e) {
    const dateArr = e.target.value.split(' ')
    
    if (1924 < parseInt(dateArr[dateArr.length - 1]) && parseInt(dateArr[dateArr.length - 1]) < 2009) {
      setDateValid(true);
    } else {
      setDateValid(false);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col bg-blue-800 items-center">
        <Logo />
        <h1 className="text-white text-2xl mt-24 font-medium">
          Verify Your Age
        </h1>
        <p className="text-blue-100 mt-20">
          Please confirm your birth year. This data will not be stored.
        </p>
        <Input onchange={checkDate} placeholder={"Your Birth Year"} />
        <Button toLink={"/email"} enableBy={"date"}>Continue</Button>
      </div>
    </>
  );
}
