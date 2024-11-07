import { useState, useEffect } from 'react'
import './App.css'
import PostComponent from './post'

function App() {
  const [posts, setPosts] = useState([]);

  function addPost(){
    setPosts([...posts, {
      imgUrl: "https://media.licdn.com/dms/image/v2/D4D03AQGwQcsLC8_WFQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1671972073917?e=1735776000&v=beta&t=nb62sPlmQ5VJoMKVmwbqE4_2Ne1R81MR0W-kZhEv3_0",
      name: "Harshit Gupta",
      subtitle: "200 followers",
      time: "25 h",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, ducimus ab libero vel veniam quidem distinctio cupiditate. Assumenda in fugit unde! At reiciendis consequuntur eveniet assumenda repellendus ab ullam praesentium!"
    }])
  }


  return <div style={{backgroundColor:"#dfe6e9", height:"100%", minHeight:"100vh", display:"flex", margin:"auto", padding:"20px 20px 20px 20%"}}>
    <div style={{ margin:0}}>
      <ProfileCard />
      <button style={{marginTop:"10px"}} onClick={addPost}>Add Post</button>
    </div>
    <div style={{display:'flex', flexDirection:"column"}}>
      {posts.map(post => (
        <PostComponent 
          imgUrl={post.imgUrl} 
          name={post.name} 
          subtitle={post.subtitle} 
          time={post.time} 
          description={post.description}
        />
      ))}
    </div>
  </div>
}

const profileCardStyle = {
  backgroundColor:"white",
  padding:"20px",
  margin:"10px",
  marginTop:"10px",
  position:"relative",
  top:"10px",
  width:"200px",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  borderRadius:"17px"
}

function ProfileCard(){
  return <div style={profileCardStyle}>
    <img style={{maxWidth:"50px", borderRadius:"50%", margin:"auto"}} src="https://media.licdn.com/dms/image/v2/D4D03AQGwQcsLC8_WFQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1671972073917?e=1735776000&v=beta&t=nb62sPlmQ5VJoMKVmwbqE4_2Ne1R81MR0W-kZhEv3_0"></img>
    <h4 style={{margin:"25px 0px 5px 0px"}}>Harshit Gupta</h4>
    <p style={{margin:"0px 0px 20px 0px", textAlign:"center"}}>Working with MERN stack to become a 100xDev</p>
    <hr style={{border:"0.5px solid #dfe6e9", width:"100%", marginBottom:"40px"}}/>
    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
      <p style={{margin:"5px"}}>Profile Viewers</p>
      <p style={{color:"#3498db", margin:"5px"}}>642</p>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
      <p style={{margin:"5px"}}>Post Impressions</p>
      <p style={{color:"#3498db", margin:"5px"}}>12422</p>
    </div>
  </div>
}

export default App
