import addGlobalListener, {
    swap
} from './utilites.js';

export default class ToDo {
    constructor() {
        this.todoLocalStorage = null;
        this.todoList = document.getElementById('todo__list');
        this.todoPrint = document.getElementById('todo__print');
        this.todoExport = document.getElementById('todo__export');
        this.todoImport = document.getElementById('todo__import');
        this.todoToolbar = document.getElementById('todo__toolbar');
        this.todoFooter = document.getElementById('todo__footer');
        this.showTodoTasks = document.getElementById('todo__tasks');
        this.showTodoTasksRemoved = document.getElementById('todo__tasks-removed');
        this.showTodoTasksCompleted = document.getElementById('todo__tasks-completed');
        this.showTodoTasksReset = document.getElementById('todo__tasks-reset');
        this.showTodoCalendar = document.getElementById('todo__calendar');
        this.todoTasks = document.getElementById('todo__tasks');
        this.todoCheckAll = document.getElementById('todo__check-all');
        this.todoUncheckAll = document.getElementById('todo__uncheck-all');
        this.todoRemoveAll = document.getElementById('todo__remove-all');
        this.todoCompleteAll = document.getElementById('todo__complete-all');
        this.todoAddItem = document.getElementById('todo__item-add');

        this.loadLocalStorage();

        this.initEvents();
    }

    initEvents = () => {
        // global listeners for dynamically added elements
        addGlobalListener('click', '.todo__item-check', this.toggleCheck);
        addGlobalListener('click', '.todo__item-remove', this.removeItem);
        addGlobalListener('click', '.todo__item-complete', this.completeItem);
        addGlobalListener('click', '.todo__item-move-down', this.moveDownItem);
        addGlobalListener('click', '.todo__item-move-up', this.moveUpItem);

        // regular listeners for statically added elements
        this.showTodoTasks.addEventListener('click', this.displayTodoList);
        this.showTodoTasksRemoved.addEventListener('click', () => {
            this.displayTodoList('todoRemovedTasks');
        });
        this.showTodoTasksCompleted.addEventListener('click', () => {
            this.displayTodoList('todoCompletedTasks');
        });
        this.showTodoTasksReset.addEventListener('click', this.resetTodoList);

        this.todoCheckAll.addEventListener('click', this.checkAll);
        this.todoUncheckAll.addEventListener('click', this.uncheckAll);
        this.todoAddItem.addEventListener('click', this.addItem);
        this.todoRemoveAll.addEventListener('click', this.removeAllItems);
        this.todoCompleteAll.addEventListener('click', this.completeAllItems);
        this.todoPrint.addEventListener('click', this.printList);
        this.todoExport.addEventListener('click', this.exportList);
        this.todoImport.addEventListener('click', this.importList);
    }

    loadLocalStorage = () => {
        this.todoLocalStorage = JSON.parse(localStorage.getItem('todo'));

        if (this.todoLocalStorage === null) {
            this.todoLocalStorage = {}
            this.todoLocalStorage.todoTasks = [];
            this.todoLocalStorage.todoRemovedTasks = [];
            this.todoLocalStorage.todoCompletedTasks = [];
        }

        this.displayTodoList();
    }

    displayTodoList = (_type = "todoTasks") => {
        this.todoList.innerHTML = "";
        switch (_type) {
            case 'todoRemovedTasks':
                this.todoToolbar.style.display = "none";
                this.todoFooter.style.display = "none";

                if (this.todoLocalStorage.todoRemovedTasks.length) {
                    this.todoLocalStorage.todoRemovedTasks.forEach((_text) => {
                        this.displayItem(_text);
                    });
                } else {
                    this.displayErrorMessage();
                }
                break;
            case 'todoCompletedTasks':
                this.todoToolbar.style.display = "none";
                this.todoFooter.style.display = "none";

                if (this.todoLocalStorage.todoCompletedTasks.length) {
                    this.todoLocalStorage.todoCompletedTasks.forEach((_text) => {
                        this.displayItem(_text);
                    });
                } else {
                    this.displayErrorMessage();
                }

                break;
            default:
                this.todoToolbar.style.display = "flex";
                this.todoFooter.style.display = "flex";

                if (this.todoLocalStorage.todoTasks.length) {
                    this.todoLocalStorage.todoTasks.forEach((_text) => {
                        this.displayItem(_text, true);
                    });
                } else {
                    this.displayErrorMessage();
                }
                break;
        }
    }

