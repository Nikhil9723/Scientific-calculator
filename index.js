import {
  addToHistory,
} from "./history.js"

import {
  memoryPlus,
  memorySubtraction,
  memoryClear, 
  memorySave,
  memoryRead
} from "./memoryManagment.js"

import {BUTTON_TYPES, ELEMENT_IDS} from "./constants.js"



let inputStr = "";
let displayStr = "";
//calculator input field
const calcInput = document.getElementById("display");
const displayValue = document.getElementById("calculator-input")
const degTorad = document.getElementById(ELEMENT_IDS.DEG_BTN);



//get elemet for square and squareRoot
const square = document.getElementById(ELEMENT_IDS.SQUARE);
const squareRoot = document.getElementById(ELEMENT_IDS.SQUARE_ROOT);



let isExponential = false; // Track the scientific notation

// Toogle DEG button to Radian and vice versa.
let isRad = true;

export function setInputString(str) {
  inputStr = str;
}

export function getInputString() {
  return inputStr;
}

export function setDisplayStr(str) {
  displayStr = str;
}

export function getDisplayStr(displayStr) {
  return displayStr;
}

export function addDisplayStr(str) {
  displayStr = displayStr + str;
}

export function addInputStr(str) {
  inputStr = inputStr + str;
}

export function updateDisplay() {  
  calcInput.textContent = displayStr || 0;
}


// get input from inbuild keybord
  displayValue.addEventListener("click", (e)=> {

  let currentKey = e.target.closest("button")?.value;

  if(!currentKey) {
    return
  }
  switch(currentKey) {
    
    case BUTTON_TYPES.EQUAL:
  
      if(!inputStr) {
        calcInput.textContent = 0;
      }
      else {
        let res = calculateExpression(inputStr);
        inputStr = res;
      }
     
      break;

    case BUTTON_TYPES.FUNCTION_EXPONENTIAL:
      toggleExponential()
      break;

    case BUTTON_TYPES.DEG :
      degToRad()
      e.target.value = "RAD"
      // degToRad()
      break;

    case BUTTON_TYPES.RAD :
      degToRad()
      e.target.value = "DEG"
      // degToRad()
      break
    case BUTTON_TYPES.CLEAR_SCREEN:
     clearScreen();
     break;

    case BUTTON_TYPES.BACKSPACE:
      removeLastChar();
      break;

    case BUTTON_TYPES.MULTIPLICATION:
      calcMultiplication();
      break;

    case BUTTON_TYPES.DIVIDE:
      calcDivison();
      break;

    case BUTTON_TYPES.FACTORIAL:
      if(!inputStr) {
        return;
      }
      else {
        displayStr += "!"
      calcInput.textContent = displayStr;
      inputStr = inputStr.toString()
  
      let num = Number(inputStr);
      let result = calcfactorial(num);

      inputStr = inputStr.slice(0, -1);
      inputStr += result;
      calcInput.scrollTo(calcInput.offsetWidth, 0);
      }
      
      break;
    
    case BUTTON_TYPES.SQUARE:
      calcSquare();
      break;

    case BUTTON_TYPES.SECOND_FUNCTIONALITY:
      secondFunctionality()
      break;

    case BUTTON_TYPES.POWER_OF_10:
      displayStr += "10^"
      calcInput.textContent = displayStr;
      inputStr += "10 **"
      break;
      
    case BUTTON_TYPES.INVERSE:
      calcInverse();
      break;

      case BUTTON_TYPES.ABSOLUTE_VALUE:
         calcAbsolute();
        break;

      case BUTTON_TYPES.EXPONENET:
        exponents();
        break;

      case BUTTON_TYPES.POWER:
       calcPower();
       break;

      case BUTTON_TYPES.SQUARE_ROOT:
        calcSquareRoot()
        break;

      case BUTTON_TYPES.LOG:
        calcLogaritham();
        break;

      case BUTTON_TYPES.LN:
        calcLn()
        break;

      case BUTTON_TYPES.E:
        calcExponent()
        break;

      case BUTTON_TYPES.PLUSH_MINUS:
        toogleSign()
        break;

    //Trignometry function
      
    case BUTTON_TYPES.SINEX:
      sinex();
      break;

    case BUTTON_TYPES.COSEX:
      cosex();
      break;

    case BUTTON_TYPES.TANEX:
      tanx();
      break;

    //Advance function

    case BUTTON_TYPES.FLOOR:
      floor();
      break;

    case BUTTON_TYPES.CEIL:
      ceil();
      break;

    case BUTTON_TYPES.MEMORY_PLUSH:{
      memoryPlus()
      break;
    }

    case BUTTON_TYPES.MEMORY_MINUS: {
      memorySubtraction();
      break;
    }

    case BUTTON_TYPES.MEMORY_SAVE: {
      memorySave()
      break;
    }

    case BUTTON_TYPES.MEMORY_READ:
      memoryRead();
      
      break;

    case BUTTON_TYPES.MEMORY_CLEAR:
      memoryClear()
      break;

    default: 
      inputStr += e.target.value;
      displayStr += e.target.value;
      calcInput.textContent = displayStr;
      calcInput.scrollTo(calcInput.offsetWidth, 0);      
      break;

  }
})




