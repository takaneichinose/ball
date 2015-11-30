function fireStart() {
  if (!coordinates.p1.f.f1) {
    coordinates.p1.f.x1 = coordinates.p1.x + (fireData.width / 2);
    coordinates.p1.f.y1 = coordinates.p1.y - characterData.height + fireData.height;
    coordinates.p1.f.f1 = true;
  }
  else if (!coordinates.p1.f.f2) {
    coordinates.p1.f.x2 = coordinates.p1.x + (fireData.width / 2);
    coordinates.p1.f.y2 = coordinates.p1.y - characterData.height + fireData.height;
    coordinates.p1.f.f2 = true;
  }
}

function computerFireStart() {
  if (!coordinates.p2.f.f1) {
    coordinates.p2.f.x1 = coordinates.p2.x + (fireData.width / 2);
    coordinates.p2.f.y1 = coordinates.p2.y + characterData.height;
    coordinates.p2.f.f1 = true;
  }
  else if (!coordinates.p2.f.f2) {
    if (coordinates.p2.f.y1 > coordinates.p2.y + (characterData.height * 4)) {
      coordinates.p2.f.x2 = coordinates.p2.x + (fireData.width / 2);
      coordinates.p2.f.y2 = coordinates.p2.y + characterData.height;
      coordinates.p2.f.f2 = true;
    }
  }
}

function computerFireDodge() {
  if (hardMode) {
    if (
      coordinates.p1.f.f1
      && (coordinates.p1.f.x1 + fireData.width) > coordinates.p2.x
      && coordinates.p1.f.x1 < (coordinates.p2.x + characterData.width)
      && (coordinates.p1.f.y1) < (coordinates.p2.y + characterData.height - fireSpeed + computerFireResponse)
    ) {
      return true;
    }
    if (
      coordinates.p1.f.f2
      && (coordinates.p1.f.x2 + fireData.width) > coordinates.p2.x
      && coordinates.p1.f.x2 < (coordinates.p2.x + characterData.width)
      && (coordinates.p1.f.y2) < (coordinates.p2.y + characterData.height - fireSpeed + computerFireResponse)
    ) {
      return true;
    }
    return false;
  }
  else {
    return false;
  }
}

function processMovement() {
  if (keyState[37] || keyState[65]) {
    if (coordinates.p1.x <= frame.x1) {
      coordinates.p1.x = 0;
    }
    else {
      coordinates.p1.x -= characterMoveSpeed;
    }
  }
  if (keyState[39] || keyState[68]) {
    if (coordinates.p1.x >= frame.x2) {
      coordinates.p1.x = frame.x2;
    }
    else {
      coordinates.p1.x += characterMoveSpeed;
    }
  }
}

function processComputerMovement() {
  if (computerFireDodge() || computerDodge.dodging) {
    if (computerDodge.dodging) {
      if (computerDodge.direction === 'r') {
        if (coordinates.p2.x >= computerDodge.targetDirection) {
          computerDodge.dodging = false;
        }
        else {
          if (coordinates.p2.x + characterData.width + characterMoveSpeed <= canvasData.width) {
            coordinates.p2.x += characterMoveSpeed;
          }
          else {
            computerDodge.dodging = false;
          }
        }
      }
      else if (computerDodge.direction === 'l') {
        if (coordinates.p2.x <= computerDodge.targetDirection) {
          computerDodge.dodging = false;
        }
        else {
          if (coordinates.p2.x - characterMoveSpeed >= startingPoint.x) {
            coordinates.p2.x -= characterMoveSpeed;
          }
          else {
            computerDodge.dodging = false;
          }
        }
      }
    }
    else {
      computerDodge.index = Math.floor(Math.random() * 6);
      if (computerDodgeDirection[computerDodge.index] > 0) {
        computerDodge.direction = 'r';
        if ((coordinates.p2.x + characterData.width + computerDodgeDirection[computerDodge.index]) <= canvasData.width) {
          computerDodge.dodging = true;
          computerDodge.targetDirection = coordinates.p2.x + characterData.width + computerDodgeDirection[computerDodge.index];
        }
        else {
          computerDodge.targetDirection = canvasData.width - characterData.width;
        }
      }
      else {
        computerDodge.direction = 'l';
        if ((coordinates.p2.x + computerDodgeDirection[computerDodge.index]) >= startingPoint.x) {
          computerDodge.dodging = true;
          computerDodge.targetDirection = coordinates.p2.x + computerDodgeDirection[computerDodge.index];
        }
        else {
          computerDodge.targetDirection = startingPoint.x;
        }
      }
    }
  }
  else {
    randomWidth = Math.floor((Math.random() * characterData.width * 2));
    if (coordinates.p2.x > (coordinates.p1.x + randomWidth)) {
      coordinates.p2.x -= characterMoveSpeed;
    }
    else if (coordinates.p2.x < coordinates.p1.x - randomWidth) {
      coordinates.p2.x += characterMoveSpeed;
    }
  }
}

