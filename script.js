const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    clearUI();
}

const onAddItemSubmit = (e)=>{
    e.preventDefault(e);
    // Validate Input
    const newItem = itemInput.value;
    if(newItem===''){
        alert('Please add an item');
        return;
    }
    // Check for edit mode
    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    // Checks if item already exists
    else{
        if(checkIfItemExists(newItem)){
            alert('That item already exists');
            return;
        }
    }

    //Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    itemInput.value = '';
    clearUI();
}

function addItemToDOM(item){
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}



function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// icon function
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item){
    let itemFromStorage = getItemsFromStorage();

    //Add new item to array
    itemFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getItemsFromStorage(){
    let itemFromStorage;
    if(localStorage.getItem('items')=== null){
        itemFromStorage = [];
    }
    else{
        itemFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemFromStorage;
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        itemRemove(e.target.parentElement.parentElement);
    }
    else{
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);

}

function setItemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

// delete list item
function itemRemove(item){
    if(confirm('Are you sure?')){
        //Remove item from DOM
        item.remove();

        // Remove item from storage
        removeItemFromStorage(item.textContent);
    }
    clearUI();
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item );

    //Reset to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

// clear items
function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }

    //Clear from localStorage
    localStorage.removeItem('items');
    clearUI();
}

// filter items
function filterItems(e){
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase().trim();
        console.log(itemName);
        if(itemName.indexOf(e.target.value.toLowerCase()) !== -1){
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    })
}

// clear UI
function clearUI(){
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if(items.length){
        document.querySelector('#clear').style.display = 'block';
        document.querySelector('#filter').style.display = 'block';
    }
    else{
        document.querySelector('#clear').style.display = 'none';
        document.querySelector('#filter').style.display = 'none';
    }

    formBtn.innerHTML = '<i class= "fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

// Initialize app
function init(){
    // Item Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click',onClickItem);
clearBtn.addEventListener('click',clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

clearUI();
}

init();