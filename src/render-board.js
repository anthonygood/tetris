import { Grid } from "grid-games"

const times = (n, fn) => {
  new Array(n).fill(0).forEach((_, index) => fn(index))
}

const renderBuffer = () => {
  const buffer = document.createElement('div')
  buffer.classList.add('buffer-item')

  const cells = []

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

    buffer.appendChild(row)
    cells.push(virtualRow)
  })

  return { buffer, cells }
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
    row.classList.add('row')
    domRows.push(row)

    const virtualRow = []

    times(width, j => {
      const cell = document.createElement('div')
      cell.classList.add('cell')

      row.appendChild(cell)
      virtualRow.push(cell)
    })

    gridContainer.appendChild(row)
    domCells.push(virtualRow)
  })

  const bufferContainer = document.createElement('div')
  bufferContainer.classList.add('buffer-container')
  appContainer.appendChild(bufferContainer)
  const domBuffer = []
  times(3, () => {
    const { buffer, cells } = renderBuffer()
    bufferContainer.appendChild(buffer)
    domBuffer.push(cells)
  })

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

const updateBuffer = (tetromino, bufferDom) => {
  // const tetromino = tetris.buffer.peek()
  Grid.forEach(bufferDom, (cell, [i, j]) => {
    toggleClass(cell, tetromino[i]?.[j], 'active')
  })
}

const lightmap = (tetris, domCells, ghostBoard) => {
  const shadowCasterIndices = {}
  Grid.forEach(tetris.compositeBoard(), (boardCell, [i, j]) => {
    const domCell = domCells[i][j]
    if (boardCell) {
      shadowCasterIndices[j] = true
      domCell.classList.remove('light')
      return
    }

    const ghostCell = ghostBoard[i][j]
    if (ghostCell) {
      shadowCasterIndices[j] = false
      domCell.classList.remove('light')
      return
    }

    if (shadowCasterIndices[j]) {
      return domCell.classList.remove('light')
    }

    domCell.classList.add('light')
  })
}

export const update = (tetris, cells, bufferDom) => (board = tetris.compositeBoard()) => {
  const { tetrominoPosition } = tetris;
  const [tetrominoX, tetrominoY] = tetrominoPosition
  const ghostBoard = tetris.tetrominoGhost()

  if (bufferDom) {
    bufferDom.forEach((buffer, i) => {
      const bufferIndex = tetris.buffer.length - 1 - i
      const tetromino = tetris.buffer.values[bufferIndex]
      updateBuffer(tetromino, buffer)
    })
  }

  lightmap(tetris, cells, ghostBoard)

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

      const isDebugCell = (i === tetrominoY) && (j === tetrominoX)
      toggleClass(cell, window.debug && isDebugCell, 'special')
    }
  }
}