function processFire() {
  if (coordinates.p1.f.y1 >= startingPoint.y) {
    coordinates.p1.f.y1 -= fireSpeed;
  }
  else {
    coordinates.p1.f.f1 = false;
  }
  if (coordinates.p1.f.y2 >= startingPoint.y) {
    coordinates.p1.f.y2 -= fireSpeed;
  }
  else {
    coordinates.p1.f.f2 = false;
  }
}

function processComputerFire() {
  if (coordinates.p2.x <= (coordinates.p1.x + characterData.width) && coordinates.p2.x >= (coordinates.p1.x - characterData.width)) {
    computerFireStart();
  }
  if (coordinates.p2.f.y1 <= (canvasData.height - fireData.height)) {
    coordinates.p2.f.y1 += fireSpeed;
  }
  else {
    coordinates.p2.f.f1 = false;
  }
  if (coordinates.p2.f.y2 <= (canvasData.height - fireData.height)) {
    coordinates.p2.f.y2 += fireSpeed;
  }
  else {
    coordinates.p2.f.f2 = false;
  }
}

function processFireHit() {
  if (
    coordinates.p1.f.f1
    && (coordinates.p1.f.x1 + fireData.width) > coordinates.p2.x
    && coordinates.p1.f.x1 < (coordinates.p2.x + characterData.width)
    && (coordinates.p1.f.y1) < (coordinates.p2.y + characterData.height - fireSpeed)
  ) {
    score.p1++;
    coordinates.p1.f.f1 = false;
  }
  if (
    coordinates.p1.f.f2
    && (coordinates.p1.f.x2 + fireData.width) > coordinates.p2.x
    && coordinates.p1.f.x2 < (coordinates.p2.x + characterData.width)
    && (coordinates.p1.f.y2) < (coordinates.p2.y + characterData.height - fireSpeed)
  ) {
    score.p1++;
    coordinates.p1.f.f2 = false;
  }
}

function processComputerFireHit() {
  if (
    coordinates.p2.f.f1
    && (coordinates.p2.f.x1 + fireData.width) > coordinates.p1.x
    && coordinates.p2.f.x1 < (coordinates.p1.x + characterData.width)
    && (coordinates.p2.f.y1 + fireData.height - fireSpeed) > coordinates.p1.y
  ) {
    score.p2++;
    coordinates.p2.f.f1 = false;
  }
  if (
    coordinates.p2.f.f2
    && (coordinates.p2.f.x2 + fireData.width) > coordinates.p1.x
    && coordinates.p2.f.x2 < (coordinates.p1.x + characterData.width)
    && (coordinates.p2.f.y2 + fireData.height - fireSpeed) > coordinates.p1.y
  ) {
    score.p2++;
    coordinates.p2.f.f2 = false;
  }
}

function processScore() {
  scoreBoard.p1.innerText = score.p1;
  scoreBoard.p2.innerText = score.p2;
  scoreBoard.p1.textContent = score.p1;
  scoreBoard.p2.textContent = score.p2;
}

function renderImage() {
  context.clearRect(startingPoint.x, startingPoint.y, canvasData.width, canvasData.height);
  context.drawImage(coordinates.p1.image, coordinates.p1.x, coordinates.p1.y);
  context.drawImage(coordinates.p2.image, coordinates.p2.x, coordinates.p2.y);
  if (coordinates.p1.f.f1) {
    context.drawImage(coordinates.p1.fire, coordinates.p1.f.x1, coordinates.p1.f.y1);
  }
  if (coordinates.p1.f.f2) {
    context.drawImage(coordinates.p1.fire, coordinates.p1.f.x2, coordinates.p1.f.y2);
  }
  if (coordinates.p2.f.f1) {
    context.drawImage(coordinates.p2.fire, coordinates.p2.f.x1, coordinates.p2.f.y1);
  }
  if (coordinates.p2.f.f2) {
    context.drawImage(coordinates.p2.fire, coordinates.p2.f.x2, coordinates.p2.f.y2);
  }
}

function gameLoop() {
  if (!isPause) {
    requestAnimFrame(gameLoop);
    renderImage();
    processMovement();
    processComputerMovement();
    processFire();
    processComputerFire();
    processFireHit();
    processComputerFireHit();
    processScore();
  }
}

gameLoop();
game_canvas.setAttribute('width', canvasData.width);
game_canvas.setAttribute('height', canvasData.height);
game_canvas.focus();
