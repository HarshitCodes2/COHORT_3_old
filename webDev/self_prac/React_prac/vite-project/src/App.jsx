import { useState } from 'react'
import './App.css'
import PassedState from "./child"

function App() {
  const [stateVar, setVar] = useState(0);

  return (
    <div>
      {stateVar}
      <br />
      Hello
      <PassedState stateVar={stateVar} setVar={setVar} />
    </div>
  ) 
}

export default App
