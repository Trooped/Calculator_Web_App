/**
 * Open:
 * -style the page (more modern and make it suitable for phones etc.)
 * -add a square and square root buttons and functions
 * -fix the bug if i write 536x and then press result (why does it enter into never ending loop!)
 */


/**
 * The operation functions, called by "operate"
 * @param {*} first 
 * @param {*} second 
 * @returns 
 */
function add(first, second){
    return first+second;
}

function subtract(first, second){
    return first - second;
}

function multiply(first, second){
    return first * second;
}

function divide(first, second){
    return first / second;
}

/////////////////////////
var firstNum=0;
var secondNum=0;
var operator = "";

var result=0;

//the operate function, takes a number, operator, and a second number- turns them into "float" type, then calls the correct func and returns the result
function operate(first, operator, second){
    first = parseFloat(first);
    second = parseFloat(second)

    switch(operator){
        case '+':
            result = add(first, second);
            break;
        case '-':
            result = subtract(first, second);
            break;
        case 'x':
            result = multiply(first, second);
            break;
        case '/':
            result = divide(first,second);
            break;
    }
    console.log(result)
    return result;
}

//the keydown function for the keyboard operations
document.addEventListener('keydown', function(event) {
    // Check if the pressed key matches any button data-key attribute

    if (event.key === "Enter"){
        equals.click();
    }
    if (event.key === "Backspace"){
        deleteBtn.click();
    }

    const button = document.querySelector(`.click-button[data-key="${event.key}"]`);
    if (button) {
        button.click(); // Trigger the click event on the matched button
    }
});

//the function that updates the calc's screen (only the expression calculation section, not the result!)
var expressionString = ""; //The string containing the button values, and also the result at the end
//this function updates the screen with the button values on click (also the expressionString)
function updateScreen(buttonText) {
    if (expressionString.length < 15){
        expressionString += buttonText; // Append to temp string
        console.log(expressionString)
        document.getElementById("screen").innerText += buttonText; // Append to screen div
        console.log(expressionString);
    }
}

var operatorFlag = false; //if it's false, you can't use any operators (apart from neg). positive- you can
var minusFlag = false;//same for minus (middle of string)
var negativeFlag = false; //meaning the expression is positive, if it's true it's negative
//You need both of the following flags for the option to use a decimal point!
var dot_opFlag = true; //flag for using decimals after an operation
var dot_numFlag = false; //flag for using dec after a number
document.querySelectorAll('.click-button').forEach(button => {
    button.addEventListener('click', function() {
        if(this.innerText == '+' || this.innerText == 'x' || this.innerText == '/'){ //manages the + x / operations
            if (operatorFlag == true){
                operatorFlag = false;
                minusFlag = true;
                dot_opFlag = true;
                updateScreen(this.innerText);
            }
        }
        else if (this.innerText == '+/-'){ //manages the +/- change negative operation
            if (negativeFlag == false && expressionString.charAt(0)!='-'){ //no negative sign on first index!
                negativeFlag = true;
                expressionString = '-'+expressionString;
                document.getElementById("screen").innerText = expressionString;
            }
            else{ //negFlag == true, there's a negative sign on first index, remove it!
                negativeFlag = false;
                expressionString = expressionString.slice(1);
                document.getElementById("screen").innerText = expressionString;
            }
        }
        else if(this.innerText== '.'){ //manages the dot operation
            if (dot_opFlag == true && dot_numFlag==true){
                dot_numFlag = false;
                dot_opFlag = false;
                updateScreen(this.innerText);
            }
        }
        else if(minusFlag == true && this.innerText == '-' && expressionString.length > 0){ //adding a minus
            operatorFlag= true;
            minusFlag = false;
            if (checkPrevChar(expressionString.charAt(expressionString.length-1))){
                expressionString += '+';
            }
            console.log(expressionString)
            updateScreen(this.innerText);
        }
        //manages the numbers!
        else if (this.innerText != '-' && this.innerText != '+' && this.innerText != '/' && this.innerText != 'x' && this.innerText != '+/-'){ //one of the numbers/clear/equals
            operatorFlag = true;
            minusFlag = true;
            dot_numFlag = true;
            updateScreen(this.innerText); // Use the text of the clicked button
        }
    });
});
//This is a delete button operation, removes the last character in the String and on the screen.
const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', function(){
    if (expressionString.length>0){
        if (checkPrevChar(expressionString.charAt(length-1))){
            operatorFlag = true;
        }
        expressionString = expressionString.slice(0,-1);
        document.getElementById("screen").innerText = expressionString;
    }
})

//This is a clear button operation, clears the screen and resets the String to null
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function() {
    expressionString = "";
    document.getElementById("screen").innerText = "";
})


/**
 * This is the equals function, when clicked- it takes care of the entire equation, making sure to calculate * and / first, and + and - later.
 */
