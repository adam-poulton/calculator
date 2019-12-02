/**
 * @author: Adam Poulton
 * @description: Calculator implementation
 */
const S_PERCENT = '\uFF05';
const S_SQRT = '\u221A';
const S_SQR = '\u00B2';
const S_FRACTION = '\u2044';
const S_DIVIDE = '\u00F7';
const S_MULTIPLY = '\u00D7';
const S_SUBTRACT = '\u2212';
const S_PLUS = '\u002B';
const S_EQUALS = '\u003D';
const S_NEGATIVE = '\u002D';
const S_SUPONE = '\u00B9';
const S_SUPPLUS = '\u207A';
const disabled = true;
const symbols = [
  {disabled: true, icon: S_PERCENT, action: "percent"},
  {disabled: true, icon: `${S_SQRT}x`, action: "sqrt"},
  {disabled: true, icon: `x${S_SQR}`, action: "square"},
  {disabled: true, icon: `${S_SUPONE}${S_FRACTION}x`, action: "inverse"},
  {disabled: true, icon: "CE", action: "cleare"},
  {disabled: true, icon: "C", action: "clear"},
  {disabled: true, icon: "B", action: "backspace"},
  {disabled: true, icon: `${S_DIVIDE}`, action: "divide"},
  {disabled: false, icon: "7", action: '7'},
  {disabled: false, icon: "8", action: '8'},
  {disabled: false, icon: "9", action: '9'},
  {disabled: true, icon: `${S_MULTIPLY}`, action: "multiply"},
  {disabled: false, icon: "4", action: '4'},
  {disabled: false, icon: "5", action: '5'},
  {disabled: false, icon: "6", action: '6'},
  {disabled: true, icon: `${S_SUBTRACT}`, action: "subtract"},
  {disabled: false, icon: "1", action: '1'},
  {disabled: false, icon: "2", action: '2'},
  {disabled: false, icon: "3", action: '3'},
  {disabled: true, icon: `${S_PLUS}`, action: "plus"},
  {disabled: true, icon: `${S_SUPPLUS}${S_FRACTION}${S_NEGATIVE}`, action: "negate"},
  {disabled: false, icon: "0", action: '0'},
  {disabled: true, icon: ".", action: "decimal"},
  {disabled: true, icon: `${S_EQUALS}`, action: "equals"},
];

const peek = (aList) => aList.length > 0 ? aList[aList.length-1] : undefined;

const multiply = (x, y) => x * y;

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const divide = (x, y) => x / y;

const square = (x) => x * x; 

const root = (x) => Math.sqrt(x);

const inverse = (x) => 1 / x;

const negate = (x) => -x;

const operate = (operand, a, b) => {
  if (isNaN(a) || isNaN(b)) throw "Parameter is not a number!";
  const x = parseInt(a);
  const y = parseInt(b);
  if (operand === "*") return multiply (x, y);
  if (operand === "/") return divide (x, y);
  if (operand === "+") return add (x, y);
  if (operand === "-") return subtract (x, y);
}

let buffer = [0];

const addToBuffer = (input) => {
  // ToDo: check if input & output is a finite number
  if (isNaN(input)) {
    // handle operands
  } else {
    //handle numbers
    // build numbers when buffer is empty or already contains numbers
    if (buffer.length == 0 || !isNaN(peek(buffer))){
      buffer.push(input)
      if (buffer[0] == 0) buffer.shift()
    }
  }
  refreshScreen();
}

const refreshScreen = () => {
  let result = buffer.join('')
  if (result.length > 10) {
    result = parseInt(result).toExponential(5)
  }
  output.innerText = result
}

const handleInput = (e) => {
  addToBuffer(e.target.dataset.action)
}


const container = document.getElementById('container');
const calculator = document.createElement('div');
const display = document.createElement('div');
const output = document.createElement('div');
function generateUI() {
  calculator.classList.add('calc-container');
  container.appendChild(calculator);

  display.classList.add('calc-display');
  calculator.appendChild(display);

  output.classList.add('calc-output');
  display.appendChild(output);

  const buttons = document.createElement('div');
  buttons.classList.add('calc-buttons');
  calculator.appendChild(buttons);

  for (let i = 1; i < 25; i++) {
    const data = symbols[i-1];
    
    let button = document.createElement('button')
    button.classList.add('calc-button')
    if (i % 4 !== 0 && i > 8 && i !== 21 && i !== 23) {
      button.classList.add('calc-num')
    }
    button.innerText = `${data.icon}`;
    button.setAttribute('data-action', data.action);

    if (data.disabled)
      button.setAttribute('disabled', data.disabled);
    button.addEventListener('click', handleInput);
    buttons.appendChild(button);
  }
}


generateUI();
refreshScreen();