// calcu4late Final output

export function calculateExpression(inputStr){   
      try {
        let result;
        let newstr = inputStr.replace('^','**');
        newstr = inputStr.replace("x", "*")

        //replace string for absolute value
        let regexmodulus=/\|(.+)\|/g;
        newstr=newstr.replace(regexmodulus,(match,num)=>{
          let cal=eval(num);
               if(cal<0){
               cal=-cal;
              }                                            
          return cal;
     });        
        result = eval(newstr);
        addToHistory(`${newstr} = ${result}`);
        inputStr = result;
        displayStr = result;
        updateDisplay()
        
        return result;
        
      }
      catch(error) {
        alert("Invalid Expression !")
        calcInput.textContent = "0"
        displayStr = ""
        let newstr = ""
        return newstr;
      }
   
}


// calculate Multiplication 
function calcMultiplication() {
  displayStr += "x";
  inputStr += "*";
  calcInput.textContent += "x";
}

// calculate division
function calcDivison() {  
  displayStr += "÷";
  inputStr += "/"
  calcInput.textContent += "÷"
}

//calculate square of number
function calcSquare() {
  if(!is2nd) {
    updateCalculationString("^3", "**3")
  }
  else {
    updateCalculationString("^2", "**2")
  }
  calcInput.textContent = displayStr;
}

//calculate inverse of number
function calcInverse() {
  if(inputStr != "0") {
    inputStr = "1/";
    displayStr = "1/"
    calcInput.textContent = displayStr;
    calcInput.scrollTo(calcInput.offsetWidth, 0);
  }
}

//calculate power of number
function calcPower() {
  displayStr += "^";
  calcInput.textContent = displayStr;
  inputStr += "^"
  calcInput.scrollTo(calcInput.offsetWidth, 0);
}

//calculate square root of number
function calcSquareRoot() {
  if(!is2nd) {
    updateCalculationString("√(", "Math.cbrt(")
  } else {
     updateCalculationString("√(", "Math.sqrt(")
  }
  calcInput.textContent = displayStr;
  calcInput.scrollTo(calcInput.offsetWidth, 0);
}

//calclate logaritham
function calcLogaritham() {
  updateCalculationString("log(", "Math.log10(")
}

//calculate Ln for number
function calcLn() {
  updateCalculationString("ln(", "Math.log(")
}

//calclate exponenet of number 
function calcExponent() {
    if(!inputStr) {
      updateCalculationString("e", "Math.E");
    } else {
      updateCalculationString("e", "*Math.E")
    } 
}

//toogle sign for output or input between + or -
function toogleSign() {
  let strMatch = inputStr.match(/(-?\d+(\.\d+)?)$/);
  if(strMatch) {
   let num = Number(strMatch[1]);
   let toggle = num * -1;
   inputStr = inputStr.replace(/(-?\d+(\.\d+)?)$/, `${toggle}`);
   displayStr = inputStr;
   calcInput.textContent = displayStr; 
  }
}

