console.log("Muistipeli käynnistyy...");

const menu = document.getElementById("menu");
const gameContainer = document.getElementById("game-container");

document.getElementById("start-btn").addEventListener("click", () => {
  menu.style.display = "none";
  gameContainer.style.display = "block";
});

const images = [
  "apple.jpg", "avocado.jpg", "banana.jpg", "carrot.jpg",
  "eggplant.jpg", "grape.jpg", "orange.jpg", "pear.jpg"
];

let cards = [...images, ...images];
cards = shuffle(cards);

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

const gameBoard = document.getElementById("game-board");
const winMessage = document.getElementById("win-message");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let flippedCards = [];
let matchedPairs = 0;
let locked = false;
let score = 0;
let time = 0;
let timerInterval = null;

timerInterval = setInterval(() => {
  time++;
  timerDisplay.textContent = "Aika: " + time + " s";
}, 1000);

cards.forEach(image => {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");

  const back = document.createElement("div");
  back.classList.add("card-back");
  back.style.backgroundImage = `url(${image})`;

  cardInner.appendChild(front);
  cardInner.appendChild(back);
  card.appendChild(cardInner);
  gameBoard.appendChild(card);

  card.dataset.image = image;

  card.addEventListener("click", () => {
    if (
      card.classList.contains("flipped") ||
      flippedCards.length === 2 ||
      locked ||
      flippedCards.includes(card)
    ) {
      return;
    }

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstImage = first.dataset.image;
      const secondImage = second.dataset.image;

      if (firstImage !== secondImage) {
        locked = true;
        setTimeout(() => {
          first.classList.remove("flipped");
          second.classList.remove("flipped");
          flippedCards = [];
          locked = false;
        }, 1000);
      } else {
        flippedCards = [];
        matchedPairs++;
        score += 10;
        scoreDisplay.textContent = "Pisteet: " + score;

        if (matchedPairs === images.length) {
          winMessage.textContent = "🎉 Voitit pelin!";
          clearInterval(timerInterval);
        }
      }
    }
  });
});

document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});
