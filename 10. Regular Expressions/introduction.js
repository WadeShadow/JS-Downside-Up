// Defining RegExp:

/**
 * In JS regular expressions (RE) are represented by a RegExp object
 * 
 * We have two ways of creating such an object:
 */

// 1. RegExp literal
var pattern = /s$/;

// 2. Using the constructor:
var pattern1 = new RegExp("s$");

// Examples of using RegExps: 
var p1 = /\d{2,4}/; // Match between two and four digits
var p2 = /\w{3}\d?/; // Match exactly three word characters and an optional digit
var p3 = /\s+java\s+/; // Match "java" with one or more spaces before and after
var p4 = /[^(]*;/ // Match zero or more characters that are not open parenthesis

/**
 * Nongreedy repetitions:
 * While using repetitions characters from the previous examples they are looking for as many characters to match as possible:
 * /a+/ will match any sequence of "a" entirely.
 * To make it take as little as possible we should use nongreedy match:
 * Just follow any repetition character(s) with ?: ??, +?, *?
 */

// Caution:
var nonGreedyPattern = /a+?b/;
// It seems that it should match "aaab" in the last "ab" position, but it doesn't. 
//RE work in a way that it lookd for the first position at which match is possible

/**
 * RE grammar supports different expressions for specifying grouping, alternation and references:
 */
var alternationPattern1 = /ab|bc|cd/; // Looks for "ab" OR "bc" OR "cd"
var alternationPattern2 = /\d{3}|[a-z]{4}/; // Matches 3 digits OR 4 lowercase letters


// Parentheses are used to group separate items into one unit:
var groupingPattern1 = /java(script)?/; // Groups "script" into single unit, looking for it entirely

// Another purpose of them is to define subpatterns inside of a complete pattern to extract data from it later:
var referencePattern1 = /['"][^'"]*["']/; // It wiil match any sequence of characters inside ' or ", but there is no guarantee that they will match: "Me' is legal here.
// To require them to match we use reference:
var referencePattern2 = /(['"])[^'"]*\1/; // But it disallows any single quotes inside double quotes and vice versa

var string = `"hello'world'"`;
var newString = string.replace(referencePattern2, "Ouch");
console.log(newString); // gives "hello'world'" by pattern2

// If you don't want to create a numbered reference to the subpattern, simply make it using (?:"here pattern comes")
var pattern2 = /([jJ]ava(?:[sS]cript)?)\sis\s(fun\w*)/;
// Here (?:) was used to not creating numbered reference to [sS]cript, but we became able to place ? after it to make it optional. 
//Thus \1 is ([jJ]a...) pattern, \2 is (fun\w*) pattern

var JSpattern = /^JavaScript$/; // Matches the only word in a string that is JavaScript

// RE also introduce word boundaries \b (\B - not a word boundary) : a position at which \w becomes \W
var javaPattern = /\sJava\s/; // Actually matches 'Java' at any position in string, but except for the beginning or end - it has no spaces there. Also the return string is coupled with spaces.
var newJavaPattern = /\bJava\b/; //It looks for "Java" at any point in the string

//RE grammar also introduces some "lookahead assertions" (?= "pattern") matches the whole pattern only if this asserion matches, 
//but it leaves out all the characters that made this match possible:
var JSpattern1 = /[jJ]ava(?:[sS]cript)?(?=\:)/; // Matches JavaScript in "JavaScript: The Def Guide", doesn`t match "Java something"

//"negative lookfahead assertion":
var JSpattern1 = /[jJ]ava(?:[sS]cript)?(?!\:)/; // Matches Java and JavaScript everywhere, where it is not followed by colon


/**
 * Flags
 * RE has special characters that changes the search mode istead of influencing on the search expression. They are set at the end of RE (after the /):
 * Flags can combined in any fashion
 */

// g - means global. It finds |ALL| the instances of a matched RE in the string: 
var pattern6 = /[jJ]ava/g; //Matches "java", "javajava" and so fourth. Also "java is the bestjava". g stands for global.

//i enforces case-insensitive look
var pattern7 = /java/i; //Matches "java", "JaVa" etc.

//m enforces multiline mode. That is, if the string has more than one line, ^ and $ point to the start and the end of line as well as of string itself.
var pattern8 = /^Java$/m; //Matches "Java" in "Something\nAbout\nJava"

//Combinations: 
var pattern9 = /java/mi; //finds it in any line, in case-insensitive mode