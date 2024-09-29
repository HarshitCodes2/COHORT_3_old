let n = 0;

function btnClick(){
    let inp = document.getElementById("todo-ip");
    let val = inp.value;
    let elem = document.createElement("div");
    let parent = document.getElementById("todo-div");
    n = n + 1;
    elem.setAttribute('class', 'todo-item');
    elem.setAttribute('id', `todo-${n}`);
    elem.innerHTML = `<h4> ${val} </h4> \n 
    <button onclick="todoDelete(${n})"> Delete </button>`;
    parent.appendChild(elem);
    inp.value = "";
}


function todoDelete(index){
    let parent = document.getElementById("todo-div");
    let el = document.getElementById(`todo-${index}`);
    parent.removeChild(el);
}
