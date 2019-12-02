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

const container = document.getElementById('container');

const calculator = document.createElement('div');
calculator.classList.add('calc-container');
container.appendChild(calculator);

const display = document.createElement('div');
display.classList.add('calc-display');
calculator.appendChild(display);

const buttons = document.createElement('div');
buttons.classList.add('calc-buttons');
calculator.appendChild(buttons);

for (let i = 1; i < 25; i++) {
  let button = document.createElement('div')
  button.classList.add('calc-button')
  if (i % 4 !== 0 && i > 8 && (i != 21 || i != 23)) {
    button.classList.add('calc-num')
  }
  buttons.appendChild(button);
}

