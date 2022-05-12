var taskInput = document.getElementById("new-task");
var nameInput = document.getElementById("new-name");
var numberInput = document.getElementById("new-number");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTask = document.getElementById("incomplete-tasks");
var completedTask = document.getElementById("completed-tasks");


var createNewTaskElement = function (taskString, nameString, numberString) {

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");

    var label = document.createElement("label");
    var label1 = document.createElement("label");
    var label2 = document.createElement("label");

    var editInput = document.createElement("input");
    var editInput1 = document.createElement("input");
    var editInput2 = document.createElement("input");

    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    label.innerText = taskString;
    label1.innerText = nameString;
    label2.innerText = numberString;

    label.className = "task";
    label1.className = "name";
    label2.className = "number";

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput1.type = "text";
    editInput2.type = "text";

    editInput.className = "edit";
    editInput1.className = "edit1";
    editInput2.className = "edit2";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(label1);
    listItem.appendChild(editInput1);
    listItem.appendChild(label2);

    listItem.appendChild(editInput2);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    alert("You added '" + label.innerText + "' to the ToDO list");
    return listItem;
}

var addTask = function () {
    var listItem = createNewTaskElement(taskInput.value, nameInput.value, numberInput.value);
    if (taskInput.value == "") {
        alert("You must enter a task");
    } else if (nameInput.value == "") {
        alert("You must enter a Name");
    } else if (numberInput.value == "") {
        alert("You must enter a Phone Number");
    } else {
        incompleteTask.appendChild(listItem);

    }
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
    nameInput.value = "";
    numberInput.value = "";
}

var editTask = function () {

    var listItem = this.parentNode;

    var editInput = listItem.querySelector('.edit');
    var editInput1 = listItem.querySelector('.edit1');
    var editInput2 = listItem.querySelector('.edit2');

    var label = listItem.querySelector(".task");
    var label1 = listItem.querySelector(".name");
    var label2 = listItem.querySelector(".number");

    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
        label1.innerText = editInput1.value;
        label2.innerText = editInput2.value;
        alert("You edited " + label.innerText);
    } else {
        editInput.value = label.innerText;
        editInput1.value = label1.innerText;
        editInput2.value = label2.innerText;
    }
    listItem.classList.toggle("editMode");
}

var deleteTask = function () {
    if (confirm("Are you sure you want to delete this task?") == true) {
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        alert("You deleted " + listItem.querySelector("label").innerText);
    } else {
        alert("You cancelled the task");
    }

    ul.removeChild(listItem);
}

var taskCompleted = function () {
    var listItem = this.parentNode;
    if (confirm("Are you sure you want to mark this task as complete?") == true) {
        completedTask.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
        alert("You completed " + listItem.querySelector("label").innerText);
    } else {
        alert("You cancelled the task");
    }
}

var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTask.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTask.children.length; i++) {
    bindTaskEvents(incompleteTask.children[i], taskCompleted);
}

for (var i = 0; i < completedTask.children.length; i++) {
    bindTaskEvents(completedTask.children[i], taskIncomplete);
}

var input = document.getElementById("new-number");