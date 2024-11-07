import { Link } from "react-router-dom";
import { otpValidity } from "../store/otpState";
import { emailValidity } from "../store/emailPageState";
import { dateValidity } from "../store/agePageState";
import { useRecoilValue } from "recoil";

export function Button({ children, enableBy, toLink }) {
  let enabled = false;
  const dateValid = useRecoilValue(dateValidity);
  const emailValid = useRecoilValue(emailValidity);
  const otpValid = useRecoilValue(otpValidity);

  switch(enableBy){
    case("date"):
      enabled = dateValid;
      break;
    case("email"):
      enabled = emailValid;
      break;
    case("otp"):
      enabled = otpValid;
      break;
    default:
      enabled = false;
      break;
  }


  return (
    <>
      {enabled ? (
        <span
          className={
            "rounded-2xl px-0 py-3 text-center w-1/4 mt-10 bg-teal text-blue-800"
          }
        >
          <Link to={toLink}>
            <span className={`rounded-2xl w-full px-36 py-3`}>{children}</span>
          </Link>
        </span>
      ) : (
        <span
          className={`rounded-2xl px-32 py-3 w-1/4 mt-10 text-center
            bg-blue-100 text-white`}
        >
          {children}
        </span>
      )}
    </>
  );
}
