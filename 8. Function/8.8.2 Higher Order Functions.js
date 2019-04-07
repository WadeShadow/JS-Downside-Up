// Higher order function is the function that operates on functions, taking 
// one or more functions and returning functions as the return value

/**
 *  A function that gets a function and returns the logical negation of its result
 */

function not(func) {
    return function f() {
        var result = func.apply(this, arguments);
        return !result;
    }
}

var even = function(x){
    return x%2===0;
}

var odd = not(even);

console.log( odd(-1));

//================================================================


// Lets define some "mapper" function. It uses map from the previous paragraph

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

var mapper = function mapper(func){
    return function maping(array){
        return map(array, func);
    }
}

function increment(x){
    return x+1;
}

var incrementer = mapper(increment);
console.log( incrementer([1,2,3,4])); // [2,3,4,5]


//================================================================



//What about function composition? Easy
function compose(funcF, funcG){
    return function composition(){
        return funcF.call(this, funcG.apply(this, arguments));
    }
}

var sum = function(x,y){
    return x+y;
}

var square = function (x){
    return x*x;
}

var squareOfSum = compose(square, sum);

console.log(squareOfSum(4,5));