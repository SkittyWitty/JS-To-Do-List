import ToDoList from "./todolist.js"
import ToDoItem from "./todoitem.js"

const toDoList = new ToDoList();
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    // Listeners
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event =>{
        event.preventDefault();
        processSubmission();
    }));

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click", (event) => {
        const list =  toDoList.getList();
        if(list.length){
            const confirmed =
             confirm("Are you sure you want to clear the entire");
            if(confirmed){
                toDoList.clearList();
                //TODO: update persistant data
                refreshThePage();
            }
        }
    })

    // Procedural
    refreshThePage();
}

const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntryField();
}

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
}

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
}

const renderList = () => {
    const list = toDoList.getList();
    list.forEach(item => {
        buildListItem(item);
    })
}

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItems");
    container.appendChild(div);
}

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDoList.removeItemFromList(checkbox.id);

        // TODO: remove from persistant data
        setTimeout(() => {
            refreshThePage();
        })
    })
}

const clearItemEntryField = () => {
    document.getElementById("newItem").value = "";
}

const setFocusOnItemEntryField = () => {
    document.getElementById("newItem").focus();
}

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if(!newEntryText.length){
        return;
    }
    else{
        const newItemId = calcNextItemId();
        const toDoItem = createNewItem(newItemId, newEntryText);
        toDoList.addItemToList(toDoItem);
        // TODO: update persistant data
        refreshThePage();
    }
}

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
}

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getList();
    if(list.length > 0){
        nextItemId = list[list.length - 1].getId() + 1;
    }
    else{
        return nextItemId;
    }
}

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem(itemId, itemText);
    return toDo;
}