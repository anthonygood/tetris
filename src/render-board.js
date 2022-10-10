const times = (n, fn) => {
  new Array(n).fill(0).forEach((_, index) => fn(index))
}

// Actually create the DOM structure, vs updating it
export const render = (height, width) => {

  const appContainer = document.querySelector('#app')

  const gridContainer = document.createElement('div')
  gridContainer.classList.add('grid-container')
  appContainer.appendChild(gridContainer)

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

      const cellInterior = document.createElement('div')
      cellInterior.classList.add('interior')
      cellInterior.classList.add('a')

      const cellInteriorB = document.createElement('div')
      cellInteriorB.classList.add('interior')
      cellInteriorB.classList.add('b')

      cell.appendChild(cellInterior)
      cell.appendChild(cellInteriorB)
      row.appendChild(cell)
      virtualRow.push(cell)
    })

    gridContainer.appendChild(row)
    domCells.push(virtualRow)
  })

  return { appContainer, domRows, domCells }
}

const toggleClass = (cell, bool, classname) => {
  fn = bool ? 'add' : 'remove'
  cell.classList[fn](classname)
}

export const update = (tetris, virtualDom) => (board = tetris.compositeBoard()) => {
  const { tetrominoPosition } = tetris;
  const [tetrominoX, tetrominoY] = tetrominoPosition
  const ghostBoard = tetris.tetrominoGhost()

  for (let i = 0; i < tetris.height(); i++) {
    for (let j = 0; j < tetris.width(); j++) {
      const cell = virtualDom[i][j];
      if (!cell) {
        return console.error('cell not found at index', i, j)
      }

      const isActive = !!board[i][j];
      toggleClass(cell, isActive, 'active')

      const isGhost = ghostBoard[i][j];
      toggleClass(cell, isGhost, 'ghost')
      toggleClass(cell, isGhost, 'neighbour')

      const neighbourTop = ghostBoard[i-1]?.[j]
      const neighbourLeft = ghostBoard[i][j-1]
      const neighbourTopLeft = ghostBoard[i-1]?.[j-1]

      toggleClass(cell, neighbourTop, 'neighbour-top')
      toggleClass(cell, neighbourLeft, 'neighbour-left')
      toggleClass(cell, neighbourTop && neighbourLeft && neighbourTopLeft, 'neighbour-top-left')

      const isDebugCell = (i === tetrominoY) && (j === tetrominoX)
      toggleClass(cell, window.debug && isDebugCell, 'special')
    }
  }
}
