const fs = require('fs');

class my_promise{
    constructor(fn){
        this.fn = fn;
        const afterDone = (data) => {
            this.resolve(data);
        };
        this.fn(afterDone);
    }
    then(callback){
        this.resolve = callback;
    }
}

function readFilePromisified(resolve){
    fs.readFile('c.txt', 'utf8', function(err, data) {
        if (err) {
            
        }else{
            resolve(data);
        }
    })
}

function printFile(data){
    console.log(data);
}

let q = new my_promise(readFilePromisified)
q.then(printFile);

// function setTimeoutPromisified(resolve){
//     setTimeout(function (){ 
//         console.log("Promise made " + typeof resolve);
//         resolve(); 
//      },3000);
// }

// // let p = new my_promise(setTimeoutPromisified);
// // p.then(callback);

// function callback() {
//     console.log("Haha");
// }