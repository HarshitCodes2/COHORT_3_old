import React, { useState, useEffect } from 'react'
import axios from 'axios';

const RandomUser = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [pageNum, setPageNum] = useState(3);

  
  function callApi(){
    setPageNum(prev => prev + 1);
    setNumberOfUsers(document.getElementById("userNumber").value);
  }

  useEffect(() => {
    setError(false);
    const fetchPost = async () => {
      setLoading(true);
      try{
        const response = await axios.get(`https://randomuser.me/api/?page=${pageNum}&results=${numberOfUsers}`);
        const results = response.data.results;

        console.log(response);
        
        const newUsers = results.map(result => ({
          name: `${result.name.first} ${result.name.last}`,
          imgUrl: result.picture.medium
        }));

        setUsers(prevUsers => [...prevUsers, ...newUsers]);

        // console.log(users);
        setLoading(false);
      }catch(e){
        setError(true);
        setLoading(false);
        console.log(e);
      }
    }
    fetchPost();
  }, [pageNum])

  return (
    <div style={{padding:"50px", backgroundColor:"#dddddd", textAlign:"center", minHeight:"100vh"}}>
      <h1>Random users</h1>
      <div style={{display:"flex", flexWrap:"wrap", gap:"20px", width:"70vw", margin:"50px auto", justifyContent:"center"}}>
        {
          error ?
          <ErrorCard />
          :
          users.map((user, index) => (
            <UserCard key={index} name={user.name} imgUrl={user.imgUrl}/>
          ))
        }
        {
        loading ? 
          <Loader />
          :
          null
        }
      </div>
      <input type='number' id='userNumber' placeholder='Number of Users' style={{margin:"0px 20px 0px 0px", padding:"10px", fontSize:"19px" , height:"20px", borderRadius:"12px", border:"0px"}}></input>
      <button style={{padding:"10px", fontSize:"19px", borderRadius:"10px", border:"0px", backgroundColor:"#bdc3c7", }} onClick={callApi}>{error ? "Retry" : "Fetch Users"}</button>
    </div>
  )
}

function UserCard(props){
  return (
    <div style={{display:"inline-block", textAlign:"center", backgroundColor:"#ecf0f1", borderRadius:"12px", padding:"15px", width:"150px"}}>
        <img style={{borderRadius:"50%"}} src={props.imgUrl}></img>
        <h3>{props.name}</h3>
    </div>
  )
}

function ErrorCard(){
  return (
    <h1>Error Occured in fetching</h1>
  )
}

function Loader(){
  return (
    <p style={{alignSelf:"center"}}>Loading...</p>
  )
}

const Pagination = ({ postsPerPage, length}) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
      paginationNumbers.push(i);
  }

  return (
      <div className='pagination'>
          {paginationNumbers.map((pageNumber) => (
              <button key={pageNumber}>{pageNumber}</button>
          ))}
      </div>
  );
};

export default RandomUser