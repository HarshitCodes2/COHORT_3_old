const fs = require('fs');
const { resolve } = require('path');

// function timeOut(){
//     console.log(100);
// }

// new Promise((resolve, reject) => {
//     setTimeout(timeOut, 1000);
//     resolve(console.log("Done timeout"));
// });


// function print(str){
//     console.log(str);
// }

// const read_file_promise = new Promise((resolve, reject) => {

//     fs.readFile('ab.txt', 'utf8', function (err, data) {
//         if(err){
//             reject("File Not Found!");
//         }else{
//             resolve(data);
//         }
//     })

// });

// read_file_promise 
//     .then(result => print(result))
//     .catch(err => print(err));



function read_file_promise(resolve){
    fs.readFile("b.txt", "utf8", (err, data) => {
        if(err){
    
        }else{
            resolve(data);
        }
    });
}

const p = new Promise(read_file_promise);

function callback(file){
    console.log(file);
}



// fs.writeFile("c.txt", "Hello Node!", (err) => {
//     if(err){
//         throw err;
//     }else{
//         console.log("File Written!");
//     }
// })


function write_file_promisified(resolve){
    fs.writeFile('c.txt', "Hello Write Promisified", (err)=>{
        if(err){
            
        }else{
            resolve("File Written");
        }
    })
}

const w = new Promise(write_file_promisified);

p.then(callback);

w.then((data)=>{
    console.log(data);
})

p.then(callback);

let fileName = "b.txt";

function cleanFile(resolve){
    fs.readFile(fileName, "utf8", (err, data)=>{
        data = data.trim();

        fs.writeFile(fileName, data, (err) => {
            resolve("File Updated");
        })
    })
}

const c = new Promise(cleanFile);

c.then((flag) => {
    console.log(flag);
    
    let np = new Promise(read_file_promise);
    np.then(callback);
})

