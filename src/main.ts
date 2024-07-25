import './style.css'
import game from './game.ts'
import { adjustCanvasSize } from '@/utils'
import catVideo from '@/assets/screaming_cat.mp4'

const video = document.createElement('video')
video.autoplay = true
video.muted = true
video.loop = true
const videoSrc = document.createElement('source')
videoSrc.src = catVideo
videoSrc.type = 'video/mp4'
video.appendChild(videoSrc)
document.body.appendChild(video)

const videoCanvas = document.createElement('canvas')
adjustCanvasSize(videoCanvas)
document.body.appendChild(videoCanvas)

const drawVideo = async () => {
  const ctx = videoCanvas.getContext('2d')

  if (!ctx) {
    return
  }

  const image = await createImageBitmap(video)

  const dx = Math.min(videoCanvas.width - image.width, 0) / 2
  ctx.drawImage(video, dx, 0, image.width, image.height)

  const frame = ctx.getImageData(0, 0, videoCanvas.width, videoCanvas.height)

  for (let i = 0; i < frame.data.length; i += 4) {
    const r = frame.data[i]
    const g = frame.data[i + 1]
    const b = frame.data[i + 2]

    if (g > 50 && g > r && g > b) {
      frame.data[i + 3] = 0
    }

    // if (r < 120 && g > 100 && b < 120) {
    //   frame.data[i + 3] = 0
    // }
  }
  ctx.putImageData(frame, 0, 0)

  requestAnimationFrame(drawVideo)
}

video.addEventListener('play', drawVideo)

const gameCanvas = document.createElement('canvas')
gameCanvas.id = 'game-canvas'
adjustCanvasSize(gameCanvas)
document.body.appendChild(gameCanvas)

let unsubscribe = game(gameCanvas)

window.addEventListener('resize', () => {
  unsubscribe()
  adjustCanvasSize(gameCanvas)
  adjustCanvasSize(videoCanvas)
  unsubscribe = game(gameCanvas)
})
