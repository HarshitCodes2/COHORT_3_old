function formatDate(date){
    const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    return formattedDate;
}


function addTodo(){
    const formDiv = document.querySelector(".popUpFormDiv");
    formDiv.classList.remove("hidden");
}

function addCard(){
    const headingInp = document.querySelector("#taskHead");
    const subHeadingInp = document.querySelector("#taskSubHead");
    const priorityInp = document.querySelector("#taskPriority");

    const taskHeading = headingInp.value;
    const taskSubHeading = subHeadingInp.value;
    const taskPriority = priorityInp.value;

    headingInp.value = "";
    subHeadingInp.value = "";
    priorityInp.value = "";

    // console.log(taskHeading + " - " +taskSubHeading  + " - " + taskPriority);

    if(taskHeading == "" || taskSubHeading == ""){
        const formDiv = document.querySelector(".popUpFormDiv");
        formDiv.classList.add("hidden");
        return;
    }

    // Creating Card:
    let cardDiv = document.createElement("div");

    cardDiv.setAttribute("class", "card");
    cardDiv.classList.add(taskPriority);
    cardDiv.setAttribute("draggable", "true");

    // Card Head
    let cardHeadDiv = document.createElement("div");
    cardHeadDiv.setAttribute("class", "head");

    // Card Heading
    let cardHeading = document.createElement("p");
    cardHeading.setAttribute("class", "cardHeading");
    cardHeading.innerHTML = taskHeading;


    // Card SubHeading
    let cardSubHeading = document.createElement("p");
    cardSubHeading.setAttribute("class", "cardSubHeading");
    cardSubHeading.innerHTML = taskSubHeading;

    cardHeadDiv.appendChild(cardHeading);
    cardHeadDiv.appendChild(cardSubHeading);


    // Card Body
    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.setAttribute("class", "status");

    // Priority
    let priority = document.createElement("p");
    priority.setAttribute("class", "priority");
    priority.classList.add(taskPriority);

    switch (taskPriority){
        case "green":
            priority.innerHTML = "Low";
            break;
        case "yellow":
            priority.innerHTML = "Medium";
            break;
        case "red":
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
    let now = new Date();
    let formattedDate = formatDate(now);
    date.innerHTML = formattedDate;

    dateDiv.appendChild(timeIcon);
    dateDiv.appendChild(date);

    // Static Since - Need To Change this Code
    let since = document.createElement("p");
    since.classList.add("time");
    since.innerHTML = "1 hr ago";


    cardBodyDiv.appendChild(priority);
    cardBodyDiv.appendChild(dateDiv);
    cardBodyDiv.appendChild(since);


    // Card Div Appending 

    cardDiv.appendChild(cardHeadDiv);
    cardDiv.appendChild(cardBodyDiv);

    const containerToInsertIn = document.querySelector(".container.left");
    containerToInsertIn.appendChild(cardDiv);

    const formDiv = document.querySelector(".popUpFormDiv");
    formDiv.classList.add("hidden");

    updateCards();
}

let cards = document.querySelectorAll(".card");

function updateCards(){
    cards = document.querySelectorAll(".card");
    console.log(cards);
    cards.forEach(card => {
        card.addEventListener('dragstart', () => {
            console.log(card);
            card.classList.add('dragging');
        })
        card.addEventListener('dragend', () => {
            // console.log(card);
            card.classList.remove('dragging');
        })
    })
}

const containers = document.querySelectorAll(".container")



containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        // console.log(container);
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");

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
