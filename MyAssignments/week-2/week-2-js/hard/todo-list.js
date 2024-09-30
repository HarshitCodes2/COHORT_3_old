/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    constructor(){
        this.todoList = [];
    }
    add(todo){
        this.todoList.push(todo);
    }
    remove(ind){
        this.todoList.splice(ind,1);
    }
    update(ind, todo){
        if(ind < 0 || ind >= this.todoList.length){
            return;
        }
        this.todoList[ind] = todo;
    }
    getAll(){
        return this.todoList;
    }
    get(ind){
        if(ind < 0 || ind >= this.todoList.length){
            return null;
        }
        return this.todoList[ind];
    }
    clear(){
        this.todoList = [];
    }
}

module.exports = Todo;
