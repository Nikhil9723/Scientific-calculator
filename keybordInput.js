// Input from keyboard
import { 
    getInputString, 
    setInputString, 
    addDisplayStr, 
    addInputStr, 
    updateDisplay,
    calculateExpression,
    removeLastChar } from "./index.js";

document.addEventListener("keydown", keyPressHandler);

document.addEventListener("keydown", backSpaceHandler);

function backSpaceHandler(e) {
  if(e.key === "Backspace") {
    removeLastChar();
  }

}


function keyPressHandler(e) {
  let inputStr = getInputString();
  let allowedKey = new Set([
    "Enter",
    "Backspace",
    "(",
    ")",
    "*",
    "x",
    "-",
    "+",
    "/",
    ".",
    "=",
  ]);

  let key = e.key;

  if((key >="0" && key <= "9") || allowedKey.has(key)) {
    
    if(key === "Enter" || key === "=") {
      let res = calculateExpression(inputStr);
      setInputString(res);
    } else {
        addInputStr(key)
        addDisplayStr(key)
        updateDisplay()
    }
  }
}
