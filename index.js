let inputStr = "";
let displayStr = "";
//calculator input field
const calcInput = document.getElementById("display");
const displayValue = document.getElementById("calculator-input")
const degTorad = document.getElementById('deg-btn');


let isExponential = false; // Track the scientific notation

// Toogle DEG button to Radian and vice versa.
let isRad = true;

displayValue.addEventListener("click", (e)=> {

    let currentKey = e.target.closest("button")?.value;
    console.log(currentKey);
  
    if(!currentKey) {
      return
    }
    switch(currentKey) {
      
      case "=":
    
        if(!inputStr) {
          calcInput.textContent = 0;
        }
        else {
          let res = calculateExpression(inputStr);
          inputStr = res;
          console.log(res);
         
          
        }
       
        break;
  
      case "F-E":
        toggleExponential()
        break;
  
      case "DEG":
        degToRad()
        e.target.value = "RAD"
        // degToRad()
        break;
  
      case "RAD":
        degToRad()
        e.target.value = "DEG"
        // degToRad()
        break
      case "C":
       clearScreen();
       break;
  
      case "backspace":
        removeLastChar();
        break;
  
      case "*":
        calcMultiplication();
        break;
  
      case "factorial":
        if(!inputStr) {
          return;
        }
        else {
          displayStr += "!"
        calcInput.textContent = displayStr;
        let num = Number(inputStr.at(-1));
        let result = calcfactorial(num);
        // str.charAt(str.length - 1) = result
        inputStr = inputStr.slice(0, -1);
        inputStr += result;
        console.log(result);
        calcInput.scrollTo(calcInput.offsetWidth, 0);
        }
        
        break;
      
      case "square":
        calcSquare();
        break;
  
      case "2nd":
        secondFunctionality()
        break;
  
      case "powerof10":
        displayStr += "10^"
        calcInput.textContent = displayStr;
        inputStr += "10 **"
        break;
        
      case "1/":
        calcInverse();
        break;
  
        case "absolute-value":
           calcAbsolute();
          break;
  
        case "exp":
          exponents();
          break;
  
        case "power":
         calcPower();
         break;
  
        case "squareRoot":
          calcSquareRoot()
          break;
  
        case "log":
          calcLogaritham();
          break;
  
        case "ln":
          calcLn()
          break;
  
        case "e":
          calcExponent()
          break;
  
        case "+/-":
          toogleSign()
          break;
  
      //Trignometry function
        
      case "sin":
        sinex();
        break;
  
      case "cos":
        cosex();
        break;
  
      case "tan":
        tanx();
        break;
  
      //Advance function
  
      case "floor":
        floor();
        break;
  
      case "ceil":
        ceil();
        break;
  
      case 'M+':{
        memoryPlus()
        break;
      }
  
      case "M-": {
        memorySubtraction();
        break;
        
      }
  
      case "MS": {
        memorySave()
        break;
      }
  
      case "MR":
        calcInput.textContent=memory;
        break;
  
      case "MC":
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
  

  export function calculateExpression(inputStr){   
    try {
      let result;
      let newstr = inputStr.replace('^','**');
      newstr = inputStr.replace("x", "*")
      //replace string for absolute value
      let regexmodulus=/\|(.+)\|/g;
      newstr=newstr.replace(regexmodulus,(match,num)=>{
        console.log(num);             
        let cal=eval(num);
             if(cal<0){
             cal=-cal;
            }
       // console.log(cal);
                                          
        return cal;
   });

      console.log(newstr);
      
      result = eval(newstr);
      result = result.toFixed(2);
      

      addToHistory(`${newstr} = ${result}`);
      inputStr = result;
      displayStr = result;
      updateDisplay()
      
      return result;
      
    }
    catch(error) {
      // calcInput.textContent = "Error"
      alert("Invalid Expression !")
      // displayStr = "0";
      calcInput.textContent = "0"
      displayStr = ""
      let newstr = ""
      return newstr;
    }
 
}


// calculate Multiplication 
function calcMultiplication() {
displayStr += "x";
inputStr += "*"
calcInput.textContent += "x"
}

//calculate square of number
function calcSquare() {
if(!is2nd) {
  displayStr += "^3";
  inputStr += "**3"
}
else {
  displayStr += "^2";
  inputStr += "^2"
}
calcInput.textContent = displayStr;
// calcInput.scrollTo(calcInput.offsetWidth, 0);
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
  displayStr += "√("
  inputStr += "Math.cbrt("
} else {
   displayStr += "√("
   inputStr += "Math.sqrt("
}
calcInput.textContent = displayStr;
calcInput.scrollTo(calcInput.offsetWidth, 0);
}

//calclate logaritham
function calcLogaritham() {
displayStr += "log("
inputStr += "Math.log10("
calcInput.textContent = displayStr;
}

//calculate Ln for number
function calcLn() {
displayStr += "ln(";
inputStr += "Math.log(";
calcInput.textContent = displayStr;
}

//calclate exponenet of number 
function calcExponent() {
displayStr += "e";
  if(!inputStr) {
  inputStr += "Math.E";
  } else {
    inputStr+= "*Math.E";
  }
calcInput.textContent = displayStr
}

//toogle sign for output or input between + or -
function toogleSign() {
let strMatch = inputStr.match(/(-?\d+(\.\d+)?)$/);
if(strMatch) {
 console.log("matched !");
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

/ history manage

function addToHistory(calculation) {
  // Add the calculation to history
  history.push(calculation);
  // Limit the history to the last 5 calculations
  if (history.length > 5) {
      history.shift();  // Remove the oldest item
  }
  // Save the updated history to localStorage
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  // Update the history display
  updateHistoryDisplay();
}
function updateHistoryDisplay() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  // Display the last 5 calculations
  history.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      historyList.appendChild(li);
  });
}
// Initialize the history display when the page loads
window.onload = function() {
  updateHistoryDisplay();
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
    displayStr += "10^"
    inputStr += "10 ** ";
    calcInput.textContent = displayStr;

  } else {
     displayStr += " x10^";
     inputStr += "*10 **";
     calcInput.textContent = displayStr;
  }
}

