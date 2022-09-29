import { Tetris } from 'grid-games'
import {
  pause,
  init as initStartStop,
} from './start-stop'
import render from './render-board'
import { control } from './control'

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

  const togglePause = pause(tetris, start, stop)
  document.addEventListener('keydown', control(tetris))
  document.addEventListener('keydown', togglePause)

  start()
}

window.Tetris = Tetris

play()
