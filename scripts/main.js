const form = document.querySelector('.js-new-item');
const addTaskButton = document.querySelector('.js-add-task-button');
const list = document.querySelector('.js-list');
let items = [];

window.addEventListener('load', event => {
    let storedItems = localStorage.getItem('items');

    if(storedItems) {
        storedItems = JSON.parse(storedItems);

        storedItems.forEach(item => {
            createItem(item);
        });
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();

    let task = event.target.task;

    if(task.value != '' && !items.find(item => item === task.value)) {
        createItem(task.value);
        addLocalStorage(items);
        task.style.borderColor = 'rgb(120, 120, 120)';
        task.value = '';
    }
    else {
        task.style.borderColor = 'rgb(254, 61, 61)'
        alert('Preencha o campo ou insira uma nova tarefa')
    }
});

function createItem(taskName) {
    const newItem = document.createElement('div');
    newItem.id = 'item';

    const task = document.createElement('li');
    task.textContent = taskName;

    const checkButton = document.createElement('button');
    checkButton.id = 'check-button';
    checkButton.textContent = '✓';

    const removeButton = document.createElement('button');
    removeButton.id = 'remove-button';
    removeButton.textContent = '✗';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.id = 'item-buttons';

    buttonsDiv.appendChild(checkButton);
    buttonsDiv.appendChild(removeButton);

    newItem.appendChild(task);
    newItem.appendChild(buttonsDiv);
    
    list.appendChild(newItem);
    items.push(taskName);

    checkItem(checkButton);
    removeItem(removeButton);
}

function addLocalStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

function checkItem(button) {
    button.addEventListener('click', event => {
        const item = event.target.parentElement.parentElement;
        item.classList.toggle('done');
    });
}

function removeItem(button) {
    button.addEventListener('click', event => {

        items = localStorage.getItem('items');
        items = JSON.parse(items);

        const item = event.target.parentElement.parentElement;
        const itemPosition = items.indexOf(item.children[0].textContent)
        
        items.splice(itemPosition, 1);
        item.remove();

        addLocalStorage(items); 
    });
}

