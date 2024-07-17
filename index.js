// Collection Functions (Arrays or Objects)
function myEach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            callback(collection[i], i, collection);
        }
    } else {
        for (const key in collection) {
            if (collection.hasOwnProperty(key)) {
                callback(collection[key], key, collection);
            }
        }
    }
    return collection;
}

console.log("myEach:");
myEach([1, 2, 3], console.log);

function myMap(collection, callback) {
    const result = [];
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            result.push(callback(collection[i], i, collection));
        }
    } else {
        for (const key in collection) {
            if (collection.hasOwnProperty(key)) {
                result.push(callback(collection[key], key, collection));
            }
        }
    }
    return result;
}

console.log("\nmyMap:");
console.log(myMap([1, 2, 3], num => num * 3));

function myReduce(collection, callback, acc) {
    let startIdx = 0;
    if (acc === undefined) {
        acc = Array.isArray(collection) ? collection[0] : Object.values(collection)[0];
        startIdx = 1;
    }
    if (Array.isArray(collection)) {
        for (let i = startIdx; i < collection.length; i++) {
            acc = callback(acc, collection[i], collection);
        }
    } else {
        const values = Object.values(collection);
        for (let i = startIdx; i < values.length; i++) {
            acc = callback(acc, values[i], collection);
        }
    }
    return acc;
}

console.log("\nmyReduce:");
console.log(myReduce([1, 2, 3], (acc, val) => acc + val, 0));

function myFind(collection, predicate) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (predicate(collection[i], i, collection)) {
                return collection[i];
            }
        }
    } else {
        for (const key in collection) {
            if (collection.hasOwnProperty(key) && predicate(collection[key], key, collection)) {
                return collection[key];
            }
        }
    }
    return undefined;
}

console.log("\nmyFind:");
console.log(myFind([1, 2, 3, 4], num => num % 2 === 0));

function myFilter(collection, predicate) {
    const result = [];
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (predicate(collection[i], i, collection)) {
                result.push(collection[i]);
            }
        }
    } else {
        for (const key in collection) {
            if (collection.hasOwnProperty(key) && predicate(collection[key], key, collection)) {
                result.push(collection[key]);
            }
        }
    }
    return result;
}

console.log("\nmyFilter:");
console.log(myFilter([1, 2, 3, 4], num => num % 2 === 0));

function mySize(collection) {
    if (Array.isArray(collection)) {
        return collection.length;
    } else {
        return Object.keys(collection).length;
    }
}

console.log("\nmySize:");
console.log(mySize({one: 1, two: 2, three: 3}));

// Array Functions
function myFirst(array, n) {
    if (n === undefined) {
        return array[0];
    } else {
        return array.slice(0, n);
    }
}

console.log("\nmyFirst:");
console.log(myFirst([5, 4, 3, 2, 1]));
console.log(myFirst([5, 4, 3, 2, 1], 3));

function myLast(array, n) {
    if (n === undefined) {
        return array[array.length - 1];
    } else {
        return array.slice(-n);
    }
}

console.log("\nmyLast:");
console.log(myLast([5, 4, 3, 2, 1]));
console.log(myLast([5, 4, 3, 2, 1], 3));

// Object Functions
function myKeys(object) {
    return Object.keys(object);
}

console.log("\nmyKeys:");
console.log(myKeys({one: 1, two: 2, three: 3}));

function myValues(object) {
    return Object.values(object);
}

console.log("\nmyValues:");
console.log(myValues({one: 1, two: 2, three: 3}));

// Bonus Functions
function mySortBy(array, callback) {
    return array.slice().sort((a, b) => {
        const aVal = callback(a);
        const bVal = callback(b);
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
    });
}

console.log("\nmySortBy:");
console.log(mySortBy([1, 2, 3, 4, 5, 6], num => Math.sin(num)));

const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(mySortBy(stooges, stooge => stooge.name));

function myFlatten(array, shallow, newArr = []) {
    if (shallow) {
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                newArr.push(...array[i]);
            } else {
                newArr.push(array[i]);
            }
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                myFlatten(array[i], false, newArr);
            } else {
                newArr.push(array[i]);
            }
        }
    }
    return newArr;
}

console.log("\nmyFlatten:");
console.log(myFlatten([1, [2], [3, [[4]]]]));
console.log(myFlatten([1, [2], [3, [[4]]]], true));

// Exporting functions for use in Node.js environment
module.exports = {
    myEach,
    myMap,
    myReduce,
    myFind,
    myFilter,
    mySize,
    myFirst,
    myLast,
    myKeys,
    myValues,
    mySortBy,
    myFlatten
};
