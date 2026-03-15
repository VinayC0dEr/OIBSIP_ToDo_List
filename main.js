let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){

const title=document.getElementById("titleInput").value.trim();
const desc=document.getElementById("descInput").value.trim();

if(title==="") return;

tasks.push({
id:Date.now(),
title:title,
desc:desc,
completed:false,
created:new Date().toLocaleString(),
completedTime:null
});

document.getElementById("titleInput").value="";
document.getElementById("descInput").value="";

saveTasks();
render();
}

function deleteTask(id){
tasks = tasks.filter(task => task.id !== id);
saveTasks();
render();
}

function completeTask(id){

tasks = tasks.map(task=>{
if(task.id===id){
task.completed=true;
task.completedTime=new Date().toLocaleString();
}
return task;
});

saveTasks();
render();
}

function editTask(id){

let task=tasks.find(t=>t.id===id);

let newTitle=prompt("Edit title:",task.title);
let newDesc=prompt("Edit description:",task.desc);

if(newTitle!==null) task.title=newTitle;
if(newDesc!==null) task.desc=newDesc;

saveTasks();
render();
}

function render(){

const pending=document.getElementById("pending");
const completed=document.getElementById("completed");

pending.innerHTML="";
completed.innerHTML="";

tasks.forEach(task=>{

const div=document.createElement("div");
div.className="task";

if(task.completed) div.classList.add("completed");

div.innerHTML=`

<div class="task-header">

<div>
<div class="task-title">${task.title}</div>
<div class="task-desc">${task.desc || ""}</div>
</div>

<div class="task-buttons">

${!task.completed ? `<button class="complete" onclick="completeTask(${task.id})">✔</button>`:""}

<button class="edit" onclick="editTask(${task.id})">Edit</button>
<button class="delete" onclick="deleteTask(${task.id})">X</button>

</div>

</div>

<div class="time">
Added: ${task.created}
${task.completedTime ? `<br>Completed: ${task.completedTime}`:""}
</div>

`;

if(task.completed){
completed.appendChild(div);
}else{
pending.appendChild(div);
}

});

}

render();