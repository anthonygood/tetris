const intervals = {}

export const init = ({
  tickFn,
  renderFn,
  tickInterval,
  frameInterval,
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
  }

  const stop = () => {
    clearInterval(intervals.tickInterval)
    clearInterval(intervals.renderInterval)
  }

  return { start, stop }
}

export const pause = (game, start, stop) => event => {
  if (event.code !== 'Escape') return
  game.paused ? start() : stop()
  game.paused = !game.paused
}
