console.log("Muistipeli käynnistyy...");

const images = [
  "apple.jpg",
  "avocado.jpg",
  "banana.jpg",
  "carrot.jpg",
  "eggplant.jpg",
  "grape.jpg",
  "orange.jpg",
  "pear.jpg"
];

let cards = [...images, ...images];
cards = shuffle(cards);

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

const gameBoard = document.getElementById("game-board");

let flippedCards = [];

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
      flippedCards.length === 2
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
        setTimeout(() => {
          first.classList.remove("flipped");
          second.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      } else {
        flippedCards = [];
      }
    }
  });
});
