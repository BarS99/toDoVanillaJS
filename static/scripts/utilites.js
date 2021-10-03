export default function addGlobalListener(_event, _selector, _callback) {
    document.addEventListener(_event, (e) => {
        if (e.target.matches(_selector)) {
            _callback(e);
        }
    })
}

export function swap(_array, _index1, _index2) {
    let buffer = _array[_index1];

    _array[_index1] = _array[_index2];
    _array[_index2] = buffer;

    return _array;
}