const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

const onAddItemSubmit = (e)=>{
    e.preventDefault(e);
    // Validate Input
    const newItem = itemInput.value;
    if(newItem===''){
        alert('Please add an item');
        return;
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

function addItemToStorage(item){
    let itemFromStorage;
    if(localStorage.getItem('items')=== null){
        itemFromStorage = [];
    }
    else{
        itemFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    //Add new item to array
    itemFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
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

// delete list item
function itemRemove(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
    }
    clearUI();
}

// clear items
function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
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
    const items = itemList.querySelectorAll('li');
    if(items.length){
        document.querySelector('#clear').style.display = 'block';
        document.querySelector('#filter').style.display = 'block';
    }
    else{
        document.querySelector('#clear').style.display = 'none';
        document.querySelector('#filter').style.display = 'none';
    }
}

// Item Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click',itemRemove);
clearBtn.addEventListener('click',clearItems);
filter.addEventListener('input', filterItems);

clearUI();