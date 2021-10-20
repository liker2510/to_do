'use strict';
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = JSON.parse(localStorage.getItem("todoListArray")) || [];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    toDoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.getAttribute('index', `${index}`);  
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>'

        if(item.completed) {
            todoCompleted.append(li);
        }else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        })
        
        li.querySelector('.todo-remove').addEventListener('click', function() {
            let index = li.getAttribute('index');
            toDoData.splice(+index, 1);
            render();
        })
    })
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newToDO = {
        text: headerInput.value,
        completed: false
    }
    if(headerInput.value !== '') {
        toDoData.push(newToDO);
        headerInput.value = '';
        localStorage.setItem("todoListArray", JSON.stringify(toDoData));
    }

    render();
})
    render();


