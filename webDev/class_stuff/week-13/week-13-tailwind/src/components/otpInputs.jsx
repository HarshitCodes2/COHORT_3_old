import { useState, useRef, useEffect } from "react";
import { inputRefs } from "../store/otpState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { otpValidity } from "../store/otpState";

export function OtpInputs({ inpNumber }) {
  const [allInputRefs, setInputRefs] = useRecoilState(inputRefs);

  let refsArray = [];
  
  for(let i = 0; i < inpNumber; i++){
    refsArray.push(useRef());
  }

  useEffect(() => {
    setInputRefs(refsArray);
  }, [inpNumber]);

  function populateWithInputs() {
    const inpArray = [];
    for(let i = 0; i < inpNumber; i++){
      inpArray.push(<InputBox lastInpBox={inpNumber} reference={refsArray[i]} id={i} key={i}/>)
    }
    return inpArray;
  }

  return <div>{populateWithInputs()}</div>;
}

function InputBox({ reference, lastInpBox, id }) {
  const [inputBoxVal, setInputBoxVal] = useState("");
  const allInputRefs = useRecoilValue(inputRefs);
  const setOtpValidity = useSetRecoilState(otpValidity);

  function onDone() {
    if (id < lastInpBox - 1) {
      allInputRefs[id + 1].current.focus();
    }else{
      let otpValue = 0;
      allInputRefs.map((inp, index) => {
        otpValue = otpValue * 10 + parseInt(inp.current.value);
      })
      if(otpValue){
        // console.log(otpValue);
        setOtpValidity(true);
      } 
    }
  }

  function goBack() {
    if (id > 0) {
      allInputRefs[id - 1].current.focus();
      allInputRefs[id - 1].current.select();
      setOtpValidity(false);
    }
  }

  return (
    <input
      ref={reference}
      value={inputBoxVal}
      onChange={(e) => {
        // console.log(e.target.value);
        if (0 <= parseInt(e.target.value) && parseInt(e.target.value) <= 9) {
          setInputBoxVal(parseInt(e.target.value));
          onDone();
        }else if(parseInt(e.target.value) > 10){
          onDone();
        }
      }}
      onKeyDown={(e) => {
        if (e.code == "Backspace") {
          e.target.value = "";
          goBack();
        }
      }}
      className={`mx-1 bg-blue-300 outline outline-1 outline-blue-200 py-3 px-3 w-9 text-center rounded-xl text-white`}
    />
  );
}
