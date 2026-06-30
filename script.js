// --- STRUCTURAL CONTAINERS ---
const mainDiv = document.getElementById("main-div");
const controlPanel = document.getElementById("task-manager"); // Left Column
const taskDisplay = document.getElementById("task-display"); // Right Column

// --- INPUTS AND BUTTONS ---
const inputTask = document.querySelector(".inputTask");
console.log(inputTask);
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const editdiv = document.getElementById("edit-task")

// --- DROPDOWN (SELECT) AND ITS OPTIONS ---
const filterDropdown = document.getElementById("filter");

// Target specific options inside the dropdown using querySelector
const optionAll = document.querySelector("#filter .all");
const optionActive = document.querySelector("#filter .active");
const optionCompleted = document.querySelector("#filter .completed");
const optionIncomplete = document.querySelector("#filter .incomplete");

// Alternative: Target ALL options inside the dropdown at once as an array-like list
const allDropdownOptions = document.querySelectorAll("#filter option");


let taskCounter = 0
let key= []
let displayTask

function addTask() {
    taskCounter++;

    displayTask = document.createElement("p");
    displayTask.textContent = "Task-" + taskCounter + " " + inputTask.value;
    taskDisplay.appendChild(displayTask);

    key.push(inputTask.value);
    localStorage.setItem("task", key);

    inputTask.value = "";
    checkBox()

}
function checkBox(){
        // complete Box
    let completeBox = document.createElement("input");
    completeBox.type = "checkbox";
    let labelComplete = document.createElement("label");
    labelComplete.textContent = "Complete";
    completeBox.addEventListener("click",()=>{
        if(labelComplete.textContent == "Complete"){
                labelComplete.textContent = "✅ Complete";
        }else{
            labelComplete.textContent = "Complete";    
        }
        
    })
    
    // Incomplete Box
    let incompleteBox = document.createElement("input");
    incompleteBox.type = "checkbox";
    
    let labelIncomplete = document.createElement("label");
    labelIncomplete.textContent = "Incomplete";
    
    incompleteBox.addEventListener("click",()=>{
        if(labelIncomplete.textContent == "Incomplete"){
                labelIncomplete.textContent = "📌Incomplete";
        }else{
            labelIncomplete.textContent = "Incomplete";    
        }
        
    })

    // Active Box
    let activeBox = document.createElement("input");
    activeBox.type = "checkbox";
    
    let labelActive = document.createElement("label");
    labelActive.textContent = "Active";
    
    activeBox.addEventListener("click",()=>{
        if(labelActive.textContent == "Active"){
                labelActive.textContent = "⚡Active";
        }else{
            labelActive.textContent = "Active";    
        }
        
    })



    taskDisplay.appendChild(activeBox)
    taskDisplay.appendChild(labelActive)
    taskDisplay.appendChild(completeBox)
    taskDisplay.appendChild(labelComplete)
    taskDisplay.appendChild(incompleteBox)
    taskDisplay.appendChild(labelIncomplete)

    // for unchecking if more boxes are checked 
    const boxes = [activeBox, completeBox, incompleteBox];
    boxes.forEach(box => {
        box.addEventListener("change", () => {
            if (box.checked) {
                boxes.forEach(b => {
                    if (b !== box) {
                        b.checked = false;
                    }
                });
            }
        });
    });
}

function displayTasks() {
    taskDisplay.innerHTML = "";

    let data = localStorage.getItem("task");

    if (data) {
        let maindata = data.split(",");

        for (let i = 0; i < maindata.length; i++) {
            let p = document.createElement("p");
            p.textContent = "Task-" + (i + 1) + " " + maindata[i];
            taskDisplay.appendChild(p);
            checkBox()
        }
    }
}

function deleteTasks() {
    taskDisplay.innerHTML = "";
    localStorage.clear();
    key = [];
    taskCounter = 0;
}

addBtn.addEventListener("click", () => {
    addTask();
});

deleteBtn.addEventListener("click", () => {
    deleteTasks();
});

displayTasks();

editBtn.addEventListener('click',()=>{
    editTask()
    editBtn.disabled = true;
})

function editTask(){


    let taskNumber = document.createElement("input")
    taskNumber.type = "number"
    taskNumber.placeholder = "Enter the task number you want to edit"
    taskNumber.classList.add("inputTask")
    editdiv.appendChild(taskNumber)
    let taskNumberSubmit = document.createElement("button")
    taskNumberSubmit.textContent = "Submit"
    taskNumberSubmit.classList.add("hiddenBtn")
    editdiv.appendChild(taskNumberSubmit);
    taskNumberSubmit.addEventListener('click',()=>{
        let index = Number(taskNumber.value) -1;
        let data = localStorage.getItem("task");
        
        if (data) {
            let maindata = data.split(",");
    
            for (let i = 0; i < maindata.length; i++) {
                if(index === i){
                    let allTasks = taskDisplay.querySelectorAll("p");
                    let currentTask = allTasks[index];
                    let editCurrentTask = document.createElement("input");
                    editCurrentTask.type = "text";
                    editCurrentTask.value = maindata[index];
                    currentTask.replaceWith(editCurrentTask);
                    editCurrentTask.classList.add("inputTask")
                    let saveEdit = document.createElement("button")
                    saveEdit.textContent="Save Changes"
                    taskDisplay.appendChild(saveEdit)
                    saveEdit.classList.add("hiddenBtn")
                    saveEdit.addEventListener('click',()=>{
                        maindata[index] = editCurrentTask.value;
                        localStorage.setItem("task", maindata);
                        displayTasks();   // Refresh the task list
                    })    
                }    
            }

        }
        editBtn.disabled = false
        editdiv.innerHTML =""
    })
}