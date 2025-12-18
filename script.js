document.addEventListener('DOMContentLoaded', () => {


    const userInput = document.getElementById('userInput');
    const addBtn = document.getElementById('addBtn');
    const ul = document.getElementById('shoppingList');

    const loadFromLocalStorage = () => {
        const savedList = localStorage.getItem('shoppingList');
        if (savedList) {
            ul.innerHTML = savedList;

            // Add the new evnts litseners to the restured list
            ul.querySelectorAll('.deleteBtn').forEach((btn) => {
                btn.addEventListener('click', handleDelete);
            });

            ul.querySelectorAll('.editBtn').forEach((btn) => {
                btn.addEventListener('click', handleEdit);
            });


            ul.querySelectorAll('.checkbox').forEach((checkbox) => {
                checkbox.addEventListener('change', handleCheckbox);
            })

        }
    };



    const saveToLocalStorage = () => {
        localStorage.setItem('shoppingList', ul.innerHTML);
    };


    const addNewLI = (value) => {

        const li = document.createElement('li');
        li.classList.add('li');


        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', handleCheckbox)


        const valueSpan = document.createElement('span');
        valueSpan.textContent = value;
        valueSpan.classList.add('valueSpan');


        const editBtn = document.createElement('button');
        editBtn.classList.add('editBtn');
        editBtn.textContent = 'ערוך'
        editBtn.addEventListener('click', handleEdit);


        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'מחק'
        deleteBtn.addEventListener('click', handleDelete);


        const btnContainer = document.createElement('span');
        btnContainer.classList.add('btnsSpan');
        btnContainer.append(editBtn, deleteBtn);

        li.append(checkbox, valueSpan, btnContainer);
        ul.appendChild(li);

        saveToLocalStorage();

    };



    const handleCheckbox = (e) => {
        const valueSpan = e.target.closest('li').querySelector('.valueSpan');
        valueSpan.style.textDecoration = e.target.checked ? 'line-through' : 'none';
    }

    const handleEdit = (e) => {
        const valueSpan = e.target.closest('li').querySelector('.valueSpan');
        const newText = prompt('ערוך את הפריט', valueSpan.textContent);
        if (newText) {
            valueSpan.textContent = newText;
            saveToLocalStorage();
        }
    }


    const handleDelete = (e) => {
        const li = e.target.closest('li');
        li.remove();
        saveToLocalStorage();
    }


    addBtn.addEventListener('click', () => {
        const value = userInput.value.trim();
        if (value) {
            addNewLI(value);
            userInput.value = '';
        }
    });

    loadFromLocalStorage();

});
