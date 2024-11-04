function loadAdminSignup(){
    const navBtn = document.querySelector("#navbar-btn");
    navBtn.classList.remove("hidden");
    navBtn.innerHTML = "Sign in";
    navBtn.setAttribute("onclick", "loadAdminSignin()");

    const contentDiv = document.querySelector(".content-div");

    contentDiv.innerHTML = "";

    const signImg = document.createElement('img');
    signImg.setAttribute('src', 'images/daniela-e-U5CkO8iEl9I-unsplash-min.jpg');
    signImg.setAttribute('id', 'sign-form-img');


    contentDiv.appendChild(signImg);

    const signForm = document.createElement("div");
    signForm.setAttribute('id', 'sign-form');

    const signHeading = document.createElement("h2");
    signHeading.setAttribute('id', 'sign-heading');
    signHeading.innerHTML = "SIGN UP - ADMIN";

    const signFullname = document.createElement("input");
    signFullname.setAttribute('id', 'sign-fullname');
    signFullname.setAttribute('class', 'form-input');
    signFullname.setAttribute('type', 'text');
    signFullname.setAttribute('placeholder', 'Full Name');

    const signEmail = document.createElement("input");
    signEmail.setAttribute('id', 'sign-email');
    signEmail.setAttribute('class', 'form-input');
    signEmail.setAttribute('type', 'email');
    signEmail.setAttribute('placeholder', 'Email');

    const signPassword = document.createElement("input");
    signPassword.setAttribute('id', 'sign-password');
    signPassword.setAttribute('class', 'form-input');
    signPassword.setAttribute('type', 'password');
    signPassword.setAttribute('placeholder', 'Password');

    const signBtn = document.createElement("button");
    signBtn.setAttribute('id', 'form-btn');
    signBtn.setAttribute('onclick', 'adminSignup()');
    signBtn.innerHTML = "Sign Up";


    signForm.appendChild(signHeading);
    signForm.appendChild(signFullname);
    signForm.appendChild(signEmail);
    signForm.appendChild(signPassword);
    signForm.appendChild(signBtn);

    contentDiv.appendChild(signForm);
}

function loadUserSignup(){
    const navBtn = document.querySelector("#navbar-btn");
    navBtn.classList.remove("hidden");
    navBtn.innerHTML = "Sign in";
    navBtn.setAttribute("onclick", "loadUserSignin()");

    const contentDiv = document.querySelector(".content-div");

    contentDiv.innerHTML = "";

    const signImg = document.createElement('img');
    signImg.setAttribute('src', 'images/daniela-e-U5CkO8iEl9I-unsplash-min.jpg');
    signImg.setAttribute('id', 'sign-form-img');

    contentDiv.appendChild(signImg);


    const signForm = document.createElement("div");
    signForm.setAttribute('id', 'sign-form');

    const signHeading = document.createElement("h2");
    signHeading.setAttribute('id', 'sign-heading');
    signHeading.innerHTML = "SIGN UP";

    const signFullname = document.createElement("input");
    signFullname.setAttribute('id', 'sign-fullname');
    signFullname.setAttribute('class', 'form-input');
    signFullname.setAttribute('type', 'text');
    signFullname.setAttribute('placeholder', 'Full Name');

    const signEmail = document.createElement("input");
    signEmail.setAttribute('id', 'sign-email');
    signEmail.setAttribute('class', 'form-input');
    signEmail.setAttribute('type', 'email');
    signEmail.setAttribute('placeholder', 'Email');

    const signPassword = document.createElement("input");
    signPassword.setAttribute('id', 'sign-password');
    signPassword.setAttribute('class', 'form-input');
    signPassword.setAttribute('type', 'password');
    signPassword.setAttribute('placeholder', 'Password');

    const signBtn = document.createElement("div");
    signBtn.setAttribute('id', 'form-btn');
    signBtn.setAttribute('onclick', 'userSignup()');
    signBtn.innerHTML = "Sign Up";


    signForm.appendChild(signHeading);
    signForm.appendChild(signFullname);
    signForm.appendChild(signEmail);
    signForm.appendChild(signPassword);
    signForm.appendChild(signBtn);

    contentDiv.appendChild(signForm);
}

