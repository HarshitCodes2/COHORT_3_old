function changeColor(str){
    console.log(str);
    let body = document.querySelector("body");
    body.setAttribute("style", `background-color: ${str}`);
}