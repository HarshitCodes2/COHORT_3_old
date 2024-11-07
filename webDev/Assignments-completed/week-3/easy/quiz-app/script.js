const quizData = [{
    "question": "Which language runs in a web browser?",
    "a": "Java",
    "b": "C",
    "c": "Python",
    "d": "JavaScript",
    "correct": "d",
},
{
    "question": "What does CSS stand for?",
    "a": "Central Style Sheets",
    "b": "Cascading Style Sheets",
    "c": "Cascading Simple Sheets",
    "d": "Cars SUVs Sailboats",
    "correct": "b",
},
{
    "question": "What does HTML stand for?",
    "a": "Hypertext Markup Language",
    "b": "Hypertext Markdown Language",
    "c": "Hyperloop Machine Language",
    "d": "Helicopters Terminals Motorboats Lamborginis",
    "correct": "a",
},
{
    "question": "What year was JavaScript launched?",
    "a": "1996",
    "b": "1995",
    "c": "1994",
    "d": "none of the above",
    "correct": "b",
},
// you can add more quiz here
]

let score = 0;
let quesNo = 0;


function nextQues(){
    let parent = document.getElementById("game-zone");

    parent.innerHTML="";

    let questionDiv = document.createElement("div");
    let question = document.createElement("h1");

    questionDiv.setAttribute("id", "question");

    question.innerHTML = quizData[quesNo].question;

    questionDiv.appendChild(question);

    let optionList = document.createElement("div");

    for(let i = 0; i < 4; i++){
        let opt;
        switch(i){
            case 0:
                opt = 'a';
            break;
            case 1:
                opt = 'b';
            break;
            case 2:
                opt = 'c';
            break;
            case 3:
                opt = 'd';
            break;
        }

        let option = document.createElement("div");
        option.setAttribute("style", "display: flex;");
        option.setAttribute("id", `option-${opt}`);

        let inp = document.createElement("input");
        inp.setAttribute("type", "checkbox");
        inp.setAttribute("name", `${opt}`);

        let optionItem = document.createElement("p");
        optionItem.innerHTML = quizData[quesNo][`${opt}`];

        option.appendChild(inp);
        option.appendChild(optionItem);

        optionList.appendChild(option);
    }

    parent.appendChild(questionDiv);
    parent.appendChild(optionList);
}


function scoreShow(){
    let parent = document.getElementById("game-zone");
    parent.innerHTML="";

    let scoreH2 = document.createElement("h2");

    scoreH2.innerHTML = `Score : ${score}/4`;

    console.log(score);

    parent.appendChild(scoreH2);

    parent.setAttribute("style", "padding-bottom: 50px");

    let btn = document.getElementById("sub-btn");
    
    btn.innerHTML = "<a><h2> Reload </h2></a>";

}


function markAns(opt){
    if(opt == quizData[quesNo].correct){
        score += 1;
    }
    quesNo += 1;

    if(quesNo < quizData.length){
        nextQues();
    }
    else{
        scoreShow();
    }
}


function submit(){
    let valList = document.querySelectorAll("input");

    for(let i = 0; i < valList.length; i++){
        if (valList[i].checked){
            markAns(valList[i].name);
        }
    }
}

nextQues();