function loadAdminSignin(){
    const navBtn = document.querySelector("#navbar-btn");
    navBtn.classList.remove("hidden");
    navBtn.innerHTML = "Sign up";
    navBtn.setAttribute("onclick", "loadAdminSignup()");

    const contentDiv = document.querySelector(".content-div");

    contentDiv.innerHTML = "";

    const signImg = document.createElement('img');
    signImg.setAttribute('src', 'images/daniela-e-U5CkO8iEl9I-unsplash-min.jpg');
    signImg.setAttribute('id', 'sign-form-img');


    contentDiv.appendChild(signImg);

    const signForm = document.createElement("div");
    signForm.setAttribute('id', 'sign-form');

    const signHeading = document.createElement("h2");
    signHeading.setAttribute('id', 'sign-heading');
    signHeading.innerHTML = "SIGN IN - ADMIN";

    const signEmail = document.createElement("input");
    signEmail.setAttribute('id', 'sign-email');
    signEmail.setAttribute('class', 'form-input');
    signEmail.setAttribute('type', 'email');
    signEmail.setAttribute('placeholder', 'Email');

    const signPassword = document.createElement("input");
    signPassword.setAttribute('id', 'sign-password');
    signPassword.setAttribute('class', 'form-input');
    signPassword.setAttribute('type', 'password');
    signPassword.setAttribute('placeholder', 'Password');

    const signBtn = document.createElement("div");
    signBtn.setAttribute('id', 'form-btn');
    signBtn.setAttribute('onclick', 'adminSignin()');
    signBtn.innerHTML = "Sign In";


    signForm.appendChild(signHeading);
    signForm.appendChild(signEmail);
    signForm.appendChild(signPassword);
    signForm.appendChild(signBtn);

    contentDiv.appendChild(signForm);
}

function loadUserSignin(){
    const navBtn = document.querySelector("#navbar-btn");
    navBtn.classList.remove("hidden");
    navBtn.innerHTML = "Sign up";
    navBtn.setAttribute("onclick", "loadUserSignup()");

    const contentDiv = document.querySelector(".content-div");

    contentDiv.innerHTML = "";

    const signImg = document.createElement('img');
    signImg.setAttribute('src', 'images/daniela-e-U5CkO8iEl9I-unsplash-min.jpg');
    signImg.setAttribute('id', 'sign-form-img');

    contentDiv.appendChild(signImg);


    const signForm = document.createElement("div");
    signForm.setAttribute('id', 'sign-form');

    const signHeading = document.createElement("h2");
    signHeading.setAttribute('id', 'sign-heading');
    signHeading.innerHTML = "SIGN IN";

    const signEmail = document.createElement("input");
    signEmail.setAttribute('id', 'sign-email');
    signEmail.setAttribute('class', 'form-input');
    signEmail.setAttribute('type', 'email');
    signEmail.setAttribute('placeholder', 'Email');

    const signPassword = document.createElement("input");
    signPassword.setAttribute('id', 'sign-password');
    signPassword.setAttribute('class', 'form-input');
    signPassword.setAttribute('type', 'password');
    signPassword.setAttribute('placeholder', 'Password');

    const signBtn = document.createElement("div");
    signBtn.setAttribute('id', 'form-btn');
    signBtn.setAttribute('onclick', 'userSignin()');
    signBtn.innerHTML = "Sign In";


    signForm.appendChild(signHeading);
    signForm.appendChild(signEmail);
    signForm.appendChild(signPassword);
    signForm.appendChild(signBtn);

    contentDiv.appendChild(signForm);
}

async function adminSignup(){
    console.log("Admin SignUp Function Called");
    

    const nameInp = document.querySelector("#sign-fullname");
    const emailInp = document.querySelector("#sign-email");
    const pwdInp = document.querySelector("#sign-password");

    const fullName = nameInp.value;
    const email = emailInp.value;
    const password = pwdInp.value;

    const response = await axios.post("http://localhost:3000/admin/signup", {
        email : email,
        name : fullName,
        password : password
    });

    if(response.status == 301){
        alert("Invalid Inputs");
        return;
    }else{
        // alert(response.data.message);
        // console.log(response);
    }

    loadAdminSignin();
}

