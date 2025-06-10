let words = [
    { word: "javascript", hint: "Programming Language" },
    { word: "hangman", hint: "Guess the word game" },
    { word: "function", hint: "Reusable block of code" },
    { word: "developer", hint: "Someone who writes code" },
    { word: "browser", hint: "Used to surf the web" }
  ];
  
  let selectedWord, guessedLetters, remainingLives;
  
  function initializer() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingLives = 6;
  
    // Reset the UI
    document.getElementById("clue").textContent = selectedWord.hint;
    document.getElementById("lives").textContent = remainingLives;
    document.getElementById("result").textContent = "";
    document.getElementById("word").innerHTML = selectedWord.word
      .split("")
      .map(() => "_")
      .join(" ");
  
    // Reset the hangman image
    resetHangmanImage();
  
    // Create letter buttons
    createLetterButtons();
  }
  
  function createLetterButtons() {
    const container = document.getElementById("letters");
    container.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      let letter = String.fromCharCode(i);
      let button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => handleGuess(letter, button));
      container.appendChild(button);
    }
  }
  
  function handleGuess(letter, button) {
    button.disabled = true;
    guessedLetters.push(letter.toLowerCase());
  
    if (!selectedWord.word.includes(letter.toLowerCase())) {
      remainingLives--;
      document.getElementById("lives").textContent = remainingLives;
      updateHangmanImage();
    }
  
    updateWord();
    checkGameOver();
  }
  
  function updateWord() {
    let display = selectedWord.word
      .split("")
      .map((char) => (guessedLetters.includes(char) ? char : "_"))
      .join(" ");
    document.getElementById("word").textContent = display;
  }
  
  function checkGameOver() {
    const wordRevealed = selectedWord.word
      .split("")
      .every((char) => guessedLetters.includes(char));
  
    if (wordRevealed) {
      document.getElementById("result").textContent = "🎉 You Win!";
      disableAllButtons();
    } else if (remainingLives <= 0) {
      document.getElementById("result").textContent =
        "❌ Game Over! Word was: " + selectedWord.word;
      disableAllButtons();
    }
  }
  
  function disableAllButtons() {
    const buttons = document.querySelectorAll(".letters button");
    buttons.forEach((btn) => (btn.disabled = true));
  }
  
  // Hangman image logic
  function updateHangmanImage() {
    const parts = document.querySelectorAll(".part");
    if (remainingLives >= 0 && remainingLives <= 5) {
      parts[6 - remainingLives].style.display = "block";
    }
  }
  
  function resetHangmanImage() {
    const parts = document.querySelectorAll(".part");
    parts.forEach((part) => (part.style.display = "none"));
  }
  
  // Restart the game on a click of a button
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "newGame") {
      initializer();
    }
  });
  
  // Auto-run when dynamically loaded
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initializer();
  } else {
    window.addEventListener("DOMContentLoaded", initializer);
  }
  