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

