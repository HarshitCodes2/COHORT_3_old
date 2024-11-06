import "./App.css";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import { counterAtom, evenSelector } from "../store/atoms/counter";

function AppRecoil() {
  return (
    <RecoilRoot>
      <CounterComponent />
    </RecoilRoot>
  );
}

function CounterComponent() {
  // const count = useRecoilValue(counterAtom);

  return (
    <div>
      {/* <p>Counter : {count}</p> */}
      <Counter />
      <Increase />
      <Decrease />
      <Even />
    </div>
  );
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <div>
      <button
        style={{ display: "inline-block" }}
        onClick={() => setCount((prev) => prev + 2)}
      >
        Increase
      </button>
    </div>
  );
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);

  return (
    <div>
      <button
        style={{ display: "inline-block" }}
        onClick={() => setCount((prev) => prev - 1)}
      >
        Decrease
      </button>
    </div>
  );
}

function Counter() {
  const count = useRecoilValue(counterAtom);

  return (
    <div>
      <p>{count}</p>
    </div>
  );
}

function Even(){
  const isEven = useRecoilValue(evenSelector);

  return (
    <p>{isEven ? "Even" : "Odd"}</p>
  );
}

export default AppRecoil;
