const letters = [..."AABBCCDDEEFFGGHH"]; // 8 pairs
let shuffled = letters.sort(() => 0.5 - Math.random());
const board = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

shuffled.forEach(letter => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.letter = letter;
  card.textContent = "";
  board.appendChild(card);
});

board.addEventListener("click", e => {
  const clicked = e.target;

  if (!clicked.classList.contains("card") || clicked.classList.contains("flipped") || lockBoard) {
    return;
  }

  clicked.classList.add("flipped");
  clicked.textContent = clicked.dataset.letter;

  if (!firstCard) {
    firstCard = clicked;
  } else {
    secondCard = clicked;
    lockBoard = true;

    if (firstCard.dataset.letter === secondCard.dataset.letter) {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard = null;
        secondCard = null;
        lockBoard = false;
      }, 1000);
    }
  }

  checkWin();
});

function checkWin() {
  const allFlipped = document.querySelectorAll(".card.flipped").length;
  if (allFlipped === 16) {
    setTimeout(() => {
      alert("You won the game!");
    }, 200);
  }
}
