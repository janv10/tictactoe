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


  // tie checker
  if (winner == null && next.length == 0) {
    return 'tie';
  } else {
    return winner;
  }

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

}


//next turn alteration, comp generation
function nextTurn() {
  let index = floor(random(next.length));
  let spot = next.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
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
      let spot = board[i][j];
      textSize(32);
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot == players[0]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }

    }
  }

  //Winner analysis
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`${result} wins!`);
    }
  } else {
    nextTurn();
  }
}

