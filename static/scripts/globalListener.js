export default function addGlobalListener(_event, _selector, _callback) {
    document.addEventListener(_event, (e) => {
        if (e.target.matches(_selector)) {
            _callback(e);
        }
    })
}