// deg to rad toogle function
function degToRad() {
  degTorad.textContent = isRad ? "RAD" : "DEG"
  isRad = !isRad;
}

// 2nd functionality
let is2nd = true;

function secondFunctionality() {
  square.innerHTML = is2nd ? `x<sup>3</sup>` : `x<sup>2</sup>`;
  squareRoot.innerHTML = is2nd ? `<sup>3</sup>&Sqrt;x`: `<sup>2</sup>&Sqrt;x`
  is2nd = !is2nd;
}



// Clear Screen 

function clearScreen() {
  calcInput.textContent = '0'
  inputStr = '';
  displayStr = ""
}

//remove last character

export function removeLastChar() {
  calcInput.textContent = calcInput.textContent.slice(0, -1);
  inputStr = calcInput.textContent;
  displayStr = calcInput.textContent;

  if(!inputStr) {
    calcInput.textContent = "0"
  }
}
 

// calculate factorial

function calcfactorial(num) {
  
  if(num === 0) {
    return 1
  }

  return num * calcfactorial(num-1)
}


//calculate exponents

function exponents() {
  if(!inputStr) {
    updateCalculationString("10^", "10 ** ")
  } else {
     updateCalculationString(" x10^", "*10 **")
  }
}

// calculate Absolute

function calcAbsolute() {
  updateCalculationString("|",  "|");
}

// calculate Function exponention

function toggleExponential() {

  if (!inputStr || isNaN(Number(inputStr))) return;
 
  let num = Number(inputStr);
  isExponential = !isExponential;
 
  if (isExponential) {
    let exponent = num.toExponential().split("e");
    inputStr = `${exponent[0]}*10**${Number(exponent[1])}`;
    displayStr = `${exponent[0]}*10^${Number(exponent[1])}`;
    calcInput.textContent = displayStr
    isExponential = false;
  } else {
    inputStr = num.toString();
    displayStr = inputStr;
    calcInput.textContent = displayStr;
  }
 
}

 // calculate trignometry function
 function sinex() {
  if(!isRad) {
    updateCalculationString("sin(", "Math.sin(");
  }
  else {
    updateCalculationString("sin(",  "Math.sin((Math.PI/180)*");
  }  
 }
 
 function cosex() {
  if(!isRad) {
    updateCalculationString("cos(",  "Math.cos(");
  }
  else {
    updateCalculationString("cos(",  "Math.cos((Math.PI/180)*");
  }
 }

 function tanx() {
  if(!isRad) {
    updateCalculationString("tan(", "Math.tan(")
  }
  else {
    updateCalculationString("tan(", "Math.tan((Math.PI/180)*")
  }
 } 

//Advanced function

function floor() {
  updateCalculationString("floor(", "Math.floor(");
}

function ceil() {
  updateCalculationString("ceil(", "Math.ceil(");
}


// utility function to update the string for some scientific and exponent

function updateCalculationString(displayAddition, inputAddition) {
  displayStr += displayAddition;
  inputStr+= inputAddition;
  calcInput.textContent = displayStr;
  calcInput.scrollTo(calcInput.offsetWidth, 0);
}
 

// dropdown functionality
document
  .querySelector("#trigonometry-dropdown")
  .addEventListener("click", trigonometryFunction);
 
document
  .querySelector("#functional-dropdown")
  .addEventListener("click", functionDropdown);
 
function trigonometryFunction() {
  document.getElementById("trigonometryDropdown").classList.toggle("show");
}
 
function functionDropdown() {
  document.getElementById("functionDropdown").classList.toggle("showFn");
}
 
window.onclick = function (event) {
  let trigDropdown = document.getElementById("trigonometryDropdown");
  let funcDropdown = document.getElementById("functionDropdown");
 
  if (!event.target.closest(".dropbtn")) {
    if (trigDropdown.classList.contains("show")) {
      trigDropdown.classList.remove("show");
    }
  }
 
  if (!event.target.closest(".functionDropbtn")) {
    if (funcDropdown.classList.contains("showFn")) {
      funcDropdown.classList.remove("showFn");
    }
  }
};



