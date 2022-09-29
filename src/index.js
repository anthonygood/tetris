import { Tetris } from 'grid-games'
import {
  pause,
  init as initStartStop,
} from './start-stop'
import { render, update } from './render-board'
import { control } from './control'

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

play()
