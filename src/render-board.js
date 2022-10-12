import { Grid } from "grid-games"

const times = (n, fn) => {
  new Array(n).fill(0).forEach((_, index) => fn(index))
}

const renderBuffer = () => {
  const bufferContainer = document.createElement('div')
  bufferContainer.classList.add('buffer-container')

  const domBuffer = []

  times(2, () => {
    const row = document.createElement('div')
    row.classList.add('row')
    const virtualRow = []

    times(4, () => {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      row.appendChild(cell)
      virtualRow.push(cell)
    })

    bufferContainer.appendChild(row)
    domBuffer.push(virtualRow)
  })

  return { bufferContainer, domBuffer }
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

      row.appendChild(cell)
      virtualRow.push(cell)
    })

    gridContainer.appendChild(row)
    domCells.push(virtualRow)
  })

  const { bufferContainer, domBuffer } = renderBuffer()
  appContainer.appendChild(bufferContainer)

  return {
    appContainer,
    cells: domCells,
    buffer: domBuffer,
  }
}

const toggleClass = (cell, bool, classname) => {
  fn = bool ? 'add' : 'remove'
  cell.classList[fn](classname)
}

const updateBuffer = (tetris, bufferDom) => {
  const tetromino = tetris.buffer.peek()
  Grid.forEach(bufferDom, (cell, [i, j]) => {
    toggleClass(cell, tetromino[i]?.[j], 'active')
  })
}

export const update = (tetris, cells, bufferDom) => (board = tetris.compositeBoard()) => {
  const { tetrominoPosition } = tetris;
  const [tetrominoX, tetrominoY] = tetrominoPosition
  const ghostBoard = tetris.tetrominoGhost()

  if (bufferDom) {
    updateBuffer(tetris, bufferDom)
  }

  for (let i = 0; i < tetris.height(); i++) {
    for (let j = 0; j < tetris.width(); j++) {
      const cell = cells[i][j];
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
