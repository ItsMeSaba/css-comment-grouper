export function listToArray(headOfList: any) {
    const array = [];

    while (headOfList) {
        array.push(headOfList.data);

        headOfList = headOfList.next;
    }

    return array;
}