import { Tetris } from 'grid-games'
import {
  pause,
  init as initStartStop,
} from './start-stop'

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

const update = (tetris, virtualDom) => {
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

const inputConfig = {
  left: 'KeyA',
  right: 'KeyD',
  down: 'KeyS',
  rotateRight: 'KeyW',
  rotateLeft: 'KeyE',
  pause: 'KeyP',
}

const controlTetromino = tetris => event => {
  if (tetris.paused) return

  const { code } = event
  if (code === 'ArrowRight' || code === inputConfig.right) {
    tetris.move.right()
  }
  if (code === 'ArrowLeft' || code === inputConfig.left) {
    tetris.move.left()
  }
  if (code === 'ArrowDown' || code === inputConfig.down) {
    tetris.move.down()
  }
  if (code === 'Space' || code === inputConfig.rotateRight) {
    tetris.rotate()
  }
  if (code === inputConfig.rotateLeft) {
    tetris.rotate.reverse()
  }
  if (code === 'Enter' || code === inputConfig.drop) {
    tetris.drop()
  }
}

const TICK_INTERVAL = 250
const FRAME_INTERVAL = 100

const play = () => {
  const tetris = new Tetris()

  const { appContainer, virtualDom } = render(tetris.height(), tetris.width())

  tetris.start()
  update(tetris, virtualDom)

  const { start, stop } = initStartStop({
    tickFn: () => tetris.tick(),
    renderFn: () => update(tetris, virtualDom),
    tickInterval: TICK_INTERVAL,
    frameInterval: FRAME_INTERVAL,
  })

  tetris.on(Tetris.Events.GAME_OVER, () => {
    appContainer.classList.add('gameover')
    stop()
  })

  const control = controlTetromino(tetris)
  const togglePause = pause(tetris, start, stop)
  document.addEventListener('keydown', control)
  document.addEventListener('keydown', togglePause)

  start()
}

window.Tetris = Tetris

play()
