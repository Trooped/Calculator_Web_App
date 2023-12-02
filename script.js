/**
 * Open:
 * -add a test to check logic before starting, else write ERROR
 * -style the page :)
 * -make sure decimals are correct + add a decimal point button + not too many deciamls after the dot
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

var firstNum=0;
var secondNum=0;
var operator = "";

var result=0;

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

var tempString = ""; //The string containing the button values, and also the result at the end
//this function updates the screen with the button values on click (also the tempString)
function updateScreen(buttonText) {
    if (tempString.length < 13){
        tempString += buttonText; // Append to temp string
        document.getElementById("screen").innerText += buttonText; // Append to screen div
        console.log(tempString);
    }
}

var signFlag = false; //if it's false, you can't use sign operators. positive- you can
var dotFlag = false; //same as before
document.querySelectorAll('.click-button').forEach(button => {
    button.addEventListener('click', function() {
        if(this.classList.contains('sign')){
            if (signFlag == true){
                signFlag = false;
                updateScreen(this.innerText);
            }
        }
        else if(this.classList.contains('dot')){
            if (dotFlag == true){
                dotFlag = false;
                updateScreen(this.innerText);
            }
        }
        else if (!this.classList.contains('sign')){
            signFlag = true;
            dotFlag = true;
            updateScreen(this.innerText); // Use the text of the clicked button
        }
    });
});

const deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', function(){
    if (tempString.length>0){
        tempString = tempString.slice(0,-1);
        document.getElementById("screen").innerText = tempString;
    }
})

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function() {
    tempString = "";
    document.getElementById("screen").innerText = "";
})



const equals = document.getElementById('equals');
equals.addEventListener('click', function() {
    var result = 0;
    //add a method that checks if we have the correct nubmer of stuff + correct logic + divisible by 3 etc, e.g 1x2+3/4
if (tempString.length > 0){
    if (!validTest(tempString)){
        tempString = "";
        document.getElementById("screen").innerText = "ERROR";
    }
    else{
    while (tempString.indexOf('x') !== -1 || tempString.indexOf('/') !== -1) {
        let indexX = tempString.indexOf('x');
        let indexSlash = tempString.indexOf('/');
        let operationIndex = -1;
        let operationString = "";
    
        // Determine which operation comes first (if any)
        if (indexX !== -1 && (indexX < indexSlash || indexSlash === -1)) {
            operationIndex = indexX;
        } else if (indexSlash !== -1) {
            operationIndex = indexSlash;
        }
    
        // If an operation is found, extract and remove the substring
        if (operationIndex !== -1) {
            // Adjust the indices to include the surrounding characters

            if (operationIndex > 0) {
                var startIndex = operationIndex - 1;
                while (startIndex >= 0 && checkCorrect(tempString.charAt(startIndex))) {
                    startIndex--;
                }
                startIndex++; // Adjust to point to the start of the number
            }
            
            if (operationIndex < tempString.length - 1) {
                var endIndex = operationIndex + 1;
                while (endIndex < tempString.length && checkCorrect(tempString.charAt(endIndex))) {
                    endIndex++;
                }
                // endIndex points to the index after the last digit of the second number
            }
            
            // Extract the operation string
            operationString = tempString.slice(startIndex, endIndex);
            
            let firstNum = operationString.slice(0, operationIndex - startIndex);
            let operator = tempString.charAt(operationIndex);
            let secondNum = operationString.slice(operationIndex - startIndex + 1);
            

            let tempResult = operate(firstNum, operator, secondNum);
            tempResult= parseFloat(tempResult);

            // Replace the operation string in tempString with the result
            tempString = tempString.slice(0, startIndex) + tempResult.toString() + tempString.slice(endIndex);


            result = tempResult.toString(); //may need to change it!!!!!!
            tempString=result;
        }
    }
//Calculating the + and - logic!
        while (tempString.indexOf('+') !== -1 || tempString.indexOf('-') !== -1) {
            let indexPlus = tempString.indexOf('+');
            let indexMinus = tempString.indexOf('-');
            let operationIndex = -1;
        
            if (indexPlus !== -1 && (indexPlus < indexMinus || indexMinus === -1)) {
                operationIndex = indexPlus;
            } else if (indexMinus !== -1) {
                operationIndex = indexMinus;
            }
        
            if (operationIndex !== -1) {
                let startIndex = operationIndex;
                while (startIndex > 0 && checkCorrect(tempString.charAt(startIndex - 1))) {
                    startIndex--;
                }
        
                let endIndex = operationIndex;
                while (endIndex < tempString.length - 1 && checkCorrect(tempString.charAt(endIndex + 1))) {
                    endIndex++;
                }

                let firstNum = parseFloat(tempString.slice(startIndex, operationIndex));
                let operator = tempString.charAt(operationIndex);
                let secondNum = parseFloat(tempString.slice(operationIndex + 1, endIndex + 1));
        
                let tempResult = operate(firstNum, operator, secondNum).toString();

                tempString = tempString.slice(0, startIndex) + tempResult.toString() + tempString.slice(endIndex + 1);

                result = tempResult.toString(); // Assuming the operation can result in non-integer values
            } else {
                break;
            }
        }

            document.getElementById("screen").innerText = result;
            tempString=result;
    operationString= "";
    }
    }
})

function checkCorrect(cur){
    return !(cur == '+' || cur=='-'||cur=='x'||cur=='/');
}

function validTest(tempString){
    return (typeof tempString.charAt(0) === "number" && typeof tempString.charAt(tempString.length-1)=== "number")
}
