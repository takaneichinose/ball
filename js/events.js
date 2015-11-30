game_canvas.addEventListener('keydown', function(event) {
  if (keyArray.indexOf(event.keyCode) >= 0) {
    keyState[event.keyCode || event.which] = true;
  }
}, true);

game_canvas.addEventListener('keyup', function(event) {
  if (keyArray.indexOf(event.keyCode) >= 0) {
    keyState[event.keyCode || event.which] = false;
  }
  else if (event.keyCode === 32) {
    fireStart();
  }
}, true);

leftButton.addEventListener('mousedown', function() {
  keyDownAction(37);
}, true);

leftButton.addEventListener('mouseup', function() {
  keyUpAction(37);
}, true);

leftButton.addEventListener('click', function(event) {
  event.preventDefault();
}, true);

rightButton.addEventListener('mousedown', function() {
  keyDownAction(39);
}, true);

rightButton.addEventListener('mouseup', function() {
  keyUpAction(39);
}, true);

rightButton.addEventListener('click', function(event) {
  event.preventDefault();
}, true);

game_canvas.addEventListener('blur', function(event) {
  for (var i in keyState) {
    keyState[i] = false;
  }
}, true);

pauseButton.addEventListener('click', function(event) {
  event.preventDefault();
  if (!isPause) {
    isPause = true;
    pauseButton.innerHTML = '&#x23f4;';
  }
  else {
    isPause = false;
    pauseButton.innerHTML = '&#x23f8;';
    gameLoop();
  }
  game_canvas.focus();
}, true);

function keyUpAction(key) {
  keyState[key] = false;
}

function keyDownAction(key) {
  keyState[key] = true;
}
