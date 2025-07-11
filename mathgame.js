function initMathGame() {
  const operators = ["+", "-", "*"];
  const startBtn = document.getElementById("start-btn");
  const question = document.getElementById("question");
  const controls = document.querySelector(".controls-container");
  const result = document.getElementById("result");
  const submitBtn = document.getElementById("submit-btn");
  const errorMessage = document.getElementById("error-msg");

  let answerValue;
  let operatorQuestion = false;

  const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const questionGenerator = () => {
    let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    if (randomOperator === "-" && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    const solution = eval(`${num1}${randomOperator}${num2}`);
    const randomVar = randomValue(1, 5);

    operatorQuestion = false;

    if (randomVar === 1) {
      answerValue = num1;
      question.innerHTML = `<input type="number" id="inputValue" placeholder="?" /> ${randomOperator} ${num2} = ${solution}`;
    } else if (randomVar === 2) {
      answerValue = num2;
      question.innerHTML = `${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?" /> = ${solution}`;
    } else if (randomVar === 3) {
      answerValue = randomOperator;
      operatorQuestion = true;
      question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?" /> ${num2} = ${solution}`;
    } else {
      answerValue = solution;
      question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?" />`;
    }

    document.getElementById("inputValue").focus();

    submitBtn.onclick = () => {
      errorMessage.classList.add("hide");
      const userInput = document.getElementById("inputValue").value.trim();

      if (userInput) {
        if (userInput == answerValue) {
          stopGame(`Yippie!! <span>Correct</span> Answer`);
        } else if (operatorQuestion && !operators.includes(userInput)) {
          errorMessage.classList.remove("hide");
          errorMessage.innerHTML = "Please enter a valid operator";
        } else {
          stopGame(`Oops!! <span>Wrong</span> Answer`);
        }
      } else {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Input cannot be empty";
      }
    };
  };

  const stopGame = (resultText) => {
    result.innerHTML = resultText;
    startBtn.innerText = "Restart";
    controls.classList.remove("hide");
    startBtn.classList.remove("hide");
  };

  startBtn.onclick = () => {
    answerValue = "";
    operatorQuestion = false;
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");
    controls.classList.add("hide");
    startBtn.classList.add("hide");
    result.innerHTML = "";
    questionGenerator();
  };
}
