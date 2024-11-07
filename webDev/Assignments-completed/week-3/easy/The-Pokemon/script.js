function getId(){
    let input = document.querySelector('input');
    let id = input.value;
    if(id == ""){
        alert("Enter Name or Id");
        return;
    }
    getPokeMonAsync(id);
    input.value = "";
}

function fetchPromisified(link){
    let responsePromise = fetch(link);
    return responsePromise;
}

function getData(res){
    return res.json();
}

function updateState(data){
    let types = data.types;
    let stats = data.stats;
    let imgLink = data.sprites.front_default;
    let pokemonName = data.name;
    let pokemonId = data.id;

    return {
        imgSrc : imgLink,
        id : pokemonId,
        name : pokemonName,
        types : types,
        stats : stats
    };
}


function populateTypes(types){
    let typeDiv = document.createElement("div");
    typeDiv.setAttribute("id", "types");

    let typeHeading = document.createElement("h3");
    typeHeading.innerHTML = "Types :";
    
    typeDiv.appendChild(typeHeading);
    
    for(let i in types){
        let type = types[i];
        // console.log(type.type.name);

        let typeH = document.createElement("h3");
        typeName = type.type.name;

        switch (typeName){
            case "normal":
                typeH.setAttribute("style", "border-color: #AAAA99")
                break;
            
            case "fire":
                typeH.setAttribute("style", "border-color: #FF4422")
                break;
            
            case "water":
                typeH.setAttribute("style", "border-color: #3399FE")
                break;
            
            case "electric":
                typeH.setAttribute("style", "border-color: #FFCC33")
                break;
            
            case "grass":
                typeH.setAttribute("style", "border-color: #76CC55")
                break;
            
            case "ice":
                typeH.setAttribute("style", "border-color: #65CCFF")
                break;
            
            case "fighting":
                typeH.setAttribute("style", "border-color: #BA5544")
                break;
            
            case "poison":
                typeH.setAttribute("style", "border-color: #AA5599")
                break;
            
            case "ground":
                typeH.setAttribute("style", "border-color: #DCBB54")
                break;
            
            case "flying":
                typeH.setAttribute("style", "border-color: #8898FF")
                break;
            
            case "psychic":
                typeH.setAttribute("style", "border-color: #FF5599")
                break;
            
            case "bug":
                typeH.setAttribute("style", "border-color: #AABA23")
                break;
            
            case "rock":
                typeH.setAttribute("style", "border-color: #BBAA66")
                break;
            
            case "ghost":
                typeH.setAttribute("style", "border-color: #6666BA")
                break;
            
            case "dragon":
                typeH.setAttribute("style", "border-color: #7666EE")
                break;
            
            case "dark":
                typeH.setAttribute("style", "border-color: #775444")
                break;
            
            case "steel":
                typeH.setAttribute("style", "border-color: #AAAABB")
                break;
            
            case "fairy":
                typeH.setAttribute("style", "border-color: #EE99EE")
                break;
            
            
        }

        typeName = typeName[0].toUpperCase() + typeName.slice(1);

        typeH.innerHTML = typeName;

        typeH.setAttribute("class", "type");
        
        // console.log(typeH);

        typeDiv.appendChild(typeH);
    }

    return typeDiv;
}

