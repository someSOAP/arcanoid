import './style.css'
import game from './game.ts'
import { adjustCanvasSize, getCatVideo } from '@/utils'
import { VideoMemes } from '@/classes/VideoMemes'

const video = document.createElement('video')
video.id = 'memes-video'
video.autoplay = false
video.muted = false
// const videoSrc = document.createElement('source')
video.src = getCatVideo(true)
// video.type = 'video/mp4'
// video.appendChild(videoSrc)
document.body.appendChild(video)

// video.addEventListener('ended', () => {
//   video.src = getCatVideo(true)
//   video.play()
// })

const videoMeme = new VideoMemes(video)
const gameCanvas = document.createElement('canvas')
gameCanvas.id = 'game-canvas'
adjustCanvasSize(gameCanvas)
document.body.appendChild(gameCanvas)

let unsubscribe = game(gameCanvas, videoMeme)

window.addEventListener('resize', () => {
  videoMeme.stop()
  unsubscribe()
  adjustCanvasSize(gameCanvas)
  unsubscribe = game(gameCanvas, videoMeme)
})
