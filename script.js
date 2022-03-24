const cards = document.querySelectorAll('.memory-card');
const modal = document.getElementById("myModal");
const closeModalButton = document.getElementsByClassName("close")[0];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const MAX_POINTS = 6;
let points = 0;


function showModal() {
  modal.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
}

closeModalButton.onclick = function() {
  resetGame() ;
}

function isGameOver() {
  return points >= MAX_POINTS;
}

function getPoint() {
  points++;

  if(isGameOver()) {
    showModal();
  }
}

function resetGame() {
  points = 0;
  hideModal();
  location.reload();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  getPoint();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
