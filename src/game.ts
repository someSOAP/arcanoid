import Ball from '@/classes/Ball'
import BaseBlock from '@/classes/BaseBlock'
import Platform from '@/classes/Platform'
import Block from '@/classes/Block'
import Limits from '@/classes/Limits'
import { VideoMemes } from '@/classes/VideoMemes'

import { clearCanvas, drawResult, toggleItem, initBlocks } from '@/utils'

const game = (canvas: HTMLCanvasElement, video: VideoMemes) => {
  const MAX_SLOW_DOWN = 750
  const MIN_SLOW_DOWN = 250

  let lastHitTs = 0
  let slowDownCf: number = MAX_SLOW_DOWN
  let ball: Ball = new Ball(canvas, canvas.width / 2, canvas.height - 50)
  let platform: Platform = new Platform(
    canvas,
    canvas.width / 2 - 100,
    canvas.height - 30,
  )
  let blocks: Array<Block> = initBlocks(canvas)

  let initTouchX: number | undefined = undefined
  let initTouchY: number | undefined = undefined

  const limits: Limits = new Limits(
    new BaseBlock(0, -10, canvas.width, 10),
    new BaseBlock(canvas.width, 0, 10, canvas.height),
    new BaseBlock(0, canvas.height, canvas.width, 10),
    new BaseBlock(-10, 0, 10, canvas.height),
  )

  const startGame = () => {
    video.setSadMood(true)
    video.play()
    playing = true
    ball = new Ball(canvas, canvas.width / 2, canvas.height - 50)
    platform = new Platform(canvas, canvas.width / 2 - 100, canvas.height - 30)
    blocks = initBlocks(canvas)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      slowDownCf = MIN_SLOW_DOWN
    }
    if (event.key === 'ArrowLeft') {
      platform.leftKey = true
    }
    if (event.key === 'ArrowRight') {
      platform.rightKey = true
    }

    if (!playing) {
      startGame()
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      slowDownCf = MAX_SLOW_DOWN
    }
    if (event.key === 'ArrowLeft') {
      platform.leftKey = false
    }
    if (event.key === 'ArrowRight') {
      platform.rightKey = false
    }
  }

  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)

  const onTouchStart = (event: TouchEvent) => {
    if (!playing) {
      startGame()
    }
    const touch = event.targetTouches.item(0)
    if (!touch) {
      return
    }
    initTouchX = touch.clientX
    initTouchY = touch.clientY
  }

  const onTouchMove = (event: TouchEvent) => {
    if (!initTouchX || !initTouchY) {
      return
    }

    const touch = event.targetTouches.item(0)
    if (!touch) {
      return
    }

    const touchXDiff = Math.abs(Math.min(touch.clientY - initTouchY, 0))

    slowDownCf = Math.max(MAX_SLOW_DOWN - touchXDiff * 3, 250)

    if (touch.clientX > initTouchX) {
      platform.leftKey = false
      platform.rightKey = true
      return
    }

    if (touch.clientX < initTouchX) {
      platform.rightKey = false
      platform.leftKey = true
      return
    }
  }

  const onTouchEnd = () => {
    platform.rightKey = false
    platform.leftKey = false
    slowDownCf = MAX_SLOW_DOWN
    initTouchX = undefined
    initTouchY = undefined
  }

  document.addEventListener('touchstart', onTouchStart)
  document.addEventListener('touchmove', onTouchMove)
  document.addEventListener('touchend', onTouchEnd)

  let pTimestamp: number = 0
  let playing: boolean = false

  let isUnsubscribed = false

  void (function loop(timestamp: number) {
    if (isUnsubscribed) {
      return
    }

    requestAnimationFrame(loop)

    clearCanvas(canvas)

    if (playing) {
      const dTimestamp: number = Math.min(16.7, timestamp - pTimestamp)
      const secondPart: number = dTimestamp / slowDownCf
      pTimestamp = timestamp

      video.setSadMood(timestamp - lastHitTs > 1000)

      ball.updatePosition(secondPart)

      if (platform.leftKey) {
        platform.moveLeft(secondPart)
      }

      if (platform.rightKey) {
        platform.moveRight(secondPart)
      }

      for (const block of blocks) {
        if (block.checkIfIntersectedByBall(ball)) {
          lastHitTs = timestamp
          toggleItem(blocks, block)
        }
      }

      if (ball.isIntersectedWith(limits.up)) {
        ball.horizontalHit()
      }

      if (
        ball.isIntersectedWith(limits.right) ||
        ball.isIntersectedWith(limits.left)
      ) {
        ball.verticalHit()
      }

      if (ball.isIntersectedWith(limits.down)) {
        playing = false
      }

      platform.checkIfIntersectedWithBall(ball)
    }

    platform.render()

    for (const block of blocks) {
      block.render()
    }

    if (!playing) {
      video.stop()
      drawResult(canvas)
    }
  })(pTimestamp)

  return () => {
    isUnsubscribed = true
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('keyup', onKeyUp)

    document.removeEventListener('touchstart', onTouchStart)
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
  }
}

export default game
