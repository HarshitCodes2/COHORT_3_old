import React from 'react'

const headerStyle = {
  backgroundColor: "#c59771bd",
  padding:"15px",
  marginBottom:"20px"
}

function Header(prop){

  return (
    <div style={headerStyle}>
      <h1>{prop.message}</h1>
    </div>
  )
}

export default Header