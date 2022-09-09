// =-=-=-=-=-=-=-=-=-= Game =-=-=-=-=-=-=-=-=-=

let level = 0;
let click = 0;
const userSequence = [];
const gameSequence = [];

$('.start-button').on('click', startGame);

$('.tile').on('click', playTile)
  .on('click', checkCorrect);

// =-=-=-=-=-=-=-=-=-= Abstractions =-=-=-=-=-=-=-=-=-=

function startGame() {
  if (level === 0) {
    nextLevel();
  }
}

function checkCorrect(event) {
  const clickedTile = event.target.classList[1];
  userSequence.push(clickedTile);

  if (userSequence[click] !== gameSequence[click]) {
    gameOver();
    return;
  }

  if (userSequence.length === gameSequence.length) {
    nextLevel(event);
    userSequence.length = 0;
    click = 0;
    return;
  }

  click++;
}

function nextLevel(event) {
  level++;
  $('.title').text(`Level ${level}`);
  const newTile = randomTile();
  gameSequence.push(newTile);


  setTimeout(() => {
    const element = $(`.tile.${newTile}`)[0];
    playTile(event, newTile, element);
  }, 1000);
}

function gameOver() {
  $('.title').text('Game Over! Click on the center button restart!');
  level = 0;
  click = 0;
  userSequence.length = 0;
  gameSequence.length = 0;
  playAudio('wrong');
}

function playTile(event, tile, element = this) {
  const currentTile = tile ? tile : event.target.classList[1];

  addPlayingClass(element);
  $(element).on('transitionend', removePlayingClass);

  playAudio(currentTile);
}

function playAudio(audio) {
  const currentAudio = $(`audio[data-sound="${audio}"]`)[0];
  currentAudio.currentTime = 0;
  currentAudio.volume = 0.2;
  currentAudio.play();
}

function addPlayingClass(element) {
  $(element).addClass('tile-playing');
}

function removePlayingClass() {
  $(this).removeClass('tile-playing');
}

function randomTile() {
  const baseSequence = ['yellow', 'blue', 'red', 'green'];
  return baseSequence[randomNumberFromZeroToThree()];
}

function randomNumberFromZeroToThree() {
  return Math.floor(Math.random() * 4);
}