async function userSignup(){
    console.log("User SignUp Called");

    const nameInp = document.querySelector("#sign-fullname");
    const emailInp = document.querySelector("#sign-email");
    const pwdInp = document.querySelector("#sign-password");

    const fullName = nameInp.value;
    const email = emailInp.value;
    const password = pwdInp.value;

    const response = await axios.post("http://localhost:3000/user/signup", {
        email : email,
        fullName : fullName,
        password : password
    });

    if(response.status == 401){
        alert("Invalid Inputs");
    }

    loadUserSignin();
}

async function adminSignin(){
    const emailInp = document.querySelector("#sign-email");
    const pwdInp = document.querySelector("#sign-password");

    const email = emailInp.value;
    const password = pwdInp.value;

    const response = await axios.post("http://localhost:3000/admin/login", {
        email : email,
        password : password
    });

    if(response.status == 401){
        alert("Incorrect Creds");
        return;
    }

    const token = response.data.token;

    localStorage.setItem("token", token);

    const navBtn = document.querySelector("#navbar-btn");
    navBtn.innerHTML = "Log Out";
    navBtn.setAttribute("onclick", "logout()");

    loadAdminCoursePage();
}

async function userSignin(){
    
    const emailInp = document.querySelector("#sign-email");
    const pwdInp = document.querySelector("#sign-password");

    const email = emailInp.value;
    const password = pwdInp.value;

    const response = await axios.post("http://localhost:3000/user/login", {
        email : email,
        password : password
    });

    const token = response.data.token;

    localStorage.setItem("token", token);

    const navBtn = document.querySelector("#navbar-btn");
    navBtn.innerHTML = "Log Out";
    navBtn.setAttribute("onclick", "logout()");

    loadUserCoursePage();
}

function logout(){
    localStorage.removeItem("token");
    history.go(0);
}

async function loadAdminCoursePage(){
    const contentDiv = document.querySelector(".content-div");

    contentDiv.innerHTML = "";

    const coursesDiv = document.createElement("div");
    coursesDiv.setAttribute("id", "courses-div");

    contentDiv.appendChild(coursesDiv);

    const coursesHeadDiv = document.createElement("div");
    coursesHeadDiv.setAttribute("class", "courses-head-div");

    const coursesHeading = document.createElement("h1");
    coursesHeading.setAttribute("class", "courses-heading");
    coursesHeading.innerHTML = "My Courses";

    const addCourseBtn = document.createElement("button");
    addCourseBtn.setAttribute("class", "add-course-btn");
    addCourseBtn.setAttribute("onclick", "addCourseForm()");
    addCourseBtn.innerHTML = "Add Course";

    coursesDiv.appendChild(coursesHeadDiv);
    coursesHeadDiv.appendChild(coursesHeading);
    coursesHeadDiv.appendChild(addCourseBtn);

    const courseCardsDiv = document.createElement('div');
    courseCardsDiv.setAttribute('class', 'course-cards-div');

    coursesDiv.appendChild(courseCardsDiv);

    // console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    
    // make an api call and recieve items then code aage ka

    const respone = await axios.get("http://localhost:3000/admin/courses", {
        headers : {
            token : token
        }
    });

    console.log(respone);
    

    const courseList = respone.data.courseList;
    console.log(courseList);
    

    for(let course of courseList){
        const courseCard = document.createElement('div');
        courseCard.setAttribute('class', 'course-card');
        courseCard.setAttribute('id', `course-card-${course._id}`);

        const cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img');
        cardImg.setAttribute('id', `card-img-${course._id}`);
        cardImg.setAttribute('src', course.img);

        const cardInfoDiv = document.createElement('div');
        cardInfoDiv.setAttribute('class', 'card-info-div');
        cardInfoDiv.setAttribute('id', `card-info-div-${course._id}`);

        const cardHeading = document.createElement('h3');
        cardHeading.setAttribute('class', 'card-heading');
        cardHeading.setAttribute('id', `card-heading-${course._id}`);
        cardHeading.innerHTML = course.name;
        
        const author = document.createElement('h4');
        author.setAttribute('class', 'author');
        author.setAttribute('id', `author-${course._id}`);
        author.innerHTML = course.author;
        
        const cardDecs = document.createElement('p');
        cardDecs.setAttribute('class', 'card-desc');
        cardDecs.setAttribute('id', `card-desc-${course._id}`);
        cardDecs.innerHTML = course.desc;
        
        const cardCTA = document.createElement('div');
        cardCTA.setAttribute('class', 'card-cta');
        cardCTA.setAttribute('id', `card-cta-${course._id}`);
        
        const coursePrice = document.createElement('p');
        coursePrice.setAttribute('class', 'course-price');
        coursePrice.setAttribute('id', `course-price-${course._id}`);
        coursePrice.innerHTML = course.price + " Rs.";
        
        const cardCTABtn = document.createElement('button');
        cardCTABtn.setAttribute('class', 'course-cta');
        cardCTABtn.setAttribute('id', `course-cta-${course._id}`);
        cardCTABtn.setAttribute('onclick', `editCourseForm("${course._id}")`);
        cardCTABtn.innerHTML = "Edit";
        
        cardCTA.appendChild(coursePrice);
        cardCTA.appendChild(cardCTABtn);

        cardInfoDiv.appendChild(cardHeading);
        cardInfoDiv.appendChild(author);
        cardInfoDiv.appendChild(cardDecs);
        cardInfoDiv.appendChild(cardCTA);

        courseCard.appendChild(cardImg);
        courseCard.appendChild(cardInfoDiv);

        courseCardsDiv.appendChild(courseCard);
    }


}

