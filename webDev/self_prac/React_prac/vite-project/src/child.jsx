import React from 'react'

function PassedState(props){

  function changeVar(){
    props.setVar(props.stateVar + 1);
  }

  return (
    <div>
      {props.stateVar}
      <br />
      <button onClick={changeVar}>Change var</button>
    </div>
  )
}

export default PassedState
