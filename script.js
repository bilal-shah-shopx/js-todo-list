let list = [];
const taskName = document.querySelector("#task");
let listGroup = document.querySelector("#list");


document.addEventListener("DOMContentLoaded", function () {
    const storedList = localStorage.getItem("list");
    if (storedList) {
        try {
            list = JSON.parse(storedList);
            if(!Array.isArray(list)){
                list = [];
            } 
        } catch (e) {
            console.error("Invalid JSON in localStorage for 'list'", e);
            list = [];
        }
    }
    updateListContent();
});

function updateListContent() {
    localStorage.setItem("list", JSON.stringify(list));
    let content = "";
    list.forEach((element, index) => {
        content += `
        <li id="li-${index}" class="list-item d-flex justify-content-between align-items-center">
            <div class="d-flex gap-1 ps-1">
                <input class="edit-item form-control d-none" type="text" value="${element}">
                <input class="form-check-input" type="checkbox">
                <label class="form-check-label">${element}</label>
            </div>
            <div class="d-flex gap-3 pe-3">
                <i onclick="editList(${index})" class="fa fa-edit edit"></i>
                <i onclick="removeList(${index})" class="fa fa-trash del"></i>
            </div>
        </li> <hr></hr>`;
    });
    listGroup.innerHTML = content;
    editItem();
}

taskName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const task = taskName.value.trim();
        if (task) {
            list.push(task);
            taskName.value = "";
            updateListContent();
        } else {
            alert("You must write something");
        }
    }
});

function editItem() {
    document.querySelectorAll(".edit-item").forEach((input, index) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const task = input.value.trim();
                if (task) {
                    list[index] = task;
                    updateListContent();
                } else {
                    alert("You must write something");
                }
            }
        });
    });
}

function editList(index) {
    const listItem = document.querySelector(`#li-${index}`);
    const editInput = listItem.querySelector('.edit-item');
    const checkbox = listItem.querySelector('.form-check-input');
    const label = listItem.querySelector('.form-check-label');

    editInput.classList.remove('d-none');
    checkbox.classList.add('d-none');
    label.classList.add('d-none');

    editInput.focus();
}

function removeList(index) {
    document.querySelector(`#li-${index}`).remove();
    list.splice(index, 1);
    updateListContent();
}