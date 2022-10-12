import { Tetris } from 'grid-games'
import {
  pause,
  init as initStartStop,
} from './start-stop'
import { render, update } from './render-board'
import { control } from './control'

const TICK_INTERVAL = 350
const FRAME_INTERVAL = 30
const CLEAR_INTERVAL = 500

const gameoverEffect = (stop, appContainer) => () => {
  appContainer.classList.add('gameover')
  stop()
}

const clearEffect = (start, stop, update, domCells) => ({ indices, board }) => {
  stop()
  update(board.before)
  indices.forEach(index => {
    domCells[index].forEach(cell => cell.classList.add('flash'))
  })

  setTimeout(() => {
    indices.forEach(index => {
      domCells[index].forEach(cell => cell.classList.remove('flash'))
    })
    start()
  }, CLEAR_INTERVAL)
}

const play = () => {
  const tetris = new Tetris()

  const {
    appContainer,
    buffer,
    cells,
  } = render(tetris.height(), tetris.width())

  tetris.start()
  const updateBoard = update(tetris, cells, buffer)

  const { start, stop } = initStartStop({
    tickFn: () => tetris.tick(),
    renderFn: updateBoard,
    tickInterval: TICK_INTERVAL,
    frameInterval: FRAME_INTERVAL,
  })

  tetris.on(Tetris.Events.GAME_OVER, gameoverEffect(stop, appContainer))
  tetris.on(Tetris.Events.LINE_CLEAR, clearEffect(start, stop, updateBoard, cells))
  tetris.on(Tetris.Events.TETROMINO_LANDING, console.log)

  const togglePause = pause(tetris, start, stop)
  document.addEventListener('keydown', control(tetris))
  document.addEventListener('keydown', togglePause)

  window.tetris = tetris

  start()
}

play()
