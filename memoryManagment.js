// memory operations 
import {
    setInputString,
    getInputString,
    addInputStr,
    setDisplayStr,
    addDisplayStr,
    updateDisplay,
    getDisplayStr
} from "./index.js"

let memory=+localStorage.getItem('memoryValue')||0;

 
export function updatememorybutton(){
    
    let hasMemory=memory===0?false:true;
    document.querySelector('#col-mc-style').disabled=!hasMemory;
    document.querySelector('#col-mr-style').disabled=!hasMemory;
}

// memory addition M+
export function memoryPlus() {
    let inputStr = getInputString();
    memory+=eval(inputStr);
    localStorage.setItem('memoryValue',memory);
    updatememorybutton();
}

// memory subtraction 
export function memorySubtraction() {
    let inputStr = getInputString();
    memory -= eval(inputStr);
    localStorage.setItem('memoryValue', memory);
    updatememorybutton();
}

// memory Read

export function memoryRead() {
   
    let displayStr = getDisplayStr();
    displayStr = memory;    
     setDisplayStr(displayStr);
    updateDisplay()
    
}

//memory clear
export function memoryClear() {
    memory=0;
    localStorage.removeItem('memoryValue');
    updatememorybutton();
}
 
// save display value to memory
export function memorySave() {
    let inputStr = getInputString();
    memory=eval(inputStr);
    localStorage.setItem('memoryValue',memory);
    updatememorybutton();
}
