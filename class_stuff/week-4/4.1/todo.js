const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
let todos = [];

program
    .name('todo-util')
    .description('CLI to Todo List Application')
    .version('1.0.0');

program.command('add')
    .description('Add a todo')
    .argument('<string>', 'Todo Name')
    .action((str) => {
        let todo = {
            todoName : str,
            status : 'pending'
        }
        fs.readFile('todo.json', 'utf8', (err, data) => {
            if (err){

            }else{
                if(data == ""){
                    todos = [];
                }else{
                    todos = JSON.parse(data);
                }
                todos.push(todo);
                const jsonData = JSON.stringify(todos, null, 2);
                fs.writeFile('todo.json', jsonData, (err) => {});
            }
        })
    });

program.command('delete')
    .description("Deletes a todo")
    .argument('<int>', 'Index of todo')
    .action((str) => {
        fs.readFile('todo.json', 'utf8', (err, data) => {
            if (err){

            }else{
                todos = JSON.parse(data);
                todos.forEach(ele => {
                    todos = todos.filter(function(ele) {
                        if (ele['todoName'] != str){
                            return ele;
                        }
                    });
                });
                const jsonData = JSON.stringify(todos, null, 2);
                fs.writeFile('todo.json', jsonData, (err) => {});
            }
        })

    })

program.command('done')
    .description("Mark a Todo as Done")
    .argument('<int>', 'Index of todo')
    .action((str) => {
        fs.readFile('todo.json', 'utf8', (err, data) => {
            if (err){

            }else{
                todos = JSON.parse(data);
                todos.forEach(ele => {
                    if(ele['todoName'] == str){
                        ele['status'] = 'complete';
                    }
                });
                const jsonData = JSON.stringify(todos, null, 2);
                fs.writeFile('todo.json', jsonData, (err) => {});
            }
        })
    })

program.command('print')
    .description("Prints All Todos")
    .action(() => {
        fs.readFile('todo.json', 'utf8', (err, data) => {
            if (err){

            }else{
                todos = JSON.parse(data);
                console.log(todos);
            }
        })
    })

program.parse();


