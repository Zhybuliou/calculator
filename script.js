// first step create Class Calc
class Calc{
    constructor(){}

    // this is clean function
    cleanAllHistory(){}

    // this is backspace function
    backspace(){}

    // this is percent function
    changePercentToDecimal(){};

    //insert number
    insertNumber(value){}

    //insert operation
    insertOperation(value){}
    
    // negative number
    negateNumber(){

    }

    // insert decimal dot(point)
    insertDecimalPoint(){

    }

    // generate result
    generateResult(){}


    // Help Functions:




}
// END CLASS CALC
// Create Sending to access DOM elements
const inputDisplay = document.querySelector("#history");
const outputDisplay = document.querySelector("#result");
const allClearButton = document.querySelector("[data-all-clear]");
const backspaceButton = document.querySelector("[data-backspace]");
const percentButton = document.querySelector("[data-percent]");
const operationButton = document.querySelectorAll("[data-operation]");
const numberButton = document.querySelectorAll("[data-number]");

const negationButton = document.querySelector("[data-negation]");
const decimalButton = document.querySelector("[data-decimal]");
const equalsButton = document.querySelector("[data-equals]");

//Create New Calculator:
const calculator = new Calc(inputDisplay, outputDisplay);