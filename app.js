const form = document.querySelector('#task-form');
const inputVal = document.querySelector('#task');
const taskUl = document.querySelector('.collection');
const clearTaskBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const prefix = 'azp_';

// Load event listeners
loadEventListeners();

function loadEventListeners(){
    // Listener for add task
    form.addEventListener('submit', addTask);

    // Listener for delete icon
    document.body.addEventListener('click', deleteItem);

    // Listener for clear task
    clearTaskBtn.addEventListener('click', clearTask);

    // Listener for filter task
    filter.addEventListener('keyup', filterTask);

}

// Filter task 
function filterTask(e){
    let searchQuery = e.target.value.toLowerCase();
    let listItems = document.querySelectorAll('.collection-item');
    let text;

    listItems.forEach(function(elem, index){
        text = elem.textContent.toLowerCase();

        if(text.indexOf(searchQuery) != -1){
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
    });
}

// Clear task
function clearTask(e){
    e.preventDefault();

    // if(confirm('Do you want to remove all tasks?')){
        taskUl.innerHTML = '';
    // }

    // Another way (Faster tan innerHTML)
    while(taskUl.firstChild){
        if(taskUl.firstChild){
            taskUl.removeChild(taskUl.firstChild);
        }
    }

    // Clear from local storage
    localStorage.clear();

}

// Delete item
function deleteItem(e){
    let val;
    let clickedElement = e.target;
    if(clickedElement.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure to delete this task!')){
            clickedElement.parentElement.parentElement.remove();

            // delete from localstorage
            let text = clickedElement.parentElement.parentElement.textContent;
            deleteTaskFromLocalStorage(text);
        }
    }
}

// Delete task from local storgate
function deleteTaskFromLocalStorage(text){
    let tasks = JSON.parse(localStorage.getItem(prefix + 'tasks'));
    tasks.forEach(function(item, index){
        if(text === item){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem(prefix + 'tasks', JSON.stringify(tasks));
}


// Add task
function addTask(e){
    e.preventDefault();
    if(inputVal.value == ''){
        alert('Empty task can\'t be added!');
        return;
    }

    // Create li element
    let li;
    li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(inputVal.value));
    // Create link 
    let link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.setAttribute('href', '#');
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link element to li
    li.appendChild(link);

    // Append li into ul
    taskUl.appendChild(li);

    addTaskToLocalStorage(inputVal.value);

    // Clear input
    inputVal.value = '';

    // alert('Task Added!');
}

function addTaskToLocalStorage(task){
    let tasks;
    if(localStorage.getItem(prefix + 'tasks') == null){
        tasks = [];
    } else {
        tasks = localStorage.getItem(prefix + 'tasks');
        tasks = JSON.parse(tasks);
    }
    
    tasks.push(task);

    localStorage.setItem(prefix + 'tasks', JSON.stringify(tasks));
}


renderTasksOnLoad();

function renderTasksOnLoad(){
    let tasks = localStorage.getItem(prefix + 'tasks');
    if(tasks){
        JSON.parse(tasks).forEach(function(item, index){
            // Create li element
            let li;
            li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(item));
            // Create link 
            let link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.setAttribute('href', '#');
            // Add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // append link element to li
            li.appendChild(link);

            // Append li into ul
            taskUl.appendChild(li);
        });
    }
}