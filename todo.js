let todoItems = []

function addTodoItem(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    }

    todoItems.push(todo);
    renderTodoItem(todo);
}

const form = document.querySelector('.todolist-form');
form.addEventListener('submit', event => {

    event.preventDefault();

    const input = document.querySelector('.todolist-input');
    const text = input.value.trim();
    if (text !== "") {
        addTodoItem(text);
        input.value = '';
        input.focus();
    }
});

function renderTodoItem(todo) {
    const list = document.querySelector('.todolist-list');

    const node = document.createElement("div");
    node.setAttribute('class', 'box');
    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
    <div class="level">
        <!-- Left side -->
        <div class="level-left">
            <div class="level-item">
                <p class="subtitle is-5">
                    <strong>${todo.text}</strong>
                </p>
            </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
            <p class="level-item">
                <a id="${todo.id}" class="todo-tick">Done</a>
            </p>
            <p class="level-item">
                <a id="${todo.id}" class="todo-delete">Delete</a>
            </p>
        </div>
    </div>
    `;

    if (todo.checked) {
        const title = node.querySelector(".subtitle");
        title.innerHTML = `<strike><b>${todo.text}</b></strike>`
    }

    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        // remove the item from the DOM
        item.remove();
        return
    }

    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}

const list = document.querySelector('.todolist-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('todo-tick')) {
        const itemKey = event.target.id;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('todo-delete')) {
        const itemKey = event.target.id;
        toggleRemove(itemKey);
    }
});

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked
    renderTodoItem(todoItems[index]);
}

function toggleRemove(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };

    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodoItem(todo);
}