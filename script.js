let buttons = document.querySelectorAll("button")
let input = document.querySelector(".input")
let output = document.querySelector(".output")
let inputText = "";
let outputText = "";
let calculation = [];
let reset = false;
// let operations = ["+", "−", "×", "÷", "^", "√"];

const clear = () => {
    output.textContent = "";
    input.textContent = "";
    inputText = "";
    outputText = "";
    calculation = [];
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (reset && button.getAttribute("id") != "equal") {
            clear();
            reset = false;
        }
        if (button.getAttribute("id") == "clear") {
            clear();
            reset = false;
        } else if (button.getAttribute("id") == "equal") {
            // do calculation
            calculation = [];
            reset = true;
        } else if (button.getAttribute("id") == "delete") {
            outputText = outputText.slice(0, -1);
            output.textContent = outputText;
        } else if (button.className == "number") {
            outputText += button.textContent;
            output.textContent = outputText;
        } else if (button.className == "symbol") {
            if (outputText.length == 0) {
                calculation[-1] = button.textContent;
                inputText = `${inputText.slice(0, -2)}${button.textContent} `
                input.textContent = inputText;
            } else {
                calculation.push(outputText);
                calculation.push(button.textContent);
                console.log(calculation);
                inputText += `${outputText} ${button.textContent} `;
                outputText = "";
                input.textContent = inputText;
            }
        }

    });
});