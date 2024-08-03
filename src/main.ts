import game from './game.ts'
import { adjustCanvasSize, fetchCatsVideos, getCatVideo } from '@/utils'
import { VideoMemes } from '@/classes/VideoMemes'

const initGame = async () => {
  const videoLinks = await fetchCatsVideos()

  const video = document.createElement('video')
  video.id = 'memes-video'
  video.autoplay = false
  video.muted = false
  video.src = getCatVideo(true)
  document.body.appendChild(video)

  const videoMeme = new VideoMemes(video, videoLinks)
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
}

initGame()
