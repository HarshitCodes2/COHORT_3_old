let counter = 0;
let time = new Date();

function counterInc(){
    counter++;
    console.log(counter);
    let timeNow = new Date(time.getTime() + counter * 1000);
    console.log(timeNow.getHours()+':'+timeNow.getMinutes()+':'+timeNow.getSeconds());
    
    console.log(timeNow.getHours()+':'+timeNow.getMinutes()+':'+timeNow.getSeconds());
}

setInterval(counterInc, 1000);




