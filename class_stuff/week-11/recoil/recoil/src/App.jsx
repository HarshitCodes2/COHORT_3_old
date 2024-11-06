import { useState, createContext, useContext } from 'react'
import './App.css'

const CountContext = createContext()

function App() {
  
  return(
    <CountContextProvider>
      <Counter />
      <Increase />
      <Decrease />
    </CountContextProvider>
  )
  
}

function CountContextProvider({children}){
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={
      { count, setCount }
    }>
      {children}
    </CountContext.Provider>
  )
}

function Increase(){
  const { setCount } = useContext(CountContext);

  return (
    <div>
      <button style={{display:"inline-block"}} onClick={() => setCount(prev => prev + 1)}>Increase</button>
    </div>
  )

}

function Decrease(){
  const { setCount } = useContext(CountContext);

  return (
    <div>
      <button style={{display:"inline-block"}} onClick={() => setCount(prev => prev - 1)}>Decrease</button>
    </div>
  )
}

function Counter(){
  const { count } = useContext(CountContext);

  return (
    <div>
      <p>{count}</p>
    </div>
  )
}

export default App
