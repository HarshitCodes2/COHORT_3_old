"use strict";
function areLegal(users) {
    let ans = [];
    for (let i = 0; i < users.length; i++) {
        ans.push(users[i].age >= 18);
    }
    return ans;
}
let users = [
    {
        name: "harshit",
        age: 21
    },
    {
        name: "Prakhar",
        age: 22
    },
    {
        name: "Mohit",
        age: 16
    },
    {
        name: "Anika",
        age: 17
    }
];
let legalList = areLegal(users);
console.log(legalList);
