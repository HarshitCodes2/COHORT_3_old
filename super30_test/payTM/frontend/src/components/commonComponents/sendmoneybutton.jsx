import axios from "axios";
import { amount } from "../../store/sendmoneystate";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

export const SendMoneyButton = ({ children, userId }) => {
  const amountVal = useRecoilValue(amount);
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={async (e) => {
          const authToken = localStorage.getItem("Authorization");

          try {
            const res = await axios.post(
              "http://localhost:3000/api/v1/account/transfer",
              {
                to: userId,
                amount: amountVal,
              },
              {
                headers: {
                  Authorization: authToken,
                },
              }
            );

            alert("Paisa Sent");
            navigate("/dashboard");
          } catch (e) {
            console.log(e);
            try {
              if (e.response.data) {
                alert(e.response.data.message);
              }
            } catch (e) {
              alert("Transaction Failed");
            }
          }
        }}
        className="bg-green-500 text-white p-2 rounded-md mt-4 text-center hover:bg-green-600"
      >
        {children}
      </button>
    </>
  );
};
