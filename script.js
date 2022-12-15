
/*calculator app */

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => parseInt(a / b);


const operate = (opearator, a, b) => opearator(a, b);
/*
operate - calls the above functions(opearator) along with 2 numbers
*/

