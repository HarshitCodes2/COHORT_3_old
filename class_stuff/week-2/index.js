const fs = require('fs');


fs.readFile('a.txt', 'utf8', function (err, data) {
    console.log(data);
});

fs.readFile('b.txt', 'utf8', function (err, data) {
    console.log(data);
});

// console.log(fs.readFileSync("a.txt", "utf8"));

// console.log(fs.readFileSync("b.txt", "utf8"));
