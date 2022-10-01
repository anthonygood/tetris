const times = (n, fn) => {
  new Array(n).fill(0).forEach((_, index) => fn(index))
}

// Actually create the DOM structure, vs updating it
export const render = (height, width) => {
  const appContainer = document.querySelector('#app')
  const domRows = []
  const domCells = []

  times(height, i => {
    const row = document.createElement('div')
    row.dataset.i = row.dataset.y = i
    row.classList.add('row')
    domRows.push(row)

    const virtualRow = []

    times(width, j => {
      const cell = document.createElement('div')
      cell.dataset.i = cell.dataset.y = i
      cell.dataset.j = cell.dataset.x = j
      cell.classList.add('cell')

      row.appendChild(cell)
      virtualRow.push(cell)
    })

    appContainer.appendChild(row)
    domCells.push(virtualRow)
  })

  return { appContainer, domRows, domCells }
}

export const update = (tetris, virtualDom) => (board = tetris.compositeBoard()) => {
  const { tetrominoPosition } = tetris;
  const [tetrominoX, tetrominoY] = tetrominoPosition

  for (let i = 0; i < tetris.height(); i++) {
    for (let j = 0; j < tetris.width(); j++) {
      const isActive = !!board[i][j];

      const cell = virtualDom[i][j];
      if (!cell) {
        return console.error('cell not found at index', i, j)
      }

      if (isActive) {
        cell.classList.add('active')
      } else {
        cell.classList.remove('active')
      }

      const isDebug = (i === tetrominoY) && (j === tetrominoX)
      if (isDebug) {
        cell.classList.add('special')
      } else {
        cell.classList.remove('special')
      }
    }
  }
}
