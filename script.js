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
});

