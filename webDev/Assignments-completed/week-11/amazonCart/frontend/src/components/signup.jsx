import { Heading } from "./commonComponents/heading";
import { SubHeading } from "./commonComponents/subheading";
import { InputDiv } from "./commonComponents/inputdiv";
import { Button } from "./commonComponents/button";
import { BottomWarning } from "./commonComponents/bottomwarning";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  fName,
  lName,
  signUpemail,
  signUppassword,
} from "../store/signupsigninstate";
import { userFname } from "../store/behaviourState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const [firstName, setFname] = useRecoilState(fName);
  const [lastName, setLname] = useRecoilState(lName);
  const [email, setSignupEmail] = useRecoilState(signUpemail);
  const [password, setSignupPassword] = useRecoilState(signUppassword);
  const setUserFname = useSetRecoilState(userFname);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center p-10 items-center">
      <div className="bg-white flex flex-col h-fit w-72 sm:w-96 py-8 px-6 rounded-lg outline outline-1 outline-yellow-500">
        <Heading>Sign Up</Heading>
        <SubHeading>Enter your information to create an account</SubHeading>
        <InputDiv
          onChange={(e) => {
            setFname(e.target.value);
          }}
          labelTitle={"First Name"}
          placeholder={"John"}
        />
        <InputDiv
          onChange={(e) => {
            setLname(e.target.value);
          }}
          labelTitle={"Last Name"}
          placeholder={"Doe"}
        />
        <InputDiv
          onChange={(e) => {
            setSignupEmail(e.target.value);
          }}
          labelTitle={"Email"}
          placeholder={"johndoe@email.com"}
        />
        <InputDiv
          type={"password"}
          onChange={(e) => {
            setSignupPassword(e.target.value);
          }}
          labelTitle={"Password"}
          placeholder={""}
        />
        <Button
          onClick={async () => {
            try {
              const res = await axios.post(
                "http://localhost:3001/user/signup",
                {
                  firstName: firstName,
                  lastName: lastName,
                  username: email,
                  password: password,
                }
              );

              localStorage.setItem("Authorization", `Bearer ${res.data.token}`)
              setUserFname(firstName);
              navigate("/items")

            } catch (e) {
              console.log(e);
              if (e.response.data.message) {
                alert(e.response.data.message);
              }
            }
          }}
        >
          Sign Up
        </Button>
        <BottomWarning
          warning={"Already have an account?"}
          to={"/signin"}
          ctaText={"Login"}
        />
      </div>
    </div>
  );
};
