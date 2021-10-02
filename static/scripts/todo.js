import addGlobalListener from './globalListener.js';

export default class ToDo {
    constructor() {
        this.todoList = document.getElementById('todo__list');
        this.todoCheckAll = document.getElementById('todo__check-all');
        this.todoUncheckAll = document.getElementById('todo__uncheck-all');
        this.todoRemoveAll = document.getElementById('todo__remove-all');
        this.todoCompleteAll = document.getElementById('todo__complete-all');
        this.todoAddItem = document.getElementById('todo__item-add');

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
        this.todoCheckAll.addEventListener('click', this.checkAll);
        this.todoUncheckAll.addEventListener('click', this.uncheckAll);
        this.todoAddItem.addEventListener('click', this.addItem);
        this.todoRemoveAll.addEventListener('click', this.removeAllItems);
        this.todoCompleteAll.addEventListener('click', this.completeAllItems);
    }

    toggleCheck = (e) => {
        e.target.closest('.todo__item').classList.toggle('todo__item--checked');
    }

    removeItem = (e) => {
        e.target.closest('.todo__item').remove();
    }

    completeItem = (e) => {
        e.target.closest('.todo__item').remove();
    }

    moveDownItem = (e) => {
        const item = e.target.closest('.todo__item');

        if (item.nextElementSibling === null) return;

        item.parentNode.insertBefore(item.nextElementSibling, item);
    }

    moveUpItem = (e) => {
        const item = e.target.closest('.todo__item');

        if (item.previousElementSibling === null) return;

        item.parentNode.insertBefore(item, item.previousElementSibling);
    }

    checkAll = () => {
        document.querySelectorAll('.todo__item').forEach((item) => {
            item.classList.add('todo__item--checked');
        });
    }

    uncheckAll = () => {
        document.querySelectorAll('.todo__item').forEach((item) => {
            item.classList.remove('todo__item--checked');
        });
    }

    removeAllItems = () => {
        document.querySelectorAll('.todo__item--checked').forEach((item) => {
            item.remove();
        });
    }

    removeAllItems = () => {
        document.querySelectorAll('.todo__item--checked').forEach((item) => {
            item.remove();
        });
    }

    completeAllItems = () => {
        document.querySelectorAll('.todo__item--checked').forEach((item) => {
            item.remove();
        });
    }

    addItem = (e) => {
        const newItem = document.createElement('div');
        const newItemText = prompt("Your new todo element:");

        if (newItemText == null) {
            return;
        } else if (newItemText.length < 3) {
            alert(`Too short! Item not created!`);
            return;
        }

        newItem.classList.add('todo__item');
        newItem.innerHTML = `<div class="todo__item-content">
        <div class="todo__item-check"></div>
        <span>${newItemText}</span>
        </div>
        <div class="todo__item-actions">
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
            </div>
        </div>`;

        this.todoList.append(newItem);
    }
}