let state = [
    // {
    //     typeVal : 'checkbox',
    //     labelVal : 'Happy'
    // },
    // {
    //     typeVal : 'radio',
    //     labelVal : 'Happier'
    // },
    // {
    //     typeVal : 'text',
    //     labelVal : 'Happiest'
    // },
    // {
    //     typeVal : 'checkbox',
    //     labelVal : 'HappyAgain'
    // }
]

function addFormEl(){
    let select = document.querySelector('select');

    let label = document.getElementById('inpLabel');

    // console.log(select.value, label.value);

    updateState(select.value, label.value);
}



function updateState(typeVal, labelVal){
    state.push({
        typeVal : typeVal,
        labelVal : labelVal
    })

    render(state);
}


function render(state){
    let form = document.getElementById('builtForm');

    form.innerHTML = "";

    for(let i = 0; i < state.length; i++){
        let div = document.createElement('div');
        
        div.setAttribute("id", "formDivCr");

        let inp = document.createElement('input');
        
        let label = document.createElement('label');
        
        inp.setAttribute("type", `${state[i].typeVal}`)
        label.innerHTML = state[i].labelVal;
        
        div.appendChild(label);
        div.appendChild(inp);

        form.appendChild(div);
    }
}

