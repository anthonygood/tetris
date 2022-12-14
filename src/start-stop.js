const intervals = {}

export const init = ({
  tickFn,
  renderFn,
  tickInterval,
  frameInterval,
  game,
}) => {
  const start = () => {
    intervals.tickInterval = setInterval(
      tickFn,
      tickInterval
    )

    intervals.renderInterval = setInterval(
      () => requestAnimationFrame(() => renderFn()),
      frameInterval
    )
    game.paused = false
  }

  const stop = () => {
    clearInterval(intervals.tickInterval)
    clearInterval(intervals.renderInterval)
    game.paused = true
  }

  return { start, stop }
}

export const pause = (game, start, stop) => event => {
  if (event.code !== 'Escape') return
  game.paused ? start() : stop()
  game.paused = !game.paused
}
