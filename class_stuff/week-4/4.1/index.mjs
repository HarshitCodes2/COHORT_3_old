import fs, { copyFileSync } from 'fs'
import { program } from 'commander'

program
    .option('-cw, --countwords <path>')

program.parse();
    
const options = program.opts();

const filepath = options.countwords;

function countWords(string){
    let strArr = string.split('');
    console.log(strArr.length);
}

function readFilePromisified(filepath){
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, 'utf8', function (err, data) {
            if(err){
                reject(err.message);
            }else{
                resolve(data);
            }
        })
    })
}


readFilePromisified(filepath).then((data) => {
    countWords(data);
}).catch((err) => {
    console.log("Error : "+err);
});






