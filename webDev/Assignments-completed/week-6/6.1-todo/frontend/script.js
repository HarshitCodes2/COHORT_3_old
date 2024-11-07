const API_URL = 'http://localhost:3001';

// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', async () => {
  // fetch todos
    // console.log("DOM LOADED FROM SCRIPT");
    const todoListDiv = document.querySelector("#todo-list");

    todoListDiv.innerHTML = "";

    const token = localStorage.getItem("token");
    
    let todosResponse;
    try{

        todosResponse = await axios.get(API_URL + "/todos",{
            headers : {
                token : token
            }
        });
    }catch(e){
        console.log(e.status);
        alert("Invalid Credentials");
        return;
    }
        
    let todoList = todosResponse.data.todoList;

    for(let todo of todoList){
        addTodoToDOM(todo);
    }
});

// Fetch todos from backend
async function fetchTodos() {
    //  write here
    const todoListDiv = document.querySelector("#todo-list");

    todoListDiv.innerHTML = "";

    const token = localStorage.getItem("token");
    
    let todosResponse;
    try{

        todosResponse = await axios.get(API_URL + "/todos",{
            headers : {
                token : token
            }
        });
    }catch(e){
        console.log(e.status);
        alert("Invalid Credentials");
        return;
    }
        
    let todoList = todosResponse.data.todoList;

    for(let todo of todoList){
        addTodoToDOM(todo);
    }
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
    //  write here
    
    let task = todo.task; 
    let taskId = todo.id;

    const todoList = document.querySelector("#todo-list");

    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task-div");
    taskDiv.setAttribute("id", `task-${taskId}`);

    const taskContent = document.createElement("p");
    taskContent.innerHTML = task;

    const taskDelBtn = document.createElement("button");
    taskDelBtn.setAttribute("class", "task-del-btn");
    taskDelBtn.setAttribute("onclick", `deleteTodo(${taskId})`);

    const delIcon = document.createElement("img");
    delIcon.setAttribute("src", "images/delete_outline_24px.svg");

    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(taskDelBtn);
    taskDelBtn.appendChild(delIcon);

    todoList.appendChild(taskDiv);

}

// // Add a new todo
// document.getElementById('add-todo-btn').addEventListener('click', () => {
//     //  write here
// });

async function addTodo() {
    const token = localStorage.getItem("token");
    const todoInp = document.querySelector("#todo-input");
    const task = todoInp.value;

    let response;
    try{
        response = await axios.post(API_URL + "/todos", {
            task : task,
        }, {
            headers : {
                token : token
            }
        });
    }catch(e){
        console.log(e.status);
        alert("Invalid Credentials");
        return;
    }
    fetchTodos();
}

// Delete a todo
async function deleteTodo(id) {
    // write here  
    const token = localStorage.getItem("token");

    let response;
    try{
        response = await axios.post(API_URL + "/delete", {
            id : id,
        }, {
            headers : {
                token : token
            }
        });
    }catch(e){
        console.log(e.status);
        alert("Invalid Credentials");
        return;
    }

    fetchTodos();
}

