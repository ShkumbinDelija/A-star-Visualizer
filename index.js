start = () => {
  squares = [];
  for (let x = 0; x < canvas.width / squareSize; x++) {
    squares.push([]);
    for (let y = 0; y < canvas.height / squareSize; y++) {
      const square = new Square(new Point(x * squareSize, y * squareSize, squareSize - 1, squareSize - 1, '#EEFAFF'));
      squares[x].push(square);
      drawSquare(square);
    }
  }
  canvas.onclick = event => fillSquaresWithColor(event)
}

drawSquare = square => {
  const p = square.point;
  context.fillStyle = p.color;
  context.fillRect(p.x, p.y, p.w, p.h);
}

drawGrid = () => squares.forEach(rowOfSquares => rowOfSquares.forEach(square => drawSquare(square)))

fillSquaresWithColor = event => {
  if (mode.current === '4') return;
  let x = Math.floor((event.clientX - canvas.offsetLeft) / squareSize);
  let y = Math.floor((event.clientY - canvas.offsetTop) / squareSize);
  if ([startingNode, endingNode].includes(`${x},${y}`)) return
  if (squares[x] && squares[x][y]) squares[x][y].point.color = window[`mode${mode.current}`](x, y, fillSquaresWithColor)
  drawGrid();
}

changeMode = () => {
  mode = modes[mode.next];
  $('#modes').innerHTML = mode.html;
}

mode1 = (x, y, _fn) => {
  startingNode = `${x},${y}`;
  changeMode();
  return '#0000FF';
}

mode2 = (x, y, fn) => {
  endingNode = `${x},${y}`;
  changeMode();
  canvas.onmousemove = e => { if (e.shiftKey) fn(e) };
  startButton.disabled = false;
  return '#d91427';
}

mode3 = (x, y, _fn) => {
  barricades.push(`${x},${y}`);
  return '#000';
}
