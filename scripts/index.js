let listArr = [];

const inputSection = document.getElementById("inputSection");

const taskList = document.getElementById("taskList");


const addTask = ()=>{
    if (inputSection.value === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        text: inputSection.value,
        completed: false
    };

    const li = document.createElement('li');
    const liNewContent = document.createTextNode(newTask.text);
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    li.appendChild(liNewContent);
    li.appendChild(checkbox);
    taskList.appendChild(li);
    listArr.push(newTask);
    // console.log(listArr);

    // Update the task list
    updateTaskList();
    inputSection.value = "";

    // checkbox.addEventListener('change', () => {
    //     console.log(checkbox.checked);
    // });

}


const updateTaskList = ()=>{
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    // Clear the current lists
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    listArr.forEach((list, index)=>{
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const textSpan = document.createElement("span");
        textSpan.innerText = list.text;
        li.appendChild(textSpan);

        
        checkbox.checked = list.completed;

        checkbox.onchange = () => toggleTaskCompletion(index);
        li.appendChild(checkbox);

        

        if (list.completed) {
            li.classList.add("completed");
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
    
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    listArr[index].completed = !listArr[index].completed;
    updateTaskList();
}

// Initial update of the task list
updateTaskList();


const remainingTodo = document.getElementById("remaining_todos");
const completedTodo = document.getElementById("completed_todos");

// for remaining tasks
remainingTodo.addEventListener('click', ()=>{
    // Adding class to div element 
    remainingTodo.classList.add("remaining_todos");

    console.log(completedTodo.children[1]);

    completedTodo.children[1].style.display = 'none';
    remainingTodo.children[1].style.display = 'block';
    completedTodo.classList.remove("completed_todos");
});


completedTodo.addEventListener('click', ()=>{
    // Adding class to div element 
    completedTodo.classList.add("completed_todos");
    remainingTodo.classList.remove("remaining_todos");

    remainingTodo.children[1].style.display = 'none';
    completedTodo.children[1].style.display = 'block';
});



// for search task

const searchTask = document.getElementById("taskInput");

searchTask.addEventListener('change', ()=>{
    searchTasks();

});




const searchTasks = () => {
    const searchTerm = searchTask.value.toLowerCase();

    const filteredTasks = listArr.filter(task => task.text.toLowerCase().includes(searchTerm));

    // Update the task list with filtered tasks
    const taskList = document.getElementById("taskList");
    const completedList = document.getElementById("completedList");

    taskList.innerHTML = "";
    completedList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const textSpan = document.createElement("span");
        textSpan.innerText = task.text;
        li.appendChild(textSpan);

        checkbox.checked = task.completed;

        checkbox.onchange = () => toggleTaskCompletion(index);
        li.appendChild(checkbox);

        if (task.completed) {
            li.classList.add("completed");
            completedList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
};


function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);

    // Close all sections
    document.querySelectorAll('.task-section').forEach((s) => {
        if (s.id !== sectionId) {
            s.classList.remove('open');
        }
    });

    section.classList.toggle('open');
}

