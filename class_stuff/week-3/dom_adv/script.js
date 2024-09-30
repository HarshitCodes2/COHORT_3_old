let todos = [];

function addTodo(){
    todos.push({
        title : document.querySelector("input").value
    });
    render();
}

function render(){

    let listDiv = document.getElementById("todo-list");
    listDiv.innerHTML="";
    
    for(let todo = 0; todo < todos.length; todo++){

        let ind = todo + 1;
        // console.log(ind);

        let holdingDiv = document.createElement("div");
        holdingDiv.setAttribute("style", "margin:10px; display:flex; width:200px; justify-content:space-between");
        holdingDiv.setAttribute("class", "todo-item");
        holdingDiv.setAttribute("id", "todo-"+ind);
        
        let textSpan = document.createElement("span");
        textSpan.innerHTML = ind + ". " + todos[todo].title;
        // console.log(ind + ". ");
        
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("style", "right:0");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("onclick", "deleteTodo("+ind+")");
        
        listDiv.appendChild(holdingDiv);
        holdingDiv.appendChild(textSpan);
        holdingDiv.appendChild(deleteButton);
        
    }
}

function deleteTodo(ind){

    let elem = todos[ind - 1];
    todos = todos.filter((todo) => {if(todo != elem) {return todo}});
    // console.log(todos);
    render();
}


