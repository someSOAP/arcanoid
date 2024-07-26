import { getCatVideo } from '@/utils'

export class VideoMemes {
  isPlaying: boolean
  isSad: boolean
  video: HTMLVideoElement

  constructor(video: HTMLVideoElement) {
    this.video = video
    this.isSad = true
    this.isPlaying = false
    this.video.addEventListener('ended', this.playNext)
  }

  private playNext = () => {
    this.video.src = getCatVideo(this.isSad)
    this.play()
  }

  async play() {
    this.isPlaying = true
    this.video.play()
  }

  stop() {
    if (!this.isPlaying) {
      return
    }
    this.isPlaying = false
    this.video.pause()
  }

  async setSadMood(val: boolean) {
    if (val === this.isSad) {
      return
    }
    console.log('CHANGING MOOD TO ', val ? 'SAD' : 'HAPI')
    this.isSad = val
    this.video.src = getCatVideo(val)
    this.play()
  }
}
