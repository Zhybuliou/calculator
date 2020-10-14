"use strict";
// first step create Class Calc
class Calculator{
    constructor(input, output){
        this.inputDisplay = input;
        this.outputDisplay = output;
        this.inputHistory = [];
    }

    // this is clean function
    cleanAllHistory(){
        this.inputHistory = [];
        this.updateInputDisplay();
        this.updateOutputDisplay("0");
    }

    // this is backspace function
    backspace(){
        switch (this.getLastInputType()){
            case "number":
                if(this.getLastInputValue().length > 1) {
                    this.editLastInput(this.getLastInputValue().slice(0, -1),"number");
                }else {
                    this.deleteLastInput();
                }
                break;
            case "operator":
                this.deleteLastInput();
                break;
            default:
                return;
        }
    }

    // this is percent function
    changePercentToDecimal(){
        if(this.getLastInputType() === "number"){
            this.updateOutputDisplay(this.getLastInputValue()/ 100, "number");
        }
    };

    //insert number
    insertNumber(value){
        if(this.getLastInputType() === "number") {
            this.appendToLastInput(value);
        }else if(this.getLastInputType() === "operator" || this.getLastInputType() === null){
            this.addNewInput(value,"number");
        }else if(this.getLastInputType() === "equals"){
            this.addNewInput(value,"number");
            // this.inputHistory = [];
            // this.updateOutputDisplay(value);
        }
    }

    //insert operation
    insertOperation(value){
        switch (this.getLastInputType()){
            case "number":
                this.addNewInput(value,"operator");
            break;
            case "operator":
                this.editLastInput(value, "operator");
            break;
           case "equals":
               let output = this.getOutputValue();
               this.addNewInput(output,"number");
               this.addNewInput(value,"operator");
               this.updateInputDisplay();
            break;
           default:
               return;
        }
    }
    
    // negative number
    negateNumber(){
        if (this.getLastInputType() === "number"){
            this.editLastInput(parseFloat(this.getLastInputValue())*-1, "number");
        }
    }

    // insert decimal dot(point)
    insertDecimalPoint(){
        if(this.getLastInputType() === "number" && !this.getLastInputValue().includes(".")){
            this.appendToLastInput(".");
        }else if(this.getLastInputType() === "operator" || this.getLastInputType() === null){
            this.addNewInput("0.","number");
        }
    }

    // add sqrt function
     sqrtNumber(){
         if(this.getLastInputType() === "number"){
   
             this.updateOutputDisplay(Math.sqrt(this.getLastInputValue()),"number");
             this.addNewInput(Math.sqrt(this.getLastInputValue()),"number");
             this.inputHistory.shift();
         }
     }

    // generate result
    generateResult(){
        if(this.getLastInputType() === "number"){
            const self = this;
            const simplifyExpression = function (currentExpression, operator){
                if(currentExpression.indexOf(operator) === -1){
                    return currentExpression;
                }else{
                    let operatorIdx = currentExpression.indexOf(operator);
                    let leftOperandIdx = operatorIdx - 1;
                    let rightOperandIdx = operatorIdx + 1;

                    let partialSolution = self.performOperation(...currentExpression.slice(leftOperandIdx, rightOperandIdx + 1));

                    currentExpression.splice(leftOperandIdx, 3, partialSolution.toString());

                    return simplifyExpression(currentExpression, operator);
                }
            }
            let result = ["*","/","-","+","**"].reduce(simplifyExpression, this.getAllInputValues());
            this.addNewInput("=","equals");
            this.updateOutputDisplay(parseFloat(result[result.length-1]));
            console.log(result);
        }
    }


    // Help Functions:
    getLastInputType(){
        return (this.inputHistory.length === 0) ? null : this.inputHistory[this.inputHistory.length - 1].type;
    }
    getLastInputValue(){
        return (this.inputHistory.length === 0) ? null : this.inputHistory[this.inputHistory.length - 1].value;
    }
    getAllInputValues(){
        return this.inputHistory.map(entry => entry.value);
    }
    getOutputValue() {
        return this.outputDisplay.value.replace(/,/g,'.');
    }
    addNewInput(value,type){
        this.inputHistory.push({"type": type,"value": value.toString()});
        this.updateInputDisplay();
    }
    appendToLastInput(value){
        this.inputHistory[this.inputHistory.length-1].value += value.toString();
        this.updateInputDisplay();
    }
    editLastInput(value,type){
        this.inputHistory.pop();
        this.addNewInput(value,type);
    }
    deleteLastInput(){
        this.inputHistory.pop();
        this.updateInputDisplay();
    }
    updateInputDisplay() {
        this.inputDisplay.value = this.getAllInputValues().join(" ");
    }
    updateOutputDisplay(value){
        this.outputDisplay.value = Number(value).toLocaleString();
    }

    performOperation(leftOperand,operation, rightOperand){
        leftOperand = parseFloat(leftOperand);
        rightOperand = parseFloat(rightOperand);

        if (Number.isNaN(leftOperand) || Number.isNaN(rightOperand)){
            return;
        }
        switch (operation){
            case "*":
                return leftOperand * rightOperand;
            case "/":
               return leftOperand / rightOperand;
            case "-":
                return leftOperand - rightOperand;
            case "+":
                return leftOperand + rightOperand;
            case "**":
                return leftOperand ** rightOperand;
            default:
                return;
        }
    }
}
// END CLASS CALC

// Create Sending to access DOM elements
const inputDisplay = document.querySelector("#history");
const outputDisplay = document.querySelector("#result");
const allClearButton = document.querySelector("[data-all-clear]");
const backspaceButton = document.querySelector("[data-backspace]");
const percentButton = document.querySelector("[data-percent]");
const operationButtons = document.querySelectorAll("[data-operator]");
const numberButtons = document.querySelectorAll("[data-number]");

const negationButton = document.querySelector("[data-negation]");
const decimalButton = document.querySelector("[data-decimal]");
const sqrtButton = document.querySelector("[data-sqrt]");
const equalsButton = document.querySelector("[data-equals]");

//Create New Calculator:
const calculator = new Calculator(inputDisplay, outputDisplay);

// Add event handlers  to the calculator buttons
allClearButton.addEventListener("click",() => {
    calculator.cleanAllHistory();
});

sqrtButton.addEventListener("click",() => {
    calculator.sqrtNumber();
});

backspaceButton.addEventListener("click", () => {
    calculator.backspace();
});

percentButton.addEventListener("click", () => {
    calculator.changePercentToDecimal();
});

operationButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        let {target} = event;
        calculator.insertOperation(target.dataset.operator);
    });
});

numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        let {target} = event;
        calculator.insertNumber(target.dataset.number);
    });
});

negationButton.addEventListener("click",() => {
    calculator.negateNumber();
});

decimalButton.addEventListener("click", () => {
    calculator.insertDecimalPoint();
});

equalsButton.addEventListener("click", () => {
    calculator.generateResult();
});
