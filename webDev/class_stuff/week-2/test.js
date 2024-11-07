// // function timeout(){
// //     console.log('Timeout');
// // }

// // function to1(){
// //     console.log('hahalol');
// // }

// // console.log("hello");

// // setTimeout(timeout, 1000);

// // console.log("second");

// // let c = 0;

// // setTimeout(to1, 500);


// // function main(obj){
// //     console.log(obj);
// // }


// // setTimeout(main, 3000);


// function random(resolve){
//     console.log("Random Started");
//     let i = 0;
//     while(i < 1000000){
//         i++;
//     }
//     console.log("Random Completed");
//     resolve(i);
// }

// const p = new Promise(random);

// function callback(i){
//     console.log("callback is called i = " + i);
// }

// p.then(callback);


let a = {
    'a' : 1,
}

a['b'] = 2;

console.log(a);
