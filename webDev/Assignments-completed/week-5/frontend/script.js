async function getidIterator(){
    const data = await axios.get("http://localhost:3000/");
    let idIterator = data.data["idIterator"];
    return idIterator;
}

async function getState(){
    const data = await axios.get("http://localhost:3000/");
    // console.log(data);
    
    let state = data.data["state"];
    // console.log(state);
    
    return state;
}

// let idIterator = getidIterator();
// let state = getState();

function setState(idIterator, state) {

    let dataToBeSent = {
        "idIterator" : idIterator,
        "state" : state
    }

    const status = axios.post("http://localhost:3000/", dataToBeSent);
}

// const jsonData = {
//     key1: 'value1',
//     key2: 'value2',
//     // Add your JSON data here
// };

// async function sendDataToBackend(data) {
//     try {
//         const response = await axios.post('http://localhost:3000/data', data, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         console.log('Response from backend:', response.data);
//     } catch (error) {
//         console.error('Error sending data to backend:', error);
//     }
// }

document.addEventListener('DOMContentLoaded', render);

async function addTaskToState(){
    const headingInp = document.querySelector("#taskHead");
    const subHeadingInp = document.querySelector("#taskSubHead");
    const priorityInp = document.querySelector("#taskPriority");
    const now = new Date();
    
    const taskHeading = headingInp.value;
    const taskSubHeading = subHeadingInp.value;
    const taskPriority = priorityInp.value;
    const time = now.toISOString();
    const section = "con-1";
    const status = "pending";

    headingInp.value = "";
    subHeadingInp.value = "";
    priorityInp.value = "";
    
    if(taskHeading == "" || taskSubHeading == ""){
        return;
    }

    let idIterator = await getidIterator();
    let state = await getState();

    state.push(
        {
            "id" : idIterator++,
            "heading" : taskHeading,
            "subHeading" : taskSubHeading,
            "priority" : taskPriority,
            "time" : time,
            "section" : section,
            "status" : status
        }
    );

    setState(idIterator, state);

    // console.log(state);

    render();
}

function formatDate(date){
    date = new Date(date);
    const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    return formattedDate;
}

async function deleteTask(id){
    console.log("Delete Button");

    let idIterator = await getidIterator();
    let state = await getState();

    state = state.filter(function (task) {
        return task.id != id;
    })

    setState(idIterator, state);   
    render();
}

async function completeTask(id){ // add hidden functionality
    console.log("Complete Button");

    let idIterator = await getidIterator();
    let state = await getState();

    for(let task in state){
        if(state[task].id == id) {
            state[task].status = "Complete";
        }
    }

    setState(idIterator, state);    
    render();
}

function resetForm(){  // hides the add todo form
    const formDiv = document.querySelector(".popUpFormDiv");
    formDiv.classList.add("hidden");

    const headingInp = document.querySelector("#taskHead");
    const subHeadingInp = document.querySelector("#taskSubHead");
    const priorityInp = document.querySelector("#taskPriority");

    headingInp.value = "";
    subHeadingInp.value = "";
    priorityInp.value = "";
}

function showTodoForm(){   // Dsiplays Add todo form
    const formDiv = document.querySelector(".popUpFormDiv");
    formDiv.classList.remove("hidden");
}

