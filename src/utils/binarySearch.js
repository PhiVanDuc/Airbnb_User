export function binarySearch(arr, id) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);

        if (arr[middle] === id) {
            return middle;
        } else if (arr[middle] < id) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}