function populateStats(stats){
    let statsDiv = document.createElement("div");
    statsDiv.setAttribute("id", "stats");

    let statHeading = document.createElement("h3");
    statHeading.innerHTML = "Base Stats :";

    let statFlexDiv = document.createElement("div");
    statFlexDiv.setAttribute("id", "stats-flex");

    let leftDiv = document.createElement("div");
    leftDiv.setAttribute("id", "left");
    leftDiv.setAttribute("class", "stats-col");
    
    let rightDiv = document.createElement("div");
    rightDiv.setAttribute("id", "right");
    rightDiv.setAttribute("class", "stats-col");

    for(let i in stats){
        let stat = stats[i];
        // console.log(stat.stat.name + " : " + stat.base_stat);

        let statDiv = document.createElement("div");
        statDiv.setAttribute("class", "stat");

        let statNameDiv = document.createElement("div");
        statNameDiv.setAttribute("class", "stat-name");

        let p1 = document.createElement("p");
        let statName = stat.stat.name;
        
        switch (statName){
            case 'hp':
                statName = 'Hp';
                break;
            case 'attack':
                statName = 'Atk';
                break;
            case 'defense':
                statName = 'Def';
                break;
            case 'special-attack':
                statName = 'Sp. Atk';
                break;
            case 'special-defense':
                statName = 'Sp. Def';
                break;
            case 'speed':
                statName = 'Speed';
                break;
        }
        p1.innerHTML = statName;

        let p2 = document.createElement("p");
        p2.innerHTML = ':';

        statNameDiv.appendChild(p1);
        statNameDiv.appendChild(p2);
        
        let p3 = document.createElement("p");
        p3.innerHTML = stat.base_stat;

        statDiv.appendChild(statNameDiv);
        statDiv.appendChild(p3);

        if(i < 3){
            leftDiv.appendChild(statDiv);
        }
        else{
            rightDiv.appendChild(statDiv);
        }
    }

    statFlexDiv.appendChild(leftDiv);
    statFlexDiv.appendChild(rightDiv);

    statsDiv.appendChild(statHeading);
    statsDiv.appendChild(statFlexDiv);

    return statsDiv;
}

function populateImg(imgSrc){
    let imgCard = document.createElement("div");
    imgCard.setAttribute("id", "card-img");

    let img = document.createElement("img");
    img.setAttribute("src", imgSrc);

    imgCard.appendChild(img);

    return imgCard;
}

function populateIdName(id, name){
    let nameDiv = document.createElement("div");

    let idHead = document.createElement("h2");
    let nameHead = document.createElement("h2");

    idHead.innerHTML = id;
    nameHead.innerHTML = name[0].toUpperCase() + name.slice(1);

    nameDiv.appendChild(idHead);
    nameDiv.appendChild(nameHead);

    return nameDiv;
}

function render(state){

    let cardDiv = document.getElementById("card");

    // console.log(state);

    let imgDiv = populateImg(state.imgSrc);
    let nameDiv = populateIdName(state.id, state.name);
    let typeDiv = populateTypes(state.types);
    let statDiv = populateStats(state.stats);

    // console.log(imgDiv);
    // console.log(nameDiv);
    // console.log(typeDiv);
    // console.log(statDiv);

    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(nameDiv);
    cardDiv.appendChild(typeDiv);
    cardDiv.appendChild(statDiv);
}


async function getPokeMonAsync(id){

    document.getElementById("card").innerHTML="";

    // console.log(document.getElementById("card"));

    let response = await fetchPromisified(`https://pokeapi.co/api/v2/pokemon/${id}/`);

    let dataR = await getData(response);

    // console.log(dataR);

    state = updateState(dataR);

    render(state);
}

getId();

// function getPokeMon(id){

//     // document.body.innerHTML = "";
    
//     fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
//     .then(function (response) {
//         // The API call was successful!
//         // console.log(response);
//         return response.json();
//     }).then(function (data) {
//         // This is the JSON from our response
        
//         //////// Getting Type of the Pokemon
//         console.log(data);

//         let types = data.types;
//         for(let i in types){
//             let type = types[i];
//             console.log(type.type.name);
//         }
        
//         //////// Getting stats of the Pokemon
        
//         let stats = data.stats;
//         for(let i in stats){
//             let stat = stats[i];
//             console.log(stat.stat.name + " : " + stat.base_stat);
//         }
        
//         //////// Getting image of the Pokemon
        
//         let imgLink = data.sprites.front_default;
//         let imgTag = document.createElement("img");
//         imgTag.setAttribute("src", imgLink);
//         // document.body.appendChild(imgTag);
        
//     }).catch(function (err) {
//         // There was an error
//         console.warn('Something went wrong.', err);
//     });

//     return "success";
    
// }

// getPokeMon(1);