async function loadUserCoursePage(){
    const contentDiv = document.querySelector(".content-div");

    contentDiv.innerHTML = "";

    const coursesDiv = document.createElement("div");
    coursesDiv.setAttribute("id", "courses-div");

    contentDiv.appendChild(coursesDiv);

    const coursesHeadDiv = document.createElement("div");
    coursesHeadDiv.setAttribute("class", "courses-head-div");

    const coursesHeading = document.createElement("h1");
    coursesHeading.setAttribute("class", "courses-heading");
    coursesHeading.innerHTML = "Courses";

    const boughtCourseBtn = document.createElement("button");
    boughtCourseBtn.setAttribute("class", "bought-course-btn");
    boughtCourseBtn.setAttribute("onclick", "loadBoughtCourses()");
    boughtCourseBtn.innerHTML = "View Purchased Courses";

    coursesDiv.appendChild(coursesHeadDiv);
    coursesHeadDiv.appendChild(coursesHeading);
    coursesHeadDiv.appendChild(boughtCourseBtn);

    const courseCardsDiv = document.createElement('div');
    courseCardsDiv.setAttribute('class', 'course-cards-div');

    coursesDiv.appendChild(courseCardsDiv);

    // make an api call and recieve items then code aage ka

    const respone = await axios.get("http://localhost:3000/user/courses",{
        headers : {
            token : localStorage.getItem("token")
        }
    });

    const courseList = respone.data.courseList;

    for(let course of courseList){
        const courseCard = document.createElement('div');
        courseCard.setAttribute('class', 'course-card');

        const cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img');
        cardImg.setAttribute('src', course.img);

        const cardInfoDiv = document.createElement('div');
        cardInfoDiv.setAttribute('class', 'card-info-div');

        const cardHeading = document.createElement('h3');
        cardHeading.setAttribute('class', 'card-heading');
        cardHeading.innerHTML = course.name;
        
        const author = document.createElement('h4');
        author.setAttribute('class', 'author');
        author.innerHTML = course.author;
        
        const cardDecs = document.createElement('p');
        cardDecs.setAttribute('class', 'card-desc');
        cardDecs.innerHTML = course.desc;
        
        const cardCTA = document.createElement('div');
        cardCTA.setAttribute('class', 'card-cta');
        
        const coursePrice = document.createElement('p');
        coursePrice.setAttribute('class', 'course-price');
        coursePrice.innerHTML = course.price + " Rs.";
        
        const cardCTABtn = document.createElement('button');
        cardCTABtn.setAttribute('class', 'course-cta');
        cardCTABtn.setAttribute('onclick', `buyCourse("${course._id}")`);
        cardCTABtn.innerHTML = "Buy Now";
        
        cardCTA.appendChild(coursePrice);
        cardCTA.appendChild(cardCTABtn);

        cardInfoDiv.appendChild(cardHeading);
        cardInfoDiv.appendChild(author);
        cardInfoDiv.appendChild(cardDecs);
        cardInfoDiv.appendChild(cardCTA);

        courseCard.appendChild(cardImg);
        courseCard.appendChild(cardInfoDiv);

        courseCardsDiv.appendChild(courseCard);
    }

}

