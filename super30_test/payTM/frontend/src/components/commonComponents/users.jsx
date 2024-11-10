import userPfp from "../../assets/icon/action/userPfp.svg";
import axios from "axios";
import { filter, users } from "../../store/dashboardstate";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function Users() {
  const [filterValue, setFilterValue] = useRecoilState(filter);
  const [usersArr, setUsersArr] = useRecoilState(users);
  const debouncedValue = useDebounce(filterValue, 200);

  useEffect(() => {
    async function fetchData() {
      const authToken = localStorage.getItem("Authorization");

      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/user/bulk?filter=${debouncedValue}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        console.log(res);
        setUsersArr(res.data.users);
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, [debouncedValue, setUsersArr]);

  return (
    <div className="p-4">
      <p className="font-bold text-xl mb-4">Users</p>
      <input
        onChange={async (e) => {
          setFilterValue(e.target.value);
          // changing filter value
        }}
        placeholder="Search users..."
        className="mb-6 outline outline-1 outline-grey-200 placeholder-gray-500 w-full p-2 rounded-md"
      />

      {usersArr.map((user, index) => (
        <User
          key={index}
          fName={user.firstName}
          lName={user.lastName}
          id={user._id}
        />
      ))}
    </div>
  );
}

export function User({ fName, lName, id }) {
  // const setToUserId = useSetRecoilState(recieverUserId);
  // const setToUserFullName = useSetRecoilState(recieverUserFullName);
  const navigate = useNavigate();

  const firstName = fName.charAt(0).toUpperCase() + fName.slice(1);
  const lastName = lName.charAt(0).toUpperCase() + lName.slice(1);

  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex">
        <img src={userPfp} className="w-10 h-10 rounded-full mr-1" />
        <p className="self-center">
          {firstName} {lastName}
        </p>
      </div>
      <button
        onClick={() => {
          // setToUserFullName(`${firstName} ${lastName}`);
          // setToUserId(id);

          // console.log("id : " + id)
          // console.log("state variable recieverId : " + recieverId);

          navigate(`/send?id=${id}&fName=${firstName}&lName=${lastName}`);
        }}
        className="bg-black-800 text-white p-2 px-4 rounded-md text-center hover:bg-black-600"
      >
        Send Money
      </button>
    </div>
  );
}
