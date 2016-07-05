const characterMoveSpeed = 3;
const fireSpeed = 7;
const startingPoint = {
  x: 0,
  y: 0
};
const canvasData = {
  width: 640,
  height: 360
};
const characterData = {
  width: 40,
  height: 40
};
const fireData = {
  width: 20,
  height: 20
};
const frame = {
  x1: startingPoint.x,
  x2: canvasData.width - characterData.width,
  y1: startingPoint.y,
  y2: canvasData.height - characterData.height
};
const scoreBoard = {
  p1: document.getElementById('player_score'),
  p2: document.getElementById('computer_score')
};
const pauseButton = document.getElementById('pause_button');
const leftButton = document.getElementById('left_button');
const rightButton = document.getElementById('right_button');
var game_canvas = document.getElementById('game_canvas');
var context = game_canvas.getContext('2d');
var randomWidth = 0;
var keyArray = [37, 38, 39, 40, 65, 87, 68, 83];
var keyState = {};
var coordinates = {
  p1: {
    image: imageCreate('media/character.png'),
    fire: imageCreate('media/character_fire.png'),
    x: startingPoint.x,
    y: frame.y2,
    f: {
      x1: startingPoint.x,
      y1: startingPoint.y,
      f1: 0,
      x2: startingPoint.x,
      y2: startingPoint.y,
      f2: 0
    }
  },
  p2: {
    image: imageCreate('media/computer.png'),
    fire: imageCreate('media/computer_fire.png'),
    x: canvasData.width - characterData.width,
    y: startingPoint.y,
    f: {
      x1: startingPoint.x,
      y1: startingPoint.y,
      f1: 0,
      x2: startingPoint.x,
      y2: startingPoint.y,
      f2: 0
    }
  }
};
var score = {
  p1: 0,
  p2: 0
};
var hardMode = true;
var computerFireResponse = 200;
var computerDodgeDirection = [100, -100, 150, -150, 200, -200];
var computerDodge = {
  index: 0,
  targetDirection: 0,
  direction: '',
  dodging: false
};
var isPause = false;

window.requestAnimFrame = function(callback) {
  window.setTimeout(callback, 1000 / 60);
};

function imageCreate(src) {
  var image = document.createElement('img');
  image.src = src;
  return image;
}
