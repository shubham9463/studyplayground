document.getElementById("generateStory").addEventListener("click", function () {
  let name = document.getElementById("name").value.trim();
  let place = document.getElementById("place").value.trim();
  let object = document.getElementById("object").value.trim();
  let action = document.getElementById("action").value.trim();
  let storyDiv = document.getElementById("story");

  if (name === "" || place === "" || object === "" || action === "") {
    alert("Please fill in all fields!");
    return;
  }

  let stories = [
    `One day, ${name} went to ${place} and found a mysterious ${object}. Without thinking, ${name} decided to ${action}, and something magical happened!`,
    `In the heart of ${place}, ${name} discovered a hidden ${object}. As curiosity took over, ${name} started to ${action}, and the adventure began!`,
    `${name} was walking through ${place} when suddenly a ${object} appeared. Without hesitation, ${name} chose to ${action}, leading to an unforgettable experience!`,
    `While exploring ${place}, ${name} saw a sparkling ${object}. As soon as they touched it, they were transported to a new world where they had to ${action} to find a way back home!`,
    `One night at ${place}, ${name} found an ancient ${object}. The moment they tried to ${action}, the object began to glow, revealing a hidden secret!`,
    `At ${place}, ${name} was given a strange ${object} by an old wise person. They were told that if they ${action} at the right moment, something incredible would happen!`,
    `${name} was cleaning their attic when they stumbled upon an old ${object}. Curious, they decided to ${action}, and suddenly, they were taken on a journey through time!`,
  ];

  let randomStory = stories[Math.floor(Math.random() * stories.length)];

  storyDiv.innerText = randomStory;
  storyDiv.style.display = "block";
});