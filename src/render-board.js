const times = (n, fn) => {
  new Array(n).fill(0).forEach(fn)
}

// Actually create the DOM structure, vs updating it
const render = (height, width) => {
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

export default render