function addCardToContainers(taskId, taskHeading, taskSubHeading, taskPriority, taskTime, container){

    // console.log(taskHeading + " - " +taskSubHeading  + " - " + taskPriority);

    if(taskHeading == "" || taskSubHeading == ""){
        const formDiv = document.querySelector(".popUpFormDiv");
        formDiv.classList.add("hidden");
        return;
    }

    // Creating Card:
    let cardDiv = document.createElement("div");

    cardDiv.setAttribute("class", "card");
    cardDiv.setAttribute("id", `${taskId}`);
    cardDiv.classList.add(taskPriority);
    cardDiv.setAttribute("draggable", "true");

    // Card Head
    let cardHeadDiv = document.createElement("div");
    cardHeadDiv.setAttribute("class", "head");

    // Card Heading Div
    let cardHeadingsDiv = document.createElement("div");
    cardHeadingsDiv.setAttribute("class", "cardHeadingsDiv");

    // Card Heading
    let cardHeading = document.createElement("p");
    cardHeading.setAttribute("class", "cardHeading");
    cardHeading.innerHTML = taskHeading;


    // Card SubHeading
    let cardSubHeading = document.createElement("p");
    cardSubHeading.setAttribute("class", "cardSubHeading");
    cardSubHeading.innerHTML = taskSubHeading;

    cardHeadingsDiv.appendChild(cardHeading);
    cardHeadingsDiv.appendChild(cardSubHeading);

    cardHeadDiv.appendChild(cardHeadingsDiv);

    // Card Btn Div
    let cardBtnDiv = document.createElement("div");
    cardBtnDiv.setAttribute("class", "cardBtnDiv");

    // Card del Btn
    let deleteCardBtn = document.createElement("div");
    deleteCardBtn.setAttribute("class", "deleteCardBtn");
    deleteCardBtn.setAttribute("onclick", `deleteTask(${taskId})`);

    let deleteImg = document.createElement("img");
    deleteImg.setAttribute("src", "images/delete_outline_24px.svg");

    deleteCardBtn.appendChild(deleteImg);

    // Card complete Btn
    let completeCardBtn = document.createElement("div");
    completeCardBtn.setAttribute("class", "completeCardBtn");
    completeCardBtn.setAttribute("id", `completeTaskBtn-${taskId}`);
    completeCardBtn.setAttribute("onclick", `completeTask(${taskId})`);
    if(container != "con-4"){
        completeCardBtn.classList.add("hidden");
    }

    let doneImg = document.createElement("img");
    doneImg.setAttribute("src", "images/done_outline_24px.svg");

    completeCardBtn.appendChild(doneImg);

    cardBtnDiv.appendChild(deleteCardBtn);
    cardBtnDiv.appendChild(completeCardBtn);

    cardHeadDiv.appendChild(cardBtnDiv);

    // Card Body
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "status");

    // Priority
    let priority = document.createElement("p");
    priority.setAttribute("class", "priority");
    priority.classList.add(taskPriority);

    switch (taskPriority){
        case "low":
            priority.innerHTML = "Low";
            break;
        case "medium":
            priority.innerHTML = "Medium";
            break;
        case "high":
            priority.innerHTML = "High";
            break;
    }

    // Date Div
    let dateDiv = document.createElement("div");
    dateDiv.setAttribute("class", "dateCreated");

    // Icon
    let timeIcon = document.createElement("img");
    timeIcon.setAttribute("src", "images/query_builder_24px_rounded.svg");

    // Date
    let date = document.createElement("p");
    let formattedDate = formatDate(taskTime);
    date.innerHTML = formattedDate;

    dateDiv.appendChild(timeIcon);
    dateDiv.appendChild(date);

    // Calculate hours since taskTime
    let since = document.createElement("p");
    since.classList.add("time");
    let hoursSince = calculateHoursSince(taskTime);
    since.innerHTML = `${hoursSince} hr${hoursSince !== 1 ? 's' : ''} ago`;


    cardBodyDiv.appendChild(priority);
    cardBodyDiv.appendChild(dateDiv);
    cardBodyDiv.appendChild(since);


    // Card Div Appending 

    cardDiv.appendChild(cardHeadDiv);
    cardDiv.appendChild(cardBodyDiv);

    const containerToInsertIn = document.getElementById(`${container}`);
    containerToInsertIn.appendChild(cardDiv);

    updateCards();
}

// Function to calculate hours since a given time
function calculateHoursSince(isoString) {
    const givenTime = new Date(isoString);
    const currentTime = new Date();
    const timeDifference = currentTime - givenTime; // Difference in milliseconds
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert to hours
    return hoursDifference;
}

let cards = document.querySelectorAll(".card");

function updateCards(){  // To update card list, so that new added cards can be dragged and dropped
    cards = document.querySelectorAll(".card");
    // console.log(cards);
    cards.forEach(card => {
        card.addEventListener('dragstart', () => {
            // console.log(card);
            card.classList.add('dragging');
        })
        card.addEventListener('dragend', async () => {
            // console.log(card);
            card.classList.remove('dragging');

            let idIterator = await getidIterator();
            let state = await getState();
            
            for(let task in state){
                // console.log(state[task].heading);
                if(state[task].id == card.getAttribute("id")){
                    state[task].section = card.parentElement.getAttribute("id");
                }
            }
            setState(idIterator, state);

        })
    })
}

const containers = document.querySelectorAll(".container")

containers.forEach(container => {
    container.addEventListener('dragover', async (e) => {
        // console.log(container);
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");

        let state = await getState();

        for(let task of state){
            if(task.id == draggable.getAttribute("id")){
                task.section = container.getAttribute("id");
                // console.log("Task section - " + task.section);

                if(task.section == "con-4"){
                    let cmpBtn = document.getElementById(`completeTaskBtn-${task.id}`);
                    cmpBtn.classList.remove("hidden");
                }
                else{
                    let cmpBtn = document.getElementById(`completeTaskBtn-${task.id}`);
                    cmpBtn.classList.add("hidden");
                }
            }
        }

        // setInterval(setState(idIterator, state), 1000);

        // setState(idIterator, state);
        // console.log(draggable.getAttribute("id"));
        // console.log(container.getAttribute("id"));

        if(afterElement == null){
            container.appendChild(draggable);
        }
        else{
            container.insertBefore(draggable, afterElement);
        }



    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

     return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        // console.log(offset);

        if(offset < 0 && offset > closest.offset){
            return {offset : offset, element : child};
        }
        else{
            return closest;
        }


    }, {offset : Number.NEGATIVE_INFINITY}).element;
}

updateCards();

async function render(){
    let state = await getState();

    removeElementsWithClass('card');

    for(let task in state){
        // console.log(state[task].heading);
        if(state[task].status == "pending"){
            addCardToContainers(state[task].id,
                state[task].heading, 
                state[task].subHeading, 
                state[task].priority,  
                state[task].time, 
                state[task].section);
        }
    }

}

function removeElementsWithClass(className) {
    const elementsToRemove = document.querySelectorAll(`.${className}`);

    for (let element of elementsToRemove) {

        element.parentNode.removeChild(element);

    }
}

