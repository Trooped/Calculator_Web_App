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

function operate(first, second, operator){
    switch(operator){
        case "add":
            result = add(first, second);
        case "subtract":
            result = subtract(first, second);
        case "multiply":
            result = multiply(first, second);
        case "divide":
            result = divide(first,second);

    }
}