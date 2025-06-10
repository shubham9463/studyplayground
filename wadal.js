function initGuessNumberGame() {
    // Word and Hints Object
    const options = {
      aroma: "Pleasing smell",
      pepper: "Salt's partner",
      halt: "put a stop to",
      jump: "Rise suddenly ",
      shuffle: "Mix cards up ",
      combine: "Add; Mix",
      chaos: "Total disorder",
      labyrinth: "Maze",
      disturb: "Interrupt; upset ",
      shift: "Move; Period of word",
      machine: "Device or appliance",
    };
  
    //Initial References
    const message = document.getElementById("message");
    const hintRef = document.querySelector(".hint-ref");
    const controls = document.querySelector(".controls-container");
    const startBtn = document.getElementById("start");
    const letterContainer = document.getElementById("letter-container");
    const userInpSection = document.getElementById("user-input-section");
    const resultText = document.getElementById("result");
    const word = document.getElementById("word");
  
    if (
      !message ||
      !hintRef ||
      !controls ||
      !startBtn ||
      !letterContainer ||
      !userInpSection ||
      !resultText ||
      !word
    ) {
      console.error("Some elements are missing in the DOM.");
      return;
    }
  
    const words = Object.keys(options);
    let randomWord = "",
      randomHint = "";
    let winCount = 0,
      lossCount = 0;
  
    //Generate random value
    const generateRandomValue = (array) =>
      Math.floor(Math.random() * array.length);
  
    //Block all the buttons
    const blocker = () => {
      let lettersButtons = document.querySelectorAll(".letters");
      lettersButtons.forEach((button) => (button.disabled = true));
      stopGame();
    };
  
    //Stop Game
    const stopGame = () => {
      controls.classList.remove("hide");
    };
  
    //Generate Word Function
    const generateWord = () => {
      letterContainer.classList.remove("hide");
      userInpSection.innerText = "";
      randomWord = words[generateRandomValue(words)];
      randomHint = options[randomWord];
      hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;
      let displayItem = "";
      randomWord.split("").forEach(() => {
        displayItem += '<span class="inputSpace">_ </span>';
      });
  
      userInpSection.innerHTML = displayItem;
      userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
    };
  
    //Initial Function
    const init = () => {
      winCount = 0;
      lossCount = 5;
      randomWord = "";
      word.innerText = "";
      randomHint = "";
      message.innerText = "";
      userInpSection.innerHTML = "";
      letterContainer.classList.add("hide");
      letterContainer.innerHTML = "";
      generateWord();
  
      //Create letter buttons A-Z
      for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
  
        button.addEventListener("click", () => {
          message.innerText = `Correct Letter`;
          message.style.color = "#008000";
  
          let charArray = randomWord.toUpperCase().split("");
          let inputSpace = document.getElementsByClassName("inputSpace");
  
          if (charArray.includes(button.innerText)) {
            charArray.forEach((char, index) => {
              if (char === button.innerText) {
                button.classList.add("correct");
                inputSpace[index].innerText = char;
                winCount += 1;
  
                if (winCount === charArray.length) {
                  resultText.innerHTML = "You Won";
                  startBtn.innerText = "Restart";
                  blocker();
                }
              }
            });
          } else {
            button.classList.add("incorrect");
            lossCount -= 1;
            document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
            message.innerText = `Incorrect Letter`;
            message.style.color = "#ff0000";
  
            if (lossCount === 0) {
              word.innerHTML = `The word was: <span>${randomWord}</span>`;
              resultText.innerHTML = "Game Over";
              blocker();
            }
          }
  
          button.disabled = true;
        });
  
        letterContainer.appendChild(button);
      }
    };
  
    // Start button listener
    startBtn.addEventListener("click", () => {
      controls.classList.add("hide");
      init();
    });
  
    // Optional: auto-start on load
    // init();
  }
  