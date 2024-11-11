import { Heading } from "./commonComponents/heading";
import { SubHeading } from "./commonComponents/subheading";
import { InputDiv } from "./commonComponents/inputdiv";
import { Button } from "./commonComponents/button";
import { BottomWarning } from "./commonComponents/bottomwarning";
import { signInemail, signInpassword } from "../store/signupsigninstate";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userFname } from "../store/behaviourState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignInPage = () => {
  const [email, setSignInEmail] = useRecoilState(signInemail);
  const [password, setSignInPassword] = useRecoilState(signInpassword);
  const setUserFname = useSetRecoilState(userFname);

  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center p-10 items-center">
      <div className="bg-white flex flex-col h-fit w-72 sm:w-96 py-8 px-6 rounded-lg  outline outline-1 outline-yellow-500">
        <Heading>Sign In</Heading>
        <SubHeading>Enter your credentials to access your account</SubHeading>
        <InputDiv
          onChange={(e) => {
            setSignInEmail(e.target.value);
          }}
          labelTitle={"Email"}
          placeholder={"johndoe@email.com"}
        />
        <InputDiv
          type={"password"}
          onChange={(e) => {
            setSignInPassword(e.target.value);
          }}
          labelTitle={"Password"}
          placeholder={""}
        />
        <Button
          onClick={async () => {
            try {
              const res = await axios.post("http://localhost:3001/user/signin", {
                username: email,
                password: password,
              });

              localStorage.setItem("Authorization", `Bearer ${res.data.token}`)
              setUserFname(res.data.fName)
              navigate("/items")
            } catch (e) {
              console.log(e);

              if (e.response.data.message) {
                alert(e.response.data.message);
              }
            }
          }}
        >
          Sign In
        </Button>
        <BottomWarning
          warning={"Already have an account?"}
          to={"/signup"}
          ctaText={"Sign up"}
        />
      </div>
    </div>
  );
};
