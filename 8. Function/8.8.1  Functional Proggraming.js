var data = [1, 2, 3, 4, 5];

// How to count the sum, average and deviation

// We can do it in a normal way: 

var sum = 0,
    mean, deviation = [];

for (var i = 0; i < data.length; ++i) {
    sum += data[i];
}

mean = sum / data.length;

for (var i = 0; i < data.length; ++i) {
    deviation.push(Math.pow(data[i] - mean, 2));
}

var totalDeviation = 0;

for (var i = 0; i < deviation.length; ++i) {
    totalDeviation += deviation[i];
}

totalDeviation = Math.sqrt(totalDeviation);
console.log(totalDeviation);

//================================================================



// But there is another, more subtle way, brought by functional programming

function add(x, y) {
    return x + y;
}

function square(x) {
    return x * x;
}


mean = data.reduce(add) / data.length;

totalDeviation = data.map(function deviation(x) {
    return x - mean;
}).map(square).reduce(add);

totalDeviation = Math.sqrt(totalDeviation);

console.log(totalDeviation);

//================================================================

//What if we don't have these methods? (We are in ECMA3, for example)

//Lets define our own!

var reduce = /*  Array.prototype.reduce ? Array.prototype.reduce :  */ function reduce(array, callback, accumulator) {
    var i = accumulator ? 0 : 1;
    if (!accumulator) {
        accumulator = array[0];
    }
    for (i; i < array.length; ++i) {
        if (i in array) accumulator = callback(accumulator, array[i]);
    }

    return accumulator;
}

console.log(reduce(data, add));

var map = /* Array.prototype.map ? function(array, callback) {  
    return array.map(callback)
    } : */ function map(array, callback) {
    var newArray = [],
        len = array.length;

    for (var i = 0; i < len; ++i) {
        if (i in array) newArray.push(callback(array[i]));
    }

    return newArray;

}

console.log(map(data, square));

