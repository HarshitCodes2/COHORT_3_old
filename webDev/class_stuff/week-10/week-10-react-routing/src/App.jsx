import { useState } from 'react';
import './App.css';
import { useContext, createContext } from 'react';

// import { BrowserRouter, Routes, Route, Link, Outlet} from "react-router-dom";

// function App() {

//   const routes = [
//     {
//       path: "",
//       element: <Home />
//     },
//     {
//       path: "route1",
//       element: <Route1 />
//     },
//     {
//       path: "route2",
//       element: <Route2 />
//     },

//   ]

//   return (
//     <div style={{textAlign:"center"}}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/sappy" element={<Layout />}>
//             {routes.map((route) => <Route path={route.path} element={route.element} />)}
//           </Route>
//           <Route path="*" element={<ErrorPage />}/>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

const CounterContext = createContext();

function CounterContextProvider({ children }){
  const [count, setCount] = useState(0);

  return(
    <CounterContext.Provider value={
      {count, setCount}
    }>
      {children}
    </CounterContext.Provider>
  )

}


function App(){


  return(
    <>
      <CounterContextProvider>
        <IncreaseCount />
        <DecreaseCount />
        <Value />
      </CounterContextProvider>
    </>
  )
}

function IncreaseCount(){
  const { setCount } = useContext(CounterContext);
  
  return (
    <button onClick={() => setCount(prevVal => prevVal + 1)}>Increase</button>
  )
}

function DecreaseCount(){
  const { setCount } = useContext(CounterContext);
  return (
    <button onClick={() => setCount(prevVal => prevVal - 1)}>Decrease</button>
  )
}

function Value(){
  const { count } = useContext(CounterContext);
  return (
    <p>{count}</p>
  )
}

export default App