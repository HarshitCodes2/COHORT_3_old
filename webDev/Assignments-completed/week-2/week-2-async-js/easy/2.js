
// let counter0 = 0;
// const startTime = new Date();
// let startTimeInSec = startTime.getSeconds();

// while(1){
//     const currTime = new Date();
//     let currTimeInSec = currTime.getSeconds();

//     if(currTimeInSec - startTimeInSec == 1){
//         startTimeInSec = currTimeInSec;
//         counter0++;
//         console.log(counter0);
//     }
// }


let counter = 0;

function incCounter(){
    counter++;
    console.log(counter);
    cont();
}

function cont(){
    setTimeout(incCounter, 1000);
}

cont();
