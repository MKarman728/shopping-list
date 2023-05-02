const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('#filter');

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
clearUI();
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
        if(itemName.indexOf(e.target.value.toLowerCase()) !== -1){
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    })
    clearUI();
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
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click',itemRemove);
clearBtn.addEventListener('click',clearItems);
filter.addEventListener('input', filterItems);

clearUI();