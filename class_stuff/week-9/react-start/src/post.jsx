const postComponentStyle = {
  backgroundColor:"white",
  padding:"20px",
  margin:"10px",
  position:"relative",
  top:"10px",
  width:"400px",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  borderRadius:"17px"
}

function PostComponent({imgUrl, name, subtitle, time, description}){
  return <div style={postComponentStyle}>
    <div style={{display:'flex', alignSelf:"flex-start"}}>
      <img style={{maxWidth:"50px", borderRadius:"50%", margin:"auto"}} src={imgUrl}></img>
      <div style={{margin:"0px 0px 0px 10px"}}>
        <h3 style={{margin:"0px"}}>{name}</h3>
        <p style={{margin:"0px", color:"#95a5a6"}}>{subtitle}</p>
        {time !== undefined ?
        <p style={{margin:"0px", color:"#95a5a6"}}>{time}</p> : null}
      </div>
    </div>
    <p>
      {description}
    </p>
  </div>
}

export default PostComponent