const equals = document.getElementById('equals');
equals.addEventListener('click', function() {
    var result = 0;
if (expressionString.length > 2){ //checks that the expression is more than 2 chars
    if (!validTest(expressionString)){ //checks that expression is valid, else- error
        expressionString = "";
        document.getElementById("screen").innerText = "ERROR";
    }
    else if (divByZero(expressionString)){ //checks if we divide by 0
        expressionString = "";
        document.getElementById("screen").innerText = "Don't divide by 0";
    }
    else if (expressionString.indexOf('x')==-1 && expressionString.indexOf('+') ==-1 && expressionString.indexOf('+')==-1 || expressionString.indexOf('-')!=-1){
        document.getElementById("screen").innerText = expressionString;
    }
    else{ //First, let's calculate the x and / operations, and add the result to later calculate using + and -
    while (expressionString.indexOf('x') !== -1 || expressionString.indexOf('/') !== -1) {
        let indexX = expressionString.indexOf('x');
        let indexSlash = expressionString.indexOf('/');
        let operationIndex = -1;
        let operationString = "";
    
        // Determine which operation comes first (if any)
        if (indexX !== -1 && (indexX < indexSlash || indexSlash === -1)) {
            operationIndex = indexX;
        } else if (indexSlash !== -1) {
            operationIndex = indexSlash;
        }
        console.log(indexX)
    
        // If an operation is found, extract and remove the substring
        if (operationIndex !== -1) {
            // Adjust the indices to include the surrounding characters

            if (operationIndex > 0) {
                var startIndex = operationIndex - 1;
                while (startIndex >= 0 && checkPrevChar(expressionString.charAt(startIndex))) {
                    startIndex--;
                }
                startIndex++; // Adjust to point to the start of the number
            }
            
            if (operationIndex < expressionString.length - 1) {
                var endIndex = operationIndex + 1;
                while (endIndex < expressionString.length && checkPrevChar(expressionString.charAt(endIndex))) {
                    endIndex++;
                }
                // endIndex points to the index after the last digit of the second number
            }
            
            // Extract the operation string
            operationString = expressionString.slice(startIndex, endIndex);
            
            let firstNum = operationString.slice(0, operationIndex - startIndex);
            let operator = expressionString.charAt(operationIndex);
            let secondNum = operationString.slice(operationIndex - startIndex + 1);
            

            let tempResult = operate(firstNum, operator, secondNum);
            tempResult= parseFloat(tempResult);
            var roundedResult = Math.round(tempResult * 10000) / 10000; //rounding to 4 decimals


            // Replace the operation string in expressionString with the result
            expressionString = expressionString.slice(0, startIndex) + roundedResult.toString() + expressionString.slice(endIndex);

            result = roundedResult.toString();
            console.log(expressionString)
        }
    }
//Calculating the + and - logic! (it's actually only +, because every is treated as x+-y )
        while (expressionString.indexOf('+') !== -1) {
            var indexPlus = expressionString.indexOf('+');
        
            if (indexPlus !== -1) {
                let startIndex = indexPlus;
                while (startIndex > 0 && checkPrevChar(expressionString.charAt(startIndex - 1))) {
                    startIndex--;
                }
        
                let endIndex = indexPlus;
                while (endIndex < expressionString.length - 1 && checkPrevChar(expressionString.charAt(endIndex + 1))) {
                    endIndex++;
                }

                let firstNum = parseFloat(expressionString.slice(startIndex, indexPlus));
                let operator = expressionString.charAt(indexPlus);
                let secondNum = parseFloat(expressionString.slice(indexPlus + 1, endIndex + 1));
        
                let tempResult = operate(firstNum, operator, secondNum);
                console.log(tempResult)
                var roundedResult = Math.round(tempResult * 10000) / 10000; //round to 4 decimals

                expressionString = expressionString.slice(0, startIndex) + roundedResult.toString() + expressionString.slice(endIndex + 1);
                console.log(expressionString)

                result = roundedResult.toString(); // Assuming the operation can result in non-integer values
            } else {
                break;
            }
        }
    //putting the end result on the screen, in the expressionString, and reset the operationString
        document.getElementById("screen").innerText = result;
        expressionString=result;
        operationString= "";
    }
}
})

//a function to check the previous character isn't one of the operations (apart from minus)
function checkPrevChar(cur){
    return !(cur == '+' || cur=='x'||cur=='/');
}

//a function to check if the expression is valid, meaning that the first character is a number or '-', and the last character is a number
function validTest(expressionString){
    return (typeof parseInt(expressionString.charAt(0)) == "number" || expressionString.charAt(0) == '-' && typeof parseInt(expressionString.charAt(expressionString.length-1))== "number")
}

//a function that checks if we divide our expression by zero
function divByZero(expressionString){
    for (var i = 0; i< expressionString.length; i++){
        if (parseInt(expressionString.charAt(i)) == 0 && expressionString.charAt(i-1) == '/'){
            return true;
        }
    }
}
