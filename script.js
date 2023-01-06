
/*global variables */

let operand1 = 0;
let operand2 = 0;
let operatorSign = null;
let result = null;
let nextOperation = false;
let powerStatus = false;



// calculator
const add = (a,b) => Number(a) + Number(b);
const subtract = (a,b) => Number(a) - Number(b);
const multiply = (a,b) => Number(a) * Number(b);
const divide = (a,b) => Number(a) / Number(b);




const powerBtn = document.querySelector('.power');

const screen = document.querySelector('#main_screen');

const topScreen = document.querySelector('.top_screen');

const clear = document.querySelector('.clear')

const numbers = [...document.querySelectorAll('.number')];

const operators = [...document.querySelectorAll('.operator')];

const equals = document.querySelector('.equals');

const dot = document.querySelector('.dot')




const operate = (op, a, b) => op(a,b);


function powerScreen() {
  if (!powerStatus) {
    powerStatus = true;
    screen.innerText = '0'
  } else if(powerStatus) {
    operand1 = 0;
    operand2 = 0;
    powerStatus = false;
    topScreen.innerText = '';
    screen.innerText = '';
    result = null;
    operatorSign = null
    nextOperation = false;
  }
}


function addDot() {
  if(screen.innerText !== '') {
    screen.innerText+= this.innerText
   
  } 
  topScreen.innerText += this.innerText
}

function setOperator(e) {
  if(!powerStatus) return;

  if (operatorSign) {
    evaluate()
    topScreen.innerText = result
    console.log(result)
  }

  operatorSign = e.target.innerText
  screen.innerText = ''
  topScreen.innerText += operatorSign

}


function addNum(){
  if(!operatorSign) {
  let num = screen.textContent
  operand1 = Number(num)
  }
}



//dispay numbers
function display (e) {
  if(!powerStatus) return;

  
  if (screen.innerText == '0'){
    screen.innerText = e.target.innerText;
    topScreen.innerText = this.innerText;
  } else if ( screen.innerText == result && topScreen.innerText == result) {
    
    screen.innerText = this.innerText;
    topScreen.innerText = this.innerText;
    result = null
  }
  
  else {
    screen.innerText += e.target.innerText;
  topScreen.innerText+= this.innerText;
  }
}




//evaluate

function evaluate() {
  if (result) {
    operand1 = result;
    operand2 = screen.innerText
  }

  if (operatorSign == '+') {
    operand2 = Number(screen.innerText)
    result = operate(add, operand1, operand2)
    
  } else if (operatorSign == '-') {
    operand2 = Number(screen.innerText)
    result = operate(subtract, operand1, operand2)
  }else if (operatorSign == '*') {
    operand2 = Number(screen.innerText)
    result = operate(multiply, operand1, operand2)
    
  }else if (operatorSign == '/') {
    operand2 = Number(screen.innerText)
    result = operate(divide, operand1, operand2)
  } 
  
   


  
  //
  screen.innerText = result;
  operatorSign = null;
  topScreen.innerText = result;

}





//clear button
function clearScreen() {
  result = null
  operatorSign = null
  screen.innerText = '0';
  topScreen.innerText = '';
  nextOperation = false;
}


document.addEventListener('keydown', (e) => {
  //use backspace to delete items
  if (e.key == 'Backspace') {
  screen.innerText = screen.innerText.slice(0, -1)
  }
  if (e.key >= 0 || e.key<= 9 ) {
    screen.innerText += e.key
  }
  if (e.key == 'Escape') {
    powerScreen()
  }

  const keyChain = 'x-/*+'.split('')

  for (let item of keyChain) {
    if (e.key == item) 
    screen.innerText += item
  }
  
})


/*Display Numbers */

numbers.forEach(number => number.addEventListener('click', display))

numbers.forEach(number => number.addEventListener('click', addNum))

operators.forEach(operator => operator.addEventListener('click', setOperator))
/*clear screen and del */
clear.addEventListener('click', clearScreen)

equals.addEventListener('click', evaluate)

equals.addEventListener('click', ()=>{
  nextOperation = true;
})

dot.addEventListener('click', addDot)

// turn on
powerBtn.addEventListener('click', powerScreen)
