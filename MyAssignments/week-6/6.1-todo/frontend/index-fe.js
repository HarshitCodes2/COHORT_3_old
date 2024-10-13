const API_URL = 'http://localhost:3001';

async function signup() {
    // console.log("SignUp");
     
    const username = document.querySelector("#signup-username").value;
    const password = document.querySelector("#signup-password").value;

    let response;

    try{
        response = await axios.post(API_URL + "/signup",{
            username : username,
            password : password
        });
    }catch(e){
        console.log(e.status);
        alert("Invalid Credentials");
        return;
    }

    // console.log(response);
    
    document.querySelector("html").innerHTML = response.data;
}

async function signin() {
    // console.log("SignIn");
     
    const username = document.querySelector("#signin-username").value;
    const password = document.querySelector("#signin-password").value;

    let response
    try{
        response = await axios.post(API_URL + "/signin",{
            username : username,
            password : password
        });
    }catch(e){
        console.log(e.status);
        alert("Invalid Credentials");
        return;
    }

    console.log(response);

    const token = response.data.token;

    localStorage.setItem("token", token);

    const file = response.data.fileUrl;
    
    window.location.href = file;
}
