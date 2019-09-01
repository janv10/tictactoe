//Author: Jahnvi Patel
//Enviornment: p5js.org and Visual Studio Code
//Date: 8/31/19

//create board
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

//create players
let currentPlayer;
let players = ['X', 'O'];
let next = [];

function setup() {
  createCanvas(400, 400);
  frameRate(40);
  currentPlayer = floor(random(players.length));
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      next.push([i, j]);
    }
  }
}

function equalizer(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkWinner() {
  //is there a winner?
  let winner = null;

  // Vertical checker
  for (let i = 0; i < 3; i++) {
    if (equalizer(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // horizontal checker
  for (let i = 0; i < 3; i++) {
    if (equalizer(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Diagonal checker
  if (equalizer(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equalizer(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
    // tie checker
    if (winner == null && next.length == 0) {
      return 'tie';
    } else {
      return winner;
    }
}


// Next turn alteration, comp generation
function nextTurn() {
  let index = floor(random(next.length));
  let position = next.splice(index, 1)[0];
  let i = position[0];
  let j = position[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(4);

  //Draw lines on the board
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  //X O board set up
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let position = board[i][j];
      textSize(32);
      if (position == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (position == players[0]) {
        let xradius = w / 4;
        line(x - xradius, y - xradius, x + xradius, y + xradius);
        line(x + xradius, y - xradius, x - xradius, y + xradius);
      }

    }
  }

  //Winner analysis - print results
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '42pt');
    if (result == 'tie') {
      resultP.html("TIE!")
    } else {
      resultP.html(`Winner is: ${result}!`);
    }
  } else {
    nextTurn();
  }
}

