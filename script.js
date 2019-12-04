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
const symbols = [
  {disabled: true, icon: S_PERCENT, action: "percent"},
  {disabled: true, icon: `${S_SQRT}x`, action: "sqrt"},
  {disabled: true, icon: `x${S_SQR}`, action: "square"},
  {disabled: true, icon: `${S_SUPONE}${S_FRACTION}x`, action: "inverse"},
  {disabled: true, icon: "CE", action: "cleare"},
  {disabled: false, icon: "C", action: "clear"},
  {disabled: true, icon: "B", action: "backspace"},
  {disabled: false, icon: `${S_DIVIDE}`, action: "divide"},
  {disabled: false, icon: "7", action: '7'},
  {disabled: false, icon: "8", action: '8'},
  {disabled: false, icon: "9", action: '9'},
  {disabled: false, icon: `${S_MULTIPLY}`, action: "multiply"},
  {disabled: false, icon: "4", action: '4'},
  {disabled: false, icon: "5", action: '5'},
  {disabled: false, icon: "6", action: '6'},
  {disabled: false, icon: `${S_SUBTRACT}`, action: "subtract"},
  {disabled: false, icon: "1", action: '1'},
  {disabled: false, icon: "2", action: '2'},
  {disabled: false, icon: "3", action: '3'},
  {disabled: false, icon: `${S_PLUS}`, action: "add"},
  {disabled: true, icon: `${S_SUPPLUS}${S_FRACTION}${S_NEGATIVE}`, action: "negate"},
  {disabled: false, icon: "0", action: '0'},
  {disabled: false, icon: ".", action: "."},
  {disabled: false, icon: `${S_EQUALS}`, action: "equals"},
];

const peek = (aList) => aList.length > 0 ? aList[aList.length-1] : undefined;

const multiply = (x, y) => x * y;
const multiplyString = (x) => `${x} ${S_MULTIPLY}`;

const add = (x, y) => x + y;
const addString = (x) => `${x} ${S_PLUS}`;

const subtract = (x, y) => x - y;
const subtractString = (x) => `${x} ${S_SUBTRACT}`;

const divide = (x, y) => x / y;
const divideString = (x) => `${x} ${S_DIVIDE}`;

const square = (x) => x * x; 
const sqruareString = (x) => `sqr( ${x} )`;

const sqrt = (x) => Math.sqrt(x);
const sqrtString = (x) => `sqrt( ${x} )`;

const inverse = (x) => 1 / x;
const inverseString = (x) => `1${S_FRACTION} ${x}`;

const negate = (x) => -x;
const negateString = (x) => `negate( ${x} )`;

const equals = (x, y) => y;

const runningDisplayString = (lastDisplay, operator, replace=false) => {
  let string = String(lastDisplay)
  // If replacing an existing operator, slice off last two characters
  if (replace) {
    string = string.slice(0,-2);
  }
  if (operator === 'add') return addString(string);
  if (operator === 'subtract') return subtractString(string)
  if (operator === 'multiply') return multiplyString(string)
  if (operator === 'divide') return divideString(string)
  if (operator === 'equals') return "";

}

const operate = (operand, a, b) => {
  // check parameters
  if (isNaN(a) || (isNaN(b) && b !== undefined)) throw "Parameter is not a number!";

  const x = parseFloat(a);
  const y = parseFloat(b);

  if (operand === "multiply") return multiply (x, y);
  if (operand === "divide") return divide (x, y);
  if (operand === "add") return add (x, y);
  if (operand === "subtract") return subtract (x, y);
  if (operand === "negate") return negate(x);
  if (operand === "inverse") return inverse(x);
  if (operand === "square") return square(x);
  if (operand === "sqrt") return sqrt(x);
  if (operand === "equals" ) return equals(x, y);
}

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  runningDisplay: '',
};

const resetCalculator = () => {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.runningDisplay = '';
}

const inputDigit = (digit) => {
  const {displayValue, waitingForSecondOperand} = calculator;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

const inputDecimal = (dot) => {
  const {displayValue, waitingForSecondOperand} = calculator;
  // If `displayValue` does not contain a decimal point already
  if (!displayValue.includes(dot)) {
    if (waitingForSecondOperand) {
      calculator.displayValue = '0' + dot;
      waitingForSecondOperand = false;
    } else {
      calculator.displayValue += dot;
    }
  }

}

const handleOperator = (nextOperator) => {
  const {firstOperand, displayValue, operator, waitingForSecondOperand} = calculator;
  const inputValue = parseFloat(displayValue);

  // If `nextOperator` is overwriting a previously selected operator
  if (operator && waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;

  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = operate(operator, currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;

  // add a check for operations performed in place. i.e sqrt, square, inverse, negate
  calculator.operator = nextOperator;

}


const clear = () => {
  resetCalculator();
  refreshScreen();
}

const refreshScreen = () => {
  let result = calculator.displayValue
  let auxResult = calculator.runningDisplay
  if (result.length > 10) {
    result = parseFloat(result).toExponential(5)
  }
  output.innerText = result;
  outputAux.innerText = auxResult;
}

const handleInput = (e) => {
  let action = e.target.dataset.action;
  // clear screen
  if (action === 'clear') clear();
  // addition, etc
  if (['add', 'subtract', 'divide', 'multiply', 'equals'].includes(action)) {
    handleOperator(action);
  }
  // decimal place
  if (action === '.') inputDecimal(action);
  // numerical action
  if (!isNaN(action)) inputDigit(action);

  refreshScreen();
  e.target.blur();
}


const container = document.getElementById('container');
const calc = document.createElement('div');
const display = document.createElement('div');
const outputAux = document.createElement('div');
const output = document.createElement('div');
function generateUI() {
  calc.classList.add('calc-container');
  container.appendChild(calc);

  display.classList.add('calc-display');
  calc.appendChild(display);

  outputAux.classList.add('calc-output-aux');
  display.appendChild(outputAux);

  output.classList.add('calc-output');
  display.appendChild(output);

  const buttons = document.createElement('div');
  buttons.classList.add('calc-buttons');
  calc.appendChild(buttons);

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