    resetTodoList = () => {
        this.todoLocalStorage = {};
        this.todoLocalStorage.todoTasks = [];
        this.todoLocalStorage.todoRemovedTasks = [];
        this.todoLocalStorage.todoCompletedTasks = [];
        localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));
        this.displayTodoList();
    }

    toggleCheck = (e) => {
        const item = e.target.closest('.todo__item');

        item.classList.toggle('todo__item--checked');
    }

    removeItem = (e) => {
        const item = e.target.closest('.todo__item');
        const itemText = item.querySelector('.todo__item-text').textContent;

        this.todoLocalStorage.todoTasks.splice([...item.parentNode.children].indexOf(item), 1);
        this.todoLocalStorage.todoRemovedTasks.push(itemText);
        localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));

        item.remove();

        if (this.todoLocalStorage.todoTasks.length === 0) {
            this.displayErrorMessage();
        }
    }

    completeItem = (e) => {
        const item = e.target.closest('.todo__item');
        const itemText = item.querySelector('.todo__item-text').textContent;

        this.todoLocalStorage.todoTasks.splice([...item.parentNode.children].indexOf(item), 1);
        this.todoLocalStorage.todoCompletedTasks.push(itemText);
        localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));

        item.remove();

        if (this.todoLocalStorage.todoTasks.length === 0) {
            this.displayErrorMessage();
        }
    }

    moveDownItem = (e) => {
        const item = e.target.closest('.todo__item');

        if (item.nextElementSibling === null) return;

        this.todoLocalStorage.todoTasks = swap(this.todoLocalStorage.todoTasks, [...item.parentNode.children].indexOf(item), [...item.parentNode.children].indexOf(item.nextElementSibling));
        localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));

        item.parentNode.insertBefore(item.nextElementSibling, item);
    }

    moveUpItem = (e) => {
        const item = e.target.closest('.todo__item');

        if (item.previousElementSibling === null) return;

        this.todoLocalStorage.todoTasks = swap(this.todoLocalStorage.todoTasks, [...item.parentNode.children].indexOf(item), [...item.parentNode.children].indexOf(item.previousElementSibling));
        localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));

        item.parentNode.insertBefore(item, item.previousElementSibling);
    }

    checkAll = () => {
        document.querySelectorAll('.todo__item').forEach((_item) => {
            _item.classList.add('todo__item--checked');
        });
    }

    uncheckAll = () => {
        document.querySelectorAll('.todo__item').forEach((_item) => {
            _item.classList.remove('todo__item--checked');
        });
    }

    removeAllItems = () => {
        document.querySelectorAll('.todo__item--checked').forEach((_item) => {
            const itemText = _item.querySelector('.todo__item-text').textContent;

            this.todoLocalStorage.todoTasks.splice([..._item.parentNode.children].indexOf(_item), 1);
            this.todoLocalStorage.todoRemovedTasks.push(itemText);
            localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));

            _item.remove();
        });

        if (this.todoLocalStorage.todoTasks.length === 0) {
            this.displayErrorMessage();
        }
    }

    completeAllItems = () => {
        document.querySelectorAll('.todo__item--checked').forEach((_item) => {
            const itemText = _item.querySelector('.todo__item-text').textContent;

            this.todoLocalStorage.todoTasks.splice([..._item.parentNode.children].indexOf(_item), 1);
            this.todoLocalStorage.todoCompletedTasks.push(itemText);
            localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));

            _item.remove();
        });


        if (this.todoLocalStorage.todoTasks.length === 0) {
            this.displayErrorMessage();
        }
    }

    displayItem = (_text, _showActions = false) => {
        const newItem = document.createElement('div');
        let newItemContent = "";

        newItem.classList.add('todo__item');
        newItemContent = `<div class="todo__item-content">`

        if (_showActions) {
            newItemContent += `<div class="todo__item-check"></div>`
        }

        newItemContent += `<span class="todo__item-text">${_text}</span>
            </div>`

        if (_showActions) {
            newItemContent += `<div class="todo__item-actions">
            <div class="todo__item-btn todo__item-remove">
                <i class="fas fa-trash"></i>
            </div>
            <div class="todo__item-btn todo__item-complete">
                <i class="fas fa-check"></i>
            </div>
            <div class="todo__item-btn todo__item-move-down">
                <i class="fas fa-arrow-down"></i>
            </div>
            <div class="todo__item-btn todo__item-move-up">
                <i class="fas fa-arrow-up"></i>
            </div>`
        }

        newItemContent += `</div>`;

        newItem.innerHTML = newItemContent;

        this.todoList.append(newItem);
    }

    addItem = (e, _text = null) => {
        let newItemText = null;

        newItemText = prompt("Your new todo element:");
        if (newItemText == null) {
            return;
        } else if (newItemText.length < 3) {
            alert(`Too short! Item not created!`);
            return;
        }

        if (this.todoLocalStorage.todoTasks.length === 0) {
            this.todoList.innerHTML = "";
        }

        this.todoLocalStorage.todoTasks.push(newItemText);
        localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));
        this.displayItem(newItemText, true);
    }

    printList = () => {
        this.displayTodoList();
        window.print();
    }

    exportList = () => {
        const file = document.createElement('a');
        file.setAttribute('download', 'todo.txt');
        file.href = window.URL.createObjectURL(new Blob([JSON.stringify(this.todoLocalStorage)], {
            type: 'text/csv'
        }));

        const evt = new MouseEvent('click');

        file.dispatchEvent(evt);
    }

    importList = () => {
        const fileReader = new FileReader;
        const inputFile = document.createElement('input');
        inputFile.setAttribute('type', 'file');

        inputFile.addEventListener('change', () => {
            let files = inputFile.files;

            if (files.length === 0) return;

            const file = files[0];

            const reader = new FileReader();

            reader.onload = (e) => {
                const file = e.target.result;

                this.todoLocalStorage = JSON.parse(file);
                localStorage.setItem('todo', JSON.stringify(this.todoLocalStorage));
                this.displayTodoList();
            }

            reader.onerror = (e) => alert('error!');

            reader.readAsText(file);
        })

        const evt = new MouseEvent('click');

        inputFile.dispatchEvent(evt);
    }

    displayErrorMessage = () => {
        this.todoList.innerHTML = `<div class="message">No tasks available!</div>`;
    }
}