let a = 2;

try{
    console.log("Blah Blah Blah 1");
    
    if (a == 1){
        throw("a = 1");
    }
    console.log("Blah Blah Blah 2");
    
}catch(e){
    console.log(e);
}

console.log("Blah Blah 3");