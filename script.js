/**
 * @author: Adam Poulton
 * @description: Calculator implementation
 */

 
const multiply = (a, b) => a * b;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const divide = (a, b) => a / b;

const operate = (operand, a, b) => {
  if (isNaN(a) || isNaN(b)) throw "Parameter is not a number!";
  if (operand === "*") return multiply (a, b);
  if (operand === "/") return divide (a, b);
  if (operand === "+") return add (a, b);
  if (operand === "-") return subtract (a, b);
}