// calculate Absolute

function calcAbsolute() {
  displayStr += "|";
  inputStr += "|"
  calcInput.textContent = displayStr;
  
  // let newstr = inputStr;

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
// Math.PI
  inputStr += !isRad ? "Math.sin(" : "Math.sin((Math.PI/180)*"
  displayStr += "sin(";
  // inputStr += "Math.sin("
  calcInput.textContent = displayStr;
 }
 
 function cosex() {
  inputStr += !isRad ? "Math.cos(" : "Math.cos((Math.PI/180)*"
  displayStr += "cos(";
  calcInput.textContent = displayStr;
 }

 function tanx() {
  inputStr += !isRad ? "Math.tan(" : "Math.tan((Math.PI/180)*"
  displayStr += "tan(";
  calcInput.textContent = displayStr;
 } 

//Advanced function

function floor() {
  inputStr += "Math.floor("
  displayStr += "floor("
  calcInput.textContent = displayStr;
}

function ceil() {
  inputStr += "Math.ceil("
  displayStr += "ceil("
  calcInput.textContent = displayStr;
}

// memory operations 

// memory addition M+
function memoryPlus() {
  memory+=eval(inputStr);
  localStorage.setItem('memoryValue',memory);
  updatememorybutton();
  console.log(memory);
}

// memory subtraction 
function memorySubtraction() {
  memory -= eval(inputStr);
  localStorage.setItem('memoryValue', memory);
  updatememorybutton();
  console.log(memory);
}

//memory clear
function memoryClear() {
  memory=0;
  localStorage.removeItem('memoryValue');
  updatememorybutton();
}
 
// save display value to memory
function memorySave() {
  memory=eval(inputStr);
  localStorage.setItem('memoryValue',memory);
  updatememorybutton();
  console.log(memory);
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

