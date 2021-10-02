export default function bindToggleClass(_toggles, _targets, _class) {
    const toggles = document.querySelectorAll(_toggles);
    const targets = document.querySelectorAll(_targets);

    toggles.forEach((item) => {
        item.addEventListener("click", () => {
            targets.forEach((item) => {
                item.classList.toggle(_class);
            });
        });
    });
}