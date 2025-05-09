document.addEventListener('DOMContentLoaded', () => {
    const ul = document.getElementById('shoppingList');
    const addBtn = document.getElementById('addBtn');
    const inputField = document.getElementById('LIinput');

    // Loading saved list from local storage
    const loadFromLocalStorage = () => {
        const savedList = localStorage.getItem('shoppingList');
        if (savedList) {
            ul.innerHTML = savedList;

            // Add thenew event listeners to the restured list
            ul.querySelectorAll('.deleteBtn').forEach((btn) => {
                btn.addEventListener('click', handleDelete);
            });

            ul.querySelectorAll('.editBtn').forEach((btn) => {
                btn.addEventListener('click', handleEdit);
            });

            ul.querySelectorAll('.checkbox').forEach((checkbox) => {
                checkbox.addEventListener('change', handleCheckboxChange);
            });
        }
    };

    // Saving the list in local storage
    const saveToLocalStorage = () => {
        localStorage.setItem('shoppingList', ul.innerHTML);
    };

    // Add a new item to the list
    const addListItem = (text) => {
        const li = document.createElement('li');
        li.classList.add('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', handleCheckboxChange);

        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        textSpan.classList.add('textSpan');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'ערוך';
        editBtn.classList.add('editBtn');
        editBtn.addEventListener('click', handleEdit);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'מחק';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', handleDelete);

        const btnContainer = document.createElement('span');
        btnContainer.classList.add('btnsSpan');
        btnContainer.append(editBtn, deleteBtn);

        li.append(checkbox, textSpan, btnContainer);
        ul.appendChild(li);

        saveToLocalStorage();
    };

    // Delete item
    const handleDelete = (event) => {
        const li = event.target.closest('li');
        li.remove();
        saveToLocalStorage();
    };

    // Edit item
    const handleEdit = (event) => {
        const textSpan = event.target.closest('li').querySelector('.textSpan');
        const newText = prompt('ערוך את הפריט:', textSpan.textContent);
        if (newText) {
            textSpan.textContent = newText;
            saveToLocalStorage();
        }
    };

    const handleCheckboxChange = (event) => {
        const textSpan = event.target.closest('li').querySelector('.textSpan');
        textSpan.style.textDecoration = event.target.checked ? 'line-through' : 'none';
        saveToLocalStorage();
    };

    addBtn.addEventListener('click', () => {
        const value = inputField.value.trim();
        if (value) {
            addListItem(value);
            inputField.value = '';
        }
    });

    loadFromLocalStorage();
});
