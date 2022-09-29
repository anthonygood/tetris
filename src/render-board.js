const times = (n, fn) => {
  new Array(n).fill(0).forEach(fn)
}

// Actually create the DOM structure, vs updating it
export const render = (height, width) => {
  const appContainer = document.querySelector('#app')
  const virtualDom = [] // lol

  times(height, () => {
    const row = document.createElement('div')
    row.classList.add('row')

    const virtualRow = []

    times(width, () => {
      const cell = document.createElement('div')
      cell.classList.add('cell')

      row.appendChild(cell)
      virtualRow.push(cell)
    })

    appContainer.appendChild(row)
    virtualDom.push(virtualRow)
  })

  return { appContainer, virtualDom }
}

export const update = (tetris, virtualDom) => {
  const board = tetris.compositeBoard()
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
    }
  }
}
