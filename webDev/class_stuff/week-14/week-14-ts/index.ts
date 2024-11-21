interface User {
  name: string,
  age: number
}

function areLegal(users: User[]): boolean [] {
  let ans : boolean [] = [];

  for(let i = 0; i < users.length; i++){
    ans.push(users[i].age >= 18);
  }

  return ans;
}


let users: User[] = [
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

let legalList: boolean [] = areLegal(users);

console.log(legalList);

