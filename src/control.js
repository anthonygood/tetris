export const config = {
  left: 'KeyA',
  right: 'KeyD',
  down: 'KeyS',
  rotateRight: 'KeyW',
  rotateLeft: 'KeyE',
  pause: 'KeyP',
}

export const control = tetris => event => {
  if (tetris.paused) return

  const { code } = event
  if (code === 'ArrowRight' || code === config.right) {
    tetris.move.right()
  }
  if (code === 'ArrowLeft' || code === config.left) {
    tetris.move.left()
  }
  if (code === 'ArrowDown' || code === config.down) {
    tetris.move.down()
  }
  if (code === 'Space' || code === config.rotateRight) {
    tetris.rotate()
  }
  if (code === config.rotateLeft) {
    tetris.rotate.reverse()
  }
  if (code === 'Enter' || code === config.drop) {
    tetris.drop()
  }
}
