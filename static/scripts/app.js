import bindToggleClass from './toggle.js';
import ToDo from './todo.js';

window.addEventListener("DOMContentLoaded", () => {
    const toggleClass = bindToggleClass('.header__item-hamburger, .layout-grid__toggle', '.layout-grid', 'layout-grid--show-aside');

    const toDo = new ToDo();
});