async function loadBoughtCourses(){
    const contentDiv = document.querySelector(".content-div");

    contentDiv.innerHTML = "";

    const coursesDiv = document.createElement("div");
    coursesDiv.setAttribute("id", "courses-div");

    contentDiv.appendChild(coursesDiv);

    const coursesHeadDiv = document.createElement("div");
    coursesHeadDiv.setAttribute("class", "courses-head-div");

    const coursesHeading = document.createElement("h1");
    coursesHeading.setAttribute("class", "courses-heading");
    coursesHeading.innerHTML = "Courses";

    const allCourseBtn = document.createElement("button");
    allCourseBtn.setAttribute("class", "all-course-btn");
    allCourseBtn.setAttribute("onclick", "loadUserCoursePage()");
    allCourseBtn.innerHTML = "View All Courses";

    coursesDiv.appendChild(coursesHeadDiv);
    coursesHeadDiv.appendChild(coursesHeading);
    coursesHeadDiv.appendChild(allCourseBtn);

    const courseCardsDiv = document.createElement('div');
    courseCardsDiv.setAttribute('class', 'course-cards-div');

    coursesDiv.appendChild(courseCardsDiv);

    // make an api call and recieve items then code aage ka

    const respone = await axios.get("http://localhost:3000/user/purchasedCourses",{
        headers : {
            token : localStorage.getItem("token")
        }
    });

    const courseList = respone.data.courseList;

    for(let course of courseList){
        const courseCard = document.createElement('div');
        courseCard.setAttribute('class', 'course-card');

        const cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'card-img');
        cardImg.setAttribute('src', course.img);

        const cardInfoDiv = document.createElement('div');
        cardInfoDiv.setAttribute('class', 'card-info-div');

        const cardHeading = document.createElement('h3');
        cardHeading.setAttribute('class', 'card-heading');
        cardHeading.innerHTML = course.name;
        
        const author = document.createElement('h4');
        author.setAttribute('class', 'author');
        author.innerHTML = course.author;
        
        const cardDecs = document.createElement('p');
        cardDecs.setAttribute('class', 'card-desc');
        cardDecs.innerHTML = course.desc;
        
        const cardCTA = document.createElement('div');
        cardCTA.setAttribute('class', 'card-cta');
        
        const coursePrice = document.createElement('p');
        coursePrice.setAttribute('class', 'course-price');
        coursePrice.innerHTML = course.price + " Rs.";
        
        const cardCTABtn = document.createElement('button');
        cardCTABtn.setAttribute('class', 'course-cta');
        cardCTABtn.setAttribute('onclick', `courseDetails(${course._id})`);
        cardCTABtn.innerHTML = "View Details";
        
        cardCTA.appendChild(coursePrice);
        cardCTA.appendChild(cardCTABtn);

        cardInfoDiv.appendChild(cardHeading);
        cardInfoDiv.appendChild(author);
        cardInfoDiv.appendChild(cardDecs);
        cardInfoDiv.appendChild(cardCTA);

        courseCard.appendChild(cardImg);
        courseCard.appendChild(cardInfoDiv);

        courseCardsDiv.appendChild(courseCard);
    }
}


