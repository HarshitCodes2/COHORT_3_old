const fs = require('fs');


// fs.readFile('a.txt', 'utf8', (err, data) => {
//     if(err){

//     }else{
//         clean(data);
//     }
// })

function clean(data){
    
    let ans = "";
    let contSpace = 0;
    let  i = 0;
    for(i; i < data.length; i++){
        if(data[i] == ' '){
            contSpace++;
        }
        else{
            contSpace = 0;
        }
        if(contSpace <= 1){
            ans += data[i];
        }
    }

    return ans;

}



function readFilePromisified(resolve, reject){

    // fs.readFile('a.txt', 'utf8', clean);
    // resolve();
    fs.readFile('a.txt', 'utf8', (err, data) => {
        if(err){
            console.log('Error');
            reject("Error aa gyi yrr");
        }
        else{
            data = clean(data);
            resolve(data);
        }
    });
}

function writeFileOwn(data){
    fs.writeFile('a.txt', data, (err) => {
        return;
    })
}

function printError(errStr){
    console.log(errStr);
    
}

let rf = new Promise(readFilePromisified);
rf.then(writeFileOwn);
rf.catch(printError);
