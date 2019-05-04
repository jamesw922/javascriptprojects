// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    // document.addEventListener('DOMContentLoaded');
    // Add Task Event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter through tasks
    filter.addEventListener('keyup', filterTasks);
}

// get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);
            taskList.appendChild(li);
        });
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Please add a task.');
    }
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // Store in LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// STORE TASK

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you certain?'))
        e.target.parentElement.parentElement.remove();
        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from LS
function removeFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Clear TAsks
function clearTasks(e) {
    // taskList.innerHTML = '';
    // Faster version --- see https://jspert.com/innerhtml-vs-removechild
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks -- LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    }); 
}