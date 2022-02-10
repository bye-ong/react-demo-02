export const arrayMove = function (arr, from, to) {
    arr = arr.slice();
    if (typeof arr[from] === 'undefined') return arr;
    if (arr.length < to) to = arr.length;
    else if (to < 0) to = 0;
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
};
