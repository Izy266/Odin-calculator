let buttons = document.querySelectorAll("button")
let input = document.querySelector(".input")
let output = document.querySelector(".output")
let inputText = "";
let outputText = "";
let calculation = [];
let reset = false;
let operations = ["+", "−", "×", "÷", "^"];

const clear = () => {
    output.textContent = "";
    input.textContent = "";
    inputText = "";
    outputText = "";
    calculation = [];
}

const operate = (operations) => {
    answer = +operations[0]
    for (let i = 1; i < operations.length - 1; i++) {
        switch (operations[i]) {
            case "+":
                answer += +operations[i + 1];
                break;
            case "−":
                answer -= +operations[i + 1];
                break;
            case "×":
                answer *= +operations[i + 1];
                break;
            case "÷":
                answer /= +operations[i + 1];
                break;
            case "^":
                answer **= +operations[i + 1];
                break;
        }
        i += 1;
    }
    return answer;
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let buttonID = button.getAttribute("id");
        let buttonClass = button.getAttribute("class");

        if (buttonID == "clear") {
            reset = false;
            clear();
        } else if (buttonID == "posNeg") {
            if (outputText.length > 0) {
                outputText = (-1 * outputText).toString();
                output.textContent = outputText;
            }
        } else if (buttonID == "delete") {
            if (outputText.length > 0) {
                outputText = outputText.slice(0, -1);
                output.textContent = outputText;
            }
        }
        else if (buttonID == "equal") {
            if (outputText.length > 0) {
                calculation.push(outputText);
            }
            if (calculation.length > 0 && !operations.includes(calculation[calculation.length - 1])){
                input.textContent = `${inputText} ${outputText} =`;
                outputText = operate(calculation).toString();
                output.textContent = outputText;
                calculation = [];
                reset = true;
            }
        } else if (buttonClass == "number") {
            if (reset) {
                clear();
                reset = false;
            }
            if (button.textContent != "." || outputText.indexOf(".") < 0) {
                outputText += button.textContent;
                output.textContent = outputText;
            } 
        } else if (buttonClass == "symbol") {
            if (outputText.length > 0) {
                calculation.push(outputText);
                calculation.push(button.textContent);
                outputText = "";
                reset = false;

                if (calculation.length > 3) {
                    let prevOperation = calculation.pop();
                    calculation = [operate(calculation).toString(), prevOperation];
                }
            } else if (calculation.length > 0 && operations.includes(calculation[calculation.length - 1])) {
                calculation[calculation.length - 1] = button.textContent;
            }
            
            inputText = calculation.join(" ");
            input.textContent = inputText;
        }
    });
});