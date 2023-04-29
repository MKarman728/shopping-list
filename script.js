const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

const addItem = (e)=>{
    e.preventDefault(e);
    // Validate Input
    const newItem = itemInput.value;
    if(newItem===''){
        alert('Please add an item');
        return;
    }
// Create list item
const li = document.createElement('li');
li.appendChild(document.createTextNode(newItem));

const button = createButton('remove-item btn-link text-red');
li.appendChild(button);
itemList.appendChild(li);
itemInput.value = '';
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


// Item Listeners
itemForm.addEventListener('submit', addItem);