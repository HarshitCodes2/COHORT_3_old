people = [
    {
        name : "Harshit",
        age : 21,
        gender : 'M'
    },{
        name: "Alice",
        age: 19,
        gender: 'F'
    },{
        name: "Bob",
        age: 14,
        gender: 'M'
    },{
        name: "Charlie",
        age: 16,
        gender: 'M'
    },{
        name: "Deigo",
        age: 28,
        gender: 'M'
    }
]

function isAdultMale(user){
    return user.gender == "M" && user.age > 18;
}


function adult_males(users){
    let adult_males_list = users.filter(isAdultMale);
    console.log(adult_males_list);
}


adult_males(people);