function addCourseForm(){
    const addCourseForm = document.querySelector("#add-course-form");
    addCourseForm.classList.remove("hidden");
}

async function addCourse(){
    const addCourseForm = document.querySelector("#add-course-form");
    addCourseForm.classList.add("hidden");

    console.log("Add Course Function Called");
    

    const courseName = document.querySelector("#course-name").value;
    const courseDesc = document.querySelector("#course-desc").value;
    const coursePrice = parseInt(document.querySelector("#course-price").value);
    const courseImgUrl = document.querySelector("#course-img-url").value;

    document.querySelector("#course-name").value = "";
    document.querySelector("#course-desc").value = "";
    document.querySelector("#course-price").value = "";
    document.querySelector("#course-img-url").value = "";

    const response = await axios.post("http://localhost:3000/admin/courses",{
        courseName : courseName,
        courseDesc : courseDesc,
        coursePrice : coursePrice,
        courseImgUrl : courseImgUrl
    }, {
        headers : {
            token : localStorage.getItem("token")
        }
    });

    // console.log(response);

    if(response.status == 200){
        // alert("Course Created");
    }else if(response.status == 401){
        alert("Invalid Creds");
    }else{
        alert(response.data.message);
        console.log(response);
    }

    loadAdminCoursePage();
}

function editCourseForm(courseId){
    // console.log(courseId + " Edit Course Form Called");
    
    const imgUrl = document.querySelector(`#card-img-${courseId}`).src;
    const heading = document.querySelector(`#card-heading-${courseId}`).innerHTML;
    const desc = document.querySelector(`#card-desc-${courseId}`).innerHTML;
    const price = document.querySelector(`#course-price-${courseId}`).innerHTML;

    const editForm = document.querySelector("#edit-course-form");
    editForm.classList.remove("hidden");

    const headField = document.querySelector("#course-name-edit");
    const descField = document.querySelector("#course-desc-edit");
    const priceField = document.querySelector("#course-price-edit");
    const imgField = document.querySelector("#course-img-url-edit");
    const courseIdInp = document.querySelector("#course-id");
    // courseIdInp.classList.remove("hidden");

    headField.value = heading;
    descField.value = desc;
    priceField.value = price;
    imgField.value = imgUrl;
    courseIdInp.value = courseId;
}

async function editCourse(){
    console.log("Edit Course Called");

    const editForm = document.querySelector("#edit-course-form");
    editForm.classList.add("hidden");

    const headField = document.querySelector("#course-name-edit");
    const descField = document.querySelector("#course-desc-edit");
    const priceField = document.querySelector("#course-price-edit");
    const imgField = document.querySelector("#course-img-url-edit");
    const courseIdInp = document.querySelector("#course-id");
    
    courseName = headField.value;
    courseDesc = descField.value;
    coursePrice = priceField.value;
    courseImgUrl = imgField.value;
    courseId = courseIdInp.value;

    headField.value = "";
    descField.value = "";
    priceField.value = "";
    imgField.value = "";
    courseIdInp.value = "";

    const response = await axios.put(`http://localhost:3000/admin/courses/${courseId}`, {
        courseName : courseName,
        courseDesc : courseDesc,
        coursePrice : coursePrice,
        courseImgUrl : courseImgUrl
    }, {
        headers : {
            token : localStorage.getItem("token")
        }
    });
    
    if(response.status == 200){
        alert("Course Edited");
    }else{
        alert(response.data.message);
        console.log(response);
    }
    loadAdminCoursePage();
}

async function buyCourse(courseId){
    // Code this and then do fetch bought courses

    console.log(`http://localhost:3000/user/courses/${courseId}`);
    

    const response = await axios.post(`http://localhost:3000/user/courses/${courseId}`, {},{
        headers : {
            token : localStorage.getItem("token")
        }
    });

    if(response.status == 200){
        // alert("Course Bought");
    }else{
        alert("Error Faced");
    }

    loadUserCoursePage();
}

function closeAddForm(){
    document.querySelector("#add-course-form").classList.add("hidden");
}

function closeEditForm(){
    document.querySelector("#edit-course-form").classList.add("hidden